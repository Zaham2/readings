import express from 'express'
import { addBayt, getAllAbyat } from '../controllers/baytController.js'

const router = express.Router()

router.route('/')
    .post(addBayt)
    .get(getAllAbyat)

export default router

