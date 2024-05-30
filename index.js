const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./database');
const { DataTypes } = require('sequelize');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const Text = sequelize.define('Text', {
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  timestamp: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
});

app.post('/api/submit-text', async (req, res) => {
  const { type, content } = req.body;
  try {
    await Text.create({ type, content });
    res.json({ message: 'Text submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit text' });
  }
});

app.get('/api/results', async (req, res) => {
  try {
    const texts = await Text.findAll();
    const analysisResults = analyzeTexts(texts);
    res.json(analysisResults);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch results' });
  }
});

function analyzeTexts(texts) {
  // Exemple d'analyse de texte selon les critères fournis
  let strictlyEpisodicScore = 0;
  let autobiographicalMemoryScore = 0;

  texts.forEach((text) => {
    // Logique d'analyse simplifiée pour l'exemple
    if (text.content.includes('unique')) strictlyEpisodicScore += 1;
    if (text.content.includes('détails')) autobiographicalMemoryScore += 1;
  });

  return {
    strictlyEpisodicScore,
    autobiographicalMemoryScore
  };
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await sequelize.sync({ force: true });
  console.log(`Server is running on port ${PORT}`);
});
