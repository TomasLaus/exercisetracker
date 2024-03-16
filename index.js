const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { User, Exercise } = require('./models/models');

app.use(cors());
app.use(express.static('public'));

// DB setup
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// POST /api/users to Create a New User

app.post('/api/users', express.urlencoded({ extended: false }), async (req, res) => {
  const { username } = req.body;
  const user = new User({ username });

  try {
    const savedUser = await user.save();
    res.json({ username: savedUser.username, _id: savedUser._id });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error saving the user');
  }
});

// GET /api/users to List All Users

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.log(err);
    res.status(500).send('Error retrieving users');
  }
});

// POST /api/users/:_id/exercises to Add an Exercise

app.post('/api/users/:_id/exercises', express.urlencoded({ extended: false }), async (req, res) => {
  const { _id } = req.params;
  let { description, duration, date } = req.body;
  date = date ? new Date(date) : new Date();

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(400).send('Unknown user');
    }

    const exercise = new Exercise({
      user: _id,
      description,
      duration: parseInt(duration, 10),
      date,
    });

    const savedExercise = await exercise.save();
    res.json({
      _id: user._id,
      username: user.username,
      date: savedExercise.date.toDateString(),
      duration: savedExercise.duration,
      description: savedExercise.description,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send('Error saving exercise');
  }
});

// GET /api/users/:_id/logs to Get a User's Exercise Log

app.get('/api/users/:_id/logs', async (req, res) => {
  const { _id } = req.params;
  let { from, to, limit } = req.query;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(400).send('Unknown user');

    let query = Exercise.find({ user: user._id });

    if (from) query = query.where('date').gte(new Date(from));
    if (to) query = query.where('date').lte(new Date(to));
    if (limit) query = query.limit(Number(limit));

    const exercises = await query.exec();

    res.json({
      _id: user._id,
      username: user.username,
      count: exercises.length,
      log: exercises.map((ex) => ({
        description: ex.description,
        duration: ex.duration,
        date: ex.date.toDateString(),
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port);
});
