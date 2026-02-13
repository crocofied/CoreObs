import { Elysia, status } from "elysia";

import { RegisterService } from "./services/register.service.js";
import { RegisterModel } from "./models/register.model.js";

export const authModule = new Elysia({ prefix: '/auth' })
    .post(
        '/register',
        async ({ body }) => {
            const user = await RegisterService.registerUser(body);

            return status(201, user);
        },
        {
            body: RegisterModel.registerBody,
            response: {
                201: RegisterModel.registerResponse,
                500: RegisterModel.registerInvalid,
            }
        }
    )
