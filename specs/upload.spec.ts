
import controller from '../controller/upload.controller'


describe('Upload file', () => {
    it('POST /upload/single', async () => {
        const res = await controller.postUploadSingle('data/a.jpg')
        console.log(res.body)
        expect(res.body.filename).toEqual('a.jpg')
        expect(res.body.size).toEqual('131654')
    }) 
    it('POST /upload/multiple', async () => {
        const files = [
            'data/a.jpg',
            'data/v.jpg'
        ]
        const res = await controller.postUploadMultiple(files)
        expect(res.body.length).toBe(2)
        expect(res.body[0].filename).toEqual('a.jpg')
        expect(res.body[1].filename).toEqual('v.jpg')
    })
})