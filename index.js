const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tempau', { useNewUrlParser: true, useUnifiedTopology: true });

const textSchema = new mongoose.Schema({
  type: String,
  content: String,
  timestamp: Date
});
const Text = mongoose.model('Text', textSchema);

app.post('/api/submit-text', async (req, res) => {
  const { type, content } = req.body;
  const text = new Text({ type, content, timestamp: new Date() });
  await text.save();
  res.json({ message: 'Text submitted successfully' });
});

app.get('/api/results', async (req, res) => {
  const texts = await Text.find({});
  const analysisResults = analyzeTexts(texts);
  generateExcel(analysisResults);
  generateWord(analysisResults);
  res.json(analysisResults);
});

function analyzeTexts(texts) {
  // Perform text analysis according to the criteria
  // Return the results
}

function generateExcel(results) {
  // Use xlsx library to create Excel file
}

function generateWord(results) {
  // Use docx library to create Word file
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
