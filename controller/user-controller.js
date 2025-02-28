import UserModel from "../model/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import Token from "../model/token.js";  // Fixed import name

dotenv.config();

export const signupUser = async (request, response) => {
    try {
        const { username, name, password } = request.body;

        if (!username || !name || !password) {
            return response.status(400).json({ msg: "All fields are required" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new UserModel({ username, name, password: hashedPassword });

        await user.save();
        return response.status(200).json({ msg: "Signup successful" });
    } catch (error) {
        console.error("Error details:", error);
        return response.status(500).json({ msg: "Error while signing up user" });
    }
};

export const loginUser = async (request, response) => {
    try {
        const { username, password } = request.body;
        if (!username || !password) {
            return response.status(400).json({ msg: "All fields are required" });
        }

        let user = await UserModel.findOne({ username });  // Fixed model usage
        if (!user) {
            return response.status(400).json({ msg: "Username does not exist" });
        }

        let match = await bcrypt.compare(password, user.password);
        if (!match) {
            return response.status(400).json({ msg: "Password does not match" });
        }

        const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: "15m" });
        const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);

        const newToken = new Token({ token: refreshToken }); // Fixed Token model usage
        await newToken.save();

        return response.status(200).json({
            accessToken,
            refreshToken,
            name: user.name,
            username: user.username
        });
    } catch (error) {
        console.error("Login Error:", error);
        return response.status(500).json({ msg: "Error while logging in the user" });
    }
};
