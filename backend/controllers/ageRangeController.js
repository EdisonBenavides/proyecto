const { getAllAgeRanges } = require('../models/ageRange');

exports.getAllAges = async (req, res) => {
  try {
    const ages = await getAllAgeRanges();
    res.json(ages);
  } catch (error) {
    console.error('Error al obtener los rangos de edad:', error);
    res.status(500).json({ error: 'Error al obtener los rangos de edad' });
  }
};