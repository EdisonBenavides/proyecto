const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const analyzeSentimentRoutes = require("./routes/AnalizeSentimentRoutes");
const generatePositivePhraseRoutes = require("./routes/GeneratePositivePhraseRoutes");
const ageRangeRoutes = require("./routes/AgeRangeRoutes");
const noteRoutes = require('./routes/NoteRoutes')
const noteRoutesMongo = require('./routes/NoteRoutesMongo')
const userRoutes = require('./routes/UserRoutes')
const { connectToDatabase } = require('./config/DatabaseMongo'); // Importa la función de conexión

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api", analyzeSentimentRoutes);
app.use("/api", generatePositivePhraseRoutes);
app.use("/api", ageRangeRoutes);
app.use('/api', noteRoutes);
app.use('/api', userRoutes)
app.use("/api", noteRoutesMongo)

const port = 3000;

// Conectar a la base de datos antes de iniciar el servidor
connectToDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch(error => {
  console.error('Error al conectar a la base de datos:', error);
  process.exit(1);
});
