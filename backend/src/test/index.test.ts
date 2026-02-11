import { describe, expect, it } from 'bun:test'
import { app } from '../index'

describe('Elysia', () => {
    it('returns CoreObs message', async () => {
        const response = await app
            .handle(new Request('http://localhost/'))
            .then((res) => res.text())

        expect(response).toBe('CoreObs Backend running!')
    })
})