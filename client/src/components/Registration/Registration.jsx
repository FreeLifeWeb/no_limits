// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   Button, Form, FormGroup, Input, Label,
// } from 'reactstrap';
// import { regUser } from '../../redux/actions/userAction';

// export default function Registration() {
//   const dispatch = useDispatch();
//   const err = useSelector((store) => store.err);
//   return (
//     <>
//       <Form onSubmit={(e) => dispatch(regUser(e))}>
//         <FormGroup>
//           <Label
//             for="exampleName"
//             hidden
//           >
//             Name:
//           </Label>
//           <Input
//             id="exampleName"
//             name="name"
//             placeholder="Enter your name..."
//             type="text"
//           />
//         </FormGroup>
//         {' '}
//         <FormGroup>
//           <Label
//             for="exampleEmail"
//             hidden
//           >
//             Email:
//           </Label>
//           <Input
//             id="exampleEmail"
//             name="email"
//             placeholder="Enter your email..."
//             type="email"
//           />
//         </FormGroup>
//         {' '}
//         <FormGroup>
//           <Label
//             for="examplePassword"
//             hidden
//           >
//             Password:
//           </Label>
//           <Input
//             id="examplePassword"
//             name="password"
//             placeholder="Enter your password..."
//             type="password"
//           />
//         </FormGroup>
//         {' '}
//         <Button type="submit">
//           Submit
//         </Button>
//       </Form>
//       <div>
//         {err && (<span>{err.message}</span>)}
//       </div>
//     </>
//   );
// }
import React from 'react';
import {
  Box, Button, FormGroup, TextField, Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { regUser } from '../../redux/actions/userAction';

export default function Registration() {
  const dispatch = useDispatch();
  const err = useSelector((store) => store.err);

  return (
    <Box
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      display="flex"
      noValidate
      autoComplete="off"
      alignItems="center"
      justifyContent="center"
      minHeight="80vh"
    >
      <form onSubmit={(e) => dispatch(regUser(e))}>
        <FormGroup>
          <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            Registration
          </Typography>
          <TextField
            name="name"
            label="Name"
            type="text"
          />
          <TextField
            name="email"
            label="Email"
            type="email"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
          />
          <Button type="submit" variant="contained">Sign up</Button>
        </FormGroup>
      </form>
      <div>
        {' '}
        {err && (<span>{err.message}</span>)}
        {' '}
      </div>
    </Box>
  );
}
