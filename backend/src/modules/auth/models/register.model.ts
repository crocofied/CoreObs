import { t } from 'elysia';

export namespace RegisterModel {
    export const registerBody = t.Object({
        email: t.String({format: 'email'}),
        name: t.String({minLength: 4}),
        password: t.String({minLength: 8}),
    });

    export type registerBody = typeof registerBody.static;

    export const registerResponse = t.Object({
        id: t.String(),
        email: t.String(),
        name: t.String(),
    });

    export type registerResponse = typeof registerResponse.static;

    export const registerInvalid = t.Literal('User already exists');
    export type registerInvalid = typeof registerInvalid.static;

}
