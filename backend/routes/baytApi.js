import express from 'express'
import { addBayt, getAllAbyat } from '../controllers/baytController.js'
import { searchForBayt } from '../controllers/matnController.js'

const router = express.Router()

router.route('/')
    .post(addBayt)
    .get(getAllAbyat)

router.route('/search')
    .post(searchForBayt)

export default router

