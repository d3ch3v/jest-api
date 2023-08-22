import * as supertest from 'supertest'

const request = supertest('https://jsonplaceholder.typicode.com')


describe('POC', () => {

    describe('GET requests', () => {
        it('GET /posts', async () => {
            const res = await request
                .get('/posts')
            expect(res.statusCode).toBe(200)
            expect(res.body[0].id).toBe(1)
        })
        it('GET /comments with query params', async () => {
            // const res = await request.get('comments?postId=1')
            const res = await request
                .get('/comments')
                .query({ postId: 1 })
            expect(res.body[0].postId).toBe(1)
        })
    })
    describe('POST request', () => {
        it('POST / posts', async () => {

            const data = {
                title: 'My title',
                body: 'YES',
                userId: 1
            }
            const res = await request
                .post('/posts')
                .send(data)
            expect(res.body.title).toBe(data.title)
        })
    })
    describe('PUT Request', () => {
        it('PUT /posts/{id}', async () => {
            const data = {
                title: 'Updated title2',
                body: 'NO',
                userId: 2
            }

            const getRes = await request.get('/posts/1')
            const beforeTitle = getRes.body.title
            const res = await request
                .put('/posts/1')
                .send(data)
            expect(res.body.title).not.toBe(beforeTitle)
            expect(res.body.title).toBe(data.title)

            // another GET call to verify that the title is expected
        })
    })

    describe('PATCH Request', () => {
        it('PATCH /posts/{id}', async () => {
            const data = {
                title: 'Updated title2'
            }

            const getRes = await request.get('/posts/1')
            const beforeTitle = getRes.body.title
            const res = await request
                .patch('/posts/1')
                .send(data)
            expect(res.body.title).not.toBe(beforeTitle)
            expect(res.body.title).toBe(data.title)

            // another GET call to verify that the title is expected
        })
    })
    describe('DELETE requests', () => {
        it.only('DELETE /posts/{id}', async () => {
            const res = await request
                .delete('/posts/1')
            expect(res.statusCode).toBe(200)
            expect(res.body).toEqual({})
            
        })
    })
})
