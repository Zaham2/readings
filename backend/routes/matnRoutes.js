
import express from 'express'
import { getAbyat, getAllAbyat, searchForBayt } from '../controllers/matnController.js'
// import { getAbyatShatebeya } from '../controllers/matnController.js'
// import { getAbyatDorra } from '../controllers/matnController.js'


const router = express.Router()

router.route('/')
    .get(getAllAbyat)

router.route('/search')
    .get(searchForBayt)

router.route('/:matn')
    .get(getAbyat)


export default router
