const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const app = express();
const prisma = new PrismaClient();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', async (req, res) => {
  const users = await prisma.user.findMany();
  res.render('index.ejs', { users });
});

app.post('/users', async (req, res) => {
  await prisma.user.create({
    data: req.body
  });
  res.redirect('/');
});

app.put('/users', async (req, res) => {
  await prisma.user.update({
    where: { username: req.body.username },
    data: { password: req.body.newPassword }
  });
  res.json('Success');
});

app.delete('/users', async (req, res) => {
  await prisma.user.delete({
    where: { username: req.body.username }
  });
  res.json('Deleted user');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
