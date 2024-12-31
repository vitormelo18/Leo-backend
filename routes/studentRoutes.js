// routes/studentRoutes.js
const express = require('express');
const Student = require('../models/Student');

const router = express.Router();

// Rota para registrar um estudante
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const newStudent = new Student({ name, email, password });
        await newStudent.save();
        res.status(201).json({ message: 'Estudante registrado com sucesso', student: newStudent });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao registrar estudante', error: error.message });
    }
});

// Rota para listar todos os estudantes
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar estudantes', error: error.message });
    }
});

// Rota para remover um estudante
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedStudent = await Student.findByIdAndDelete(id);
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Estudante não encontrado' });
        }
        res.json({ message: 'Estudante removido com sucesso', student: deletedStudent });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover estudante', error: error.message });
    }
});

// Rota para editar um estudante
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
        const updatedStudent = await Student.findByIdAndUpdate(id, { name, email, age, course }, { new: true });
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Estudante não encontrado' });
        }
        res.json({ message: 'Estudante atualizado com sucesso', student: updatedStudent });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar estudante', error: error.message });
    }
});

// Rota para buscar um estudante por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const student = await Student.findById(id);
        if (!student) {
            return res.status(404).json({ message: 'Estudante não encontrado' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar estudante', error: error.message });
    }
});

module.exports = router;
