
import express from 'express';
import { User } from "../models/UserModel.js";
const router = express.Router();

// create user
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.email ||
            !request.body.user_type
        ) {
            return response.status(400).send({
                message: 'Send all the required fields.',
            });
        }

        const newUser = {
            name: request.body.name,
            email: request.body.email,
            user_type: request.body.user_type,
        };

        const User = await User.create(newUser);

        return response.status(201).send(User);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// get all users
router.get('/', async (request, response) => {
    try {
        const users = await User.find({});

        return response.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// get single user
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const user = await User.findById(id);

        return response.status(200).json(user);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});

// upadte user
router.put('/:id', async (request, response) => {
    try {
        const { name, email, user_type } = request.body;
        if (!name || !email || user_type === null) {
            return response.status(400).send({
                message: 'Send all the required fields.',
            });
        }

        const { id } = request.params;
        const data = { $set: { name, email, user_type } };

        // Assuming the ID is the MongoDB ObjectID
        const result = await User.updateOne({ _id: id }, { $set: { email, name, user_type } });

        // Check if any document was matched and updated
        if (result.matchedCount === 0) {
            return response.status(404).send({ message: 'User not found' });
        }

        return response.status(200).send({ message: 'User updated' });
    } catch (error) {
        console.error(error);
        response.status(500).send({ message: error.message });
    }
});

//delete User
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await User.findByIdAndDelete(id, request.body);

        if (!result) {
            return response.status(404).send({ message: 'User not found' });
        }

        return response.status(200).send({ message: 'User deleted' });
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});


export default router;