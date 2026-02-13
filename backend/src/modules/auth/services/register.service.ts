import { status } from "elysia";
import { prisma } from "#/db";

import type { RegisterModel } from "../models/register.model.js";


export abstract class RegisterService {
    static async registerUser({email, name, password}: RegisterModel.registerBody) {
        const hash = await Bun.password.hash(password);

        // Check if the email is already registered
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });
        if (existingUser) {
            throw status(500, 'User already exists');
        }

        // Check if first user, if so assign Owner role, otherwise assign User role
        const userCount = await prisma.user.count();
        const roleId = userCount === 0 ? 1 : 3; // 1 for Owner, 3 for User

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hash,
                globalRole: {
                    connect: { id: roleId } // Connect to the appropriate role
                }
            }
        });

        return {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    }
}