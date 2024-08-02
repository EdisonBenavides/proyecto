const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const analyzeSentimentRoutes = require("./routes/analizeSentimentRoutes");
const generatePositivePhraseRoutes = require("./routes/generatePositivePhraseRoutes");
const ageRangeRoutes = require("./routes/ageRangeRoutes");
const noteRoutes = require('./routes/noteRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", analyzeSentimentRoutes);
app.use("/api", generatePositivePhraseRoutes);
app.use("/api", ageRangeRoutes);
app.use('/api', noteRoutes);
app.use('/api', userRoutes)

const port = 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});