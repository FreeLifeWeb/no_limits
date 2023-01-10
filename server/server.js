const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);
const { Server } = require('socket.io');
const userRouter = require('./routers/userRouter');
const resumeRouter = require('./routers/resumeRouter');
const apiRouter = require('./routers/apiRouter');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3001;
app.use(cors({
  credentials: true,
  origin: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  name: 'user_sid',
  secret: process.env.SESSION_SECRET ?? 'test',
  resave: true,
  store: new FileStore(),
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
}));

const rooms = new Map();
// временная БД в виде прокаченного
// обьекта Map(избегаем не нужные действия с методами)
app.get('/room/:id', (req, res) => {
  const roomId = req.params.id;
  const obj = {
    users: [...rooms.get(roomId).get('users').values()],
    messages: [...rooms.get(roomId).get('messages').values()],
  };
  console.log('OOOOOOOOOOOOOOO', obj);
  res.json(obj);
});

app.post('/room', (req, res) => {
  const { roomId, userName } = req.body;
  console.log('BODY', req.body);
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Map([
      ['users', new Map()],
      ['messages', []],
    ]));
  }
  res.sendStatus(200);
});

io.on('connection', (socket) => {
  socket.on('ROOM:JOIN', ({ roomId, userName }) => {
    // console.log('SOCKET BACK', roomId, userName);
    socket.join(roomId);// подключаемся к сокету именно в определенную комнату
    rooms.get(roomId).get('users').set(socket.id, userName);// сохраняем данные в нашей временной БД(MAP)
    const users = [...rooms.get(roomId).get('users').values()];// вытаскиваем именна всех пользователей конкретной комнаты
    // console.log('ROOM', rooms, users);
    socket.to(roomId).emit('ROOM:JOINED', { users });// оповещаем пользователей конкретной комнаты,
    // что кто-то присоединился к беседе, всех кроме себя,!!(почему broadcast не работает???????)!!
  });
  socket.on('ROOM:NEW_MESSAGES', ({
    roomId, userName, text, time,
  }) => {
    // console.log('TEXTT', text);
    const obj = {
      userName,
      text,
      time,
    };
    rooms.get(roomId).get('messages').push(obj);// сохраняем данные в нашей временной БД(MAP)
    console.log('ROOM:MESSAGE', rooms);
    socket.to(roomId).emit('ROOM:ADD_MESSAGES', obj);// оповещаем пользователей конкретной комнаты
  });
  socket.on('disconnect', () => { // удаляем пользователя из Map, когда он вышел
    rooms.forEach((value, roomId) => {
      // плюс коллекции, что можно сделать итерацию, в отичии от обычного обьекта
      if (value.get('users').delete(socket.id)) {
        const users = [...rooms.get(roomId).get('users').values()];// вытаскиваем именна всех пользователей конкретной комнаты
        socket.broadcast.to(roomId).emit('ROOM:USER_LEAVE', users);
      }
    });
  });
  console.log('user connection', socket.id);
});
console.log(rooms);

app.use('/user', userRouter);
app.use('/resume', resumeRouter);
app.use('/api', apiRouter);

server.listen(PORT, () => console.log(`Server has started on PORT ${PORT}`));
