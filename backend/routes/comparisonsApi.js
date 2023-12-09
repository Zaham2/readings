


import express from 'express'
import {getAllComparisons, getComparison, updateComparison, deleteComparison, createComparison} from '../controllers/comparisonsController.js'

const router = express.Router()

router.route('/')
    .get(getAllComparisons)
    .post(createComparison)

router.route('/:id')
    .get(getComparison)
    .put(updateComparison)
    .delete(deleteComparison)

export default router

