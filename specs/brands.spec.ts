import { post } from 'superagent';
// import * as supertest from 'supertest'
// const request = supertest('https://sdetunicorns.com/api/test')

import controller from '../controller/brand.controller'

describe('Brands', () => {
    describe('Fetch Brands', () => {
        it('GET /brands', async () => {
            const res = await controller.getBrands()
            expect(res.statusCode).toEqual(200)
            expect(res.body.length).toBeGreaterThan(1)
            //once u get the body back u make sure the fist obejct has id and a name properties
            // console.log(res.body[0])

            // проверка на key, без value
            expect(Object.keys(res.body[0])).toEqual(['_id', 'name'])
        })
    })


    describe('Create Brands', () => {
        let postBrand
        const data = {
            'name': 'Test Brand' + Math.floor((Math.random() * 10000))
        }
        beforeAll(async () => {
            postBrand = await controller.postBrands(data)
        })
        it('POST /brands', async () => {
            expect(postBrand.statusCode).toEqual(200)
            expect(postBrand.body.name).toEqual(data.name)
            expect(postBrand.body).toHaveProperty('createdAt')
        })
        it('Schema Verification - name is a mandatory field', async () => {
            const data = {
                'name': ''
            }
            const res = await controller.postBrands(data)
            expect(res.statusCode).toEqual(422)
            expect(res.body.error).toEqual('Name is required')
        })
        it('Schema Verification - name is min char length for name > 1', async () => {
            const data = {
                'name': 'a'
            }
            const res = await controller.postBrands(data)
            expect(res.statusCode).toEqual(422)
            expect(res.body.error).toEqual('Brand name is too short')
        })
        it('Business Logic - duplicate brand entries are not allowed', async () => {

            //second request
            const res1 = await controller.postBrands(data)
            expect(res1.statusCode).toEqual(422)
            expect(res1.body.error).toContain(`already exists`)

        })
    })


    describe('Fetch Individual brand', () => {
        describe('GET / brand/{id}', () => {
            let postBrand
            beforeAll(async () => {
                const data = {
                    'name': 'Test Brand' + Math.floor((Math.random() * 10000))
                }
                postBrand = await controller.postBrands(data)
            })
            it('Business logic - GET /brand/invalid_id throw 404', async () => {
                const res = await controller.getBrandsById('63448f0500b2931578c0a511')
                expect(res.statusCode).toEqual(404)
                expect(res.body.error).toContain('Brand not found')
            })
        })
    })


    // Task
    it('Schema Verification - Max char length for name = 30', async () => {
        const data = {
            'name': 'This is a really long brand name '
        }
        const res = await controller.postBrands(data)
        expect(res.statusCode).toEqual(422)
        expect(res.body.error).toEqual('Brand name is too long')
    })
    it('Business Logic - Description must be a string type', async () => {
        const data = {
            'name': 'Sample brand',
            'description': 123
        }
        const res = await controller.postBrands(data)
        expect(res.statusCode).toEqual(422)
        expect(res.body.error).toEqual('Brand description must be a string')
    })


    describe('Update Brands', () => {
        let postBrand
        const data = {
            'name': 'Test Brand' + Math.floor((Math.random() * 10000))
        }
        beforeAll(async () => {
            postBrand = await controller.postBrands(data)
        })
        it('PUT /brands', async () => {
            const data = {
                'name': postBrand.body.name + ' updated'
            }
            const res = await controller.updateBrands(postBrand.body._id, data)
            expect(res.statusCode).toEqual(200)
            expect(res.body.name).toEqual(data.name)
        })
        it('PUT /brands/invalid_id', async () => {
            const data = {
                'name': ' updated'
            }

            const res = await controller.updateBrands('123', data)
            expect(res.statusCode).toEqual(422)
            expect(res.body.error).toContain('Unable to update brands')
        })
    })

    describe('DELETE Brands', () => {
        let postBrand
        const data = {
            'name': 'Test Brand' + Math.floor((Math.random() * 10000))
        }
        beforeAll(async () => {
            postBrand = await controller.postBrands(data)
        })
        it('Delete /brands', async () => {
            const res = await controller.deleteBrands(postBrand.body._id)
            expect(res.statusCode).toEqual(200)
        })
        it('Delete /brands/invalid_id', async () => {
            const res = await controller.deleteBrands('123')
            expect(res.body.error).toContain('Unable to delete brand')
        })
    })
})
