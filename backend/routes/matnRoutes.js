
import express from 'express'
import { addMatn, getAbyat, getAllAbyat, searchForBayt, seedAbyatAndMotoon } from '../controllers/matnController.js'
// import { getAbyatShatebeya } from '../controllers/matnController.js'
// import { getAbyatDorra } from '../controllers/matnController.js'


const router = express.Router()

router.route('/')
    .get(getAllAbyat)
    .post(addMatn)

router.route('/seed')
    .put(seedAbyatAndMotoon)

router.route('/search')
    .get(searchForBayt)

router.route('/:name')
    .get(getAbyat)


export default router
