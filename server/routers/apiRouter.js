const express = require('express');

const {
  Sphere, Category, Response, Vacancy, Resume,
} = require('../db/models');

const apiRouter = express.Router();

apiRouter.post('/sphere', async (req, res) => {
  try {
    const sphereList = await Sphere.findAll();
    res.json(sphereList);
  } catch {
    res.sendStatus(500);
  }
});

apiRouter.post('/category', async (req, res) => {
  try {
    const categoryList = await Category.findAll();
    console.log(categoryList);
    res.json(categoryList);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});

apiRouter.post('/vacansy', async (req, res) => {
  try {
    const {
      title, company, city, sphere, category, salary, time, format,
    } = req.body;
    const sp = await Sphere.findOne({ where: { title: sphere } });
    const cat = await Category.findOne({ where: { title: category } });
    await Vacancy.create({
      userId: req.session.user.id,
      title,
      company,
      city,
      sphereId: sp.id,
      categoryId: cat.id,
      salary,
      time,
      format,
    });
    const newVac = await Vacancy.findOne({ where: { title }, include: [{ all: true }] });
    res.json(newVac);
    console.log(req.body, '<-----');
  } catch {
    console.log('err');
  }
});

apiRouter.delete('/vacansy/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Vacancy.destroy({ where: { id } });
    res.sendStatus(200);
  } catch {
    console.log('err');
  }
});

apiRouter.put('/vacansy/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title, company, city, sphere, category, salary, time, format,
    } = req.body;
    const sper = await Sphere.findOne({ where: { title: sphere } });
    const categ = await Category.findOne({ where: { title: category } });
    const vac = await Vacancy.findOne({ where: { id } });
    vac.title = title;
    vac.company = company;
    vac.city = city;
    vac.sphereId = sper.id;
    vac.categoryId = categ.id;
    vac.salary = salary;
    vac.time = time;
    vac.format = format;
    await vac.save();
    const result = await Vacancy.findOne({ where: { id }, include: [{ all: true }] });
    res.json(result);
  } catch {
    console.log('err');
  }
});

apiRouter.post('/vacancies', async (req, res) => {
  try {
    const vacancies = await Vacancy.findAll();
    res.json(vacancies);
  } catch {
    console.log('err');
  }
});

apiRouter.post('/response/:id', async (req, res) => {
  const { id } = req.params;
  const userId = req.session.user.id;
  try {
    await Response.create({ userId, vacancyId: id });
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
});

apiRouter.post('/vacancy/responses/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const responses = await Response.findAll({ where: { vacancyId: id } });
    const result = [];
    for (let i = 0; i < responses.length; i += 1) {
      const newEl = await Resume.findOne({ where: { userId: responses[i].userId } });
      result.push(newEl);
    }
    res.json(result);
  } catch {
    console.log('err');
  }
});

apiRouter.post('/resumes', async (req, res) => {
  const resumes = await Resume.findAll({ include: [{ model: Category }, { model: Sphere }] });
  try {
    res.json(resumes);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = apiRouter;
