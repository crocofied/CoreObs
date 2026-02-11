import { Elysia } from "elysia";

import { RegisterService } from "./services/register.service.js";
import { RegisterModel } from "./models/register.model.js";

export const authModule = new Elysia({prefix: '/auth'})
    .post(
        '/register',
        async ({body}) => {
            const user = await RegisterService.registerUser(body);
            return user;
        },
        {
            body: RegisterModel.registerBody,
            response: {
                200: RegisterModel.registerResponse,
                400: RegisterModel.registerInvalid,
            }
        }
    )