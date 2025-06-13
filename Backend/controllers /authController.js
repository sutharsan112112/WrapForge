import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

class AuthController {

// Register method

    static async register(req, res) {
        try {
            const { name, email, password, role } = req.body;

            // Validate role
            if (!['user', 'partner', 'admin'].includes(role)) {
                return res.status(400).json({ message: 'Invalid role specified.' });
            }
            
            // Check if email already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already registered.' });
            }

            // Create user
            const newUser = new User({ name, email, password, role });
            await newUser.save();

            res.status(201).json({ message: 'Registration successful.' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

// Login method
    static async login(req, res) {
        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            // Check if user exists
            if (!user) {
                return res.status(401).json({ message: 'Invalid email' });
            }
            // Check if password matches
            if (!user || !(await user.matchPassword(password))) {
                return res.status(401).json({ message: 'Invalid password' });
                
            }
            
            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                JWT_SECRET,
                // { expiresIn: '1h' }
            );

            res.json({
                message: 'Login successful',
                user: {
                    id: user._id,
                    email: user.email,
                    role: user.role
                },
                token
            });
        } 
        catch (error) {
            res.status(500).json({ message: 'Login failed', error: error.message });
        }
    }
};

export default AuthController;