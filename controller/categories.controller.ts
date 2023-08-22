import * as supertest from 'supertest'
import config from '../config/base.config'
const request = supertest(config.baseURL)

class CategoriesController {
    getCategories() {
        return request.get('/categories')
    }

    getIndividualCategories(id: string | number) {
        return request.get('/categories/' + id)
    }

    postCategories(data: { [key: string]: string | number }) {
        return request.post('/categories')
            .send(data)
    }

    putCategories(data: { [key: string]: string | number }, id: string) {
        return request.put('/categories/' + id)
        .send(data)

    }

    deleteCategories(id: string | number) {
        return request.delete('/categories/' + id)
    }
}
export default new CategoriesController()