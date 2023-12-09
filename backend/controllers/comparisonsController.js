import prisma from '../lib/prisma.js'

export async function getAllComparisons(req,res) {

    const result = await prisma.comparison.findMany()
    if(!result) res.status(404).send('No comparisons found')
    else res.send(result)
}

export async function getComparison(req, res) {
    const result = await prisma.comparison.findUnique({
        where: { id: req.params?.id }
    })
    console.log(result)
    res.send(result)
}   

export async function createComparison(req, res) {
    const result = await prisma.comparison.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })
    
    console.log(result)
    res.send(result)
}

export async function updateComparison(req, res) {
    // const result = await prisma.comparison.findUnique({

    //     where: { id: req.params?.id }
    // })
    const ruleIds = req.body?.ruleIds
    ruleIds.map(async (ruleId) => {
        const result = await prisma.rule.findUnique({
            where: { id: ruleId }
        })
        if(!result) {
            res.status(404).send('Rule nto found')
            return
        }
        console.log(result)
    })

    const updated = await prisma.comparison.update({
        where: { id: req.params?.id },
        data: {
            ruleIds
        }
    })
    console.log(updated)
    res.send(updated)
}

export async function deleteComparison(req, res) {

    const updated = await prisma.comparison.update({
        where: { id: req.params?.id },
        
    })
    res.send(updated)
}


