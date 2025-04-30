import bcrypt from 'bcryptjs';  
import { faker } from '@faker-js/faker';
import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';

// Función para generar usuarios mockeados
const generateMockUsers = (count) => {
    const users = [];

    for (let i = 0; i < count; i++) {
        let first_name = faker.person.firstName();
        let last_name = faker.person.lastName();

        users.push({
            first_name,
            last_name,
            email: faker.internet.email({ first_name, last_name }),
            password: bcrypt.hashSync("coder123", 10),
            role: Math.random() > 0.5 ? "user" : "admin",
            pets: []  // Array vacío de mascotas
        });
    }
    return users;
};

// Endpoint GET /mockingusers/:count
const mockingUsers = async (req, res) => {
    try {
        // Obtener la cantidad de usuarios desde el parámetro de la URL, si no existe, usar 50
        const count = req.params.count ? parseInt(req.params.count) : 50;
        const users = generateMockUsers(count);  // count para generar el número de usuarios
        res.json({ status: 'success', users });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Endpoint generateData para generar e insertar datos en la base de datos
const generateData = async (req, res) => {
    try {
        const { users, pets } = req.params;
        if (!users || !pets) {
            return res.status(400).json({ status: 'error', message: 'Se requieren los parámetros users y pets.' });
        }

        // Generar e insertar usuarios
        const userMocks = generateMockUsers(Number(users));
        await UserModel.create(userMocks);

        // Generar e insertar mascotas
        const petMocks = [];
        for (let i = 0; i < Number(pets); i++) {
            petMocks.push({
                name: faker.animal.dog(),
                specie: 'dog',
                owner: faker.database.mongodbObjectId()
            });
        }
        await PetModel.create(petMocks);

        res.json({ status: 'success', message: 'Usuarios y mascotas generados e insertados correctamente.' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
};

// Endpoint mockingpets 
const mockingPets = (req, res) => {
    const pets = [];
    for (let i = 0; i < 10; i++) {
        pets.push({
            name: faker.animal.dog(),
            breed: faker.animal.dog(),
            age: faker.number.int({ min: 1, max: 15 })
        });
    }
    res.json({ status: 'success', pets });
};

export default {
    mockingUsers,
    generateData,
    mockingPets
};