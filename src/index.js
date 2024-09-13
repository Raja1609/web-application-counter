const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

mongoose.connect('mongodb://mongodb:27017/counterdb', { useNewUrlParser: true, useUnifiedTopology: true });

const counterSchema = new mongoose.Schema({
  count: Number,
});

const Counter = mongoose.model('Counter', counterSchema);

app.get('/', async (req, res) => {
  let counter = await Counter.findOne();
  if (!counter) {
    counter = new Counter({ count: 1 });
  } else {
    counter.count += 1;
  }
  await counter.save();
  res.send(`This page has been visited ${counter.count} times.`);
});

app.listen(port, () => {
  console.log(`Counter app listening at http://localhost:${port}`);
});

