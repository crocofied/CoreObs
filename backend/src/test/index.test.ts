import { describe, expect, it } from 'bun:test'
import { Elysia } from 'elysia'

describe('Elysia', () => {
    it('returns CoreObs message', async () => {
        const app = new Elysia().get('/', () => 'CoreObs Backend running!')

        const response = await app
            .handle(new Request('http://localhost/'))
            .then((res) => res.text())

        expect(response).toBe('CoreObs Backend running!')
    })
})