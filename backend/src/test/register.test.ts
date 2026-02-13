//** Todo Tests
// - Email invalid
// - Name invalid
// - Password invalid
// - */

import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'
import { authModule } from "#/modules/auth";

describe('Elysia', () => {
    it('successful registration', async () => {
        const app = new Elysia().use(authModule)

        const response = await app.handle(
            new Request('http://localhost/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'test@test.com',
                    name: 'Test User',
                    password: 'Password123'
                })
            })
        )

        expect(response.status).toBe(201)
        const responseData = await response.json()
        expect(responseData).toHaveProperty('id')
    })

    it('registration with existing email', async () => {
        const app = new Elysia().use(authModule)

        // Second registration with the same email should fail
        const response = await app.handle(
            new Request('http://localhost/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: 'test@test.com',
                    name: 'Test User 2',
                    password: 'Password123'
                })
            })
        )

        expect(response.status).toBe(500)
    })
})