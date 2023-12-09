import express from 'express'
import {getAllRules, getRule, updateRule, deleteRule, createRule} from '../controllers/rulesController.js'
import path from 'path'

const router = express.Router()

router.route('/')
    .get(getAllRules)
    .post(createRule)

router.route('/:id')
    .get(getRule)
    .put(updateRule)
    .delete(deleteRule)

export default router

