import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '../data/orarend.json');

let tantargy = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));

const saveTantargy = () => {
    fs.writeFileSync(dataFilePath, JSON.stringify(tantargy, null, 2), 'utf-8');
};

export const getAllTantargy = (req, res) => {
    res.status(200).json(tantargy);
};

export const createTantargy = (req, res) => {
    const { day, hour, subject } = req.body;
    if (!day || !hour || !subject) {
        return res.status(400).json({ message: 'Missing data!' });
    }
    const newId = tantargy.length > 0 ? Math.max(...tantargy.map(t => t.id)) + 1 : 1;
    const newTantargy = { id: newId, day, hour: parseInt(hour), subject };
    tantargy.push(newTantargy);
    saveTantargy();
    res.status(201).json(newTantargy);
};

export const updateTantargy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id) || id < 1 || id > tantargy.length) {
        return res.status(404).json({ message: 'Subject not found' });
    }
    const { day, hour, subject } = req.body;
    if (!day || !hour || !subject) {
        return res.status(400).json({ message: 'Missing data!' });
    }
    const tantargyIndex = id - 1;
    tantargy[tantargyIndex] = { id, day, hour: parseInt(hour), subject };
    saveTantargy();
    res.status(200).json(tantargy[tantargyIndex]);
};

export const deleteTantargy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (tantargy.filter(tantargy => tantargy.id === id).length === 0) {
        return res.status(404).json({ message: 'Subject not found!' });
    }
    tantargy = tantargy.filter(tantargy => tantargy.id !== id);
    saveTantargy(); 
    res.status(200).json({ message: 'The subject has been deleted succesfully!' });
};
