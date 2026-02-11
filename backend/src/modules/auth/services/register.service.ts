import { status } from "elysia";
import { prisma } from "#/db";

import type { RegisterModel } from "../models/register.model.js";


export abstract class RegisterService {
    static async registerUser({email, name, password}: RegisterModel.registerBody) {
        const hash = await Bun.password.hash(password);

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hash,
            }
        });

        return {
            id: user.id,
            email: user.email,
            name: user.name,
        }
    }
}