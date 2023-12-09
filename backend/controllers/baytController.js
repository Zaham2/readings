import { normalizeText } from '../helpers/normalize.js'
import prisma from '../lib/prisma.js'


export async function getAllAbyat(req, res) {
    const abyat = await prisma.bayt.findMany()
    res.send(abyat)
}

export async function addBayt(req, res) {
    console.log('making new bayt')
    const matnId = req.body.matnId
    const name = req.body.matn
    const bayt = req.body.bayt

    // if(!matnId || !bayt){
    //     console.log('missing matn or bayt')
    //     return res.send({error: 'missing matn or bayt'})
    // }

    // use prisma to create a bayt which has a reference to a matn
    // don't copy code from this file
    // const 
    // const obj = 
    if (!prisma.matn.findUnique({ where: { id: req.body.matnId, name: name } })) {
        console.log('matn not found')
        return res.send({ error: 'matn not found' })
    }

    // res.send(getMatn)
    const createdBayt = await prisma.bayt.create({
        data: {
            bayt: req.body.bayt,
            matn: {
                connect: {
                    id: req.body.matnId
                }
            },
            normalizedBayt: normalizeText(req.body.bayt)
        }
    })
    res.send(createdBayt)
}
