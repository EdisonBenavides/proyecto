const { getAllAgeRanges, deleteAgeRange, updateAgeRange, createAgeRange } = require('../models/AgeRange');

exports.getAllAges = async (req, res) => {
  try {
    const ages = await getAllAgeRanges();
    res.json(ages);
  } catch (error) {
    console.error('Error al obtener los rangos de edad:', error);
    res.status(500).json({ error: 'Error al obtener los rangos de edad' });
  }
};

exports.deleteAgeRange = async (req, res) => {
  const { id } = req.params;
  try {
    await deleteAgeRange(id);
    res.json({ message: 'Rango de edad eliminado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el rango de edad' });
  }
};

exports.updateAgeRange = async (req, res) => {
  const { id } = req.params;
  const { age } = req.body;
  try {
    const result = await updateAgeRange(id, age);
    res.json(result);
  } catch (error) {
    console.error('Error en la actualización del rango de edad:', error)
    res.status(500).json({ message: 'Error al actualizar el rango de edad' });
  }
};

exports.createAgeRange = async(req, res) => {
  const { age } = req.body;
  try {
    const ageRanges = await getAllAgeRanges();
    const ageRangesExists = ageRanges.some(ageRange => ageRange.RANGOEDAD === age);

    if (ageRangesExists) {
      res.status(409).json({ message: 'Age Range already exists' });
    } else {
      const isCreated = await createAgeRange(age);
      if (isCreated) {
        res.status(201).json({ message: 'Age Range created successfully' });
      } else {
        res.status(500).json({ error: 'Error creating age range' });
      }
    }
  } catch (error) {
    console.error('Error creating age range:', error);
    res.status(500).json({ error: 'Error creating age range' });
  }
};