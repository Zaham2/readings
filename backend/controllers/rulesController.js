import prisma from '../lib/prisma.js'

export async function getAllRules(req,res) {

    const result = await prisma.rule.findMany()
    if(!result) res.status(404).send('No rules found')
    else res.send(result)
}

export async function getRule(req, res) {
    const result = await prisma.rule.findUnique({
        where: { id: req.params?.id }
    })
    console.log(result)
    res.send(result)
}   

export async function createRule(req, res) {
    const result = await prisma.rule.create({
        data: {
            createdAt: new Date(),
            updatedAt: new Date(),
            name: req.body?.name,
            rawy: req.body?.rawy,
            matn: req.body?.matn,
        }
    })
    console.log(result)
    res.send(result)
}

export async function updateRule(req, res) {
    const result = await prisma.rule.findUnique({
        where: { id: req.params?.id },
        data: {
            ruleIds: req.body?.ruleIds,
        }
    })
    
    console.log(result)
    res.send(result)
}

export async function deleteRule(req, res) {

    const updated = await prisma.rule.delete({
        where: { id: req.params?.id },
    })
    res.send(updated)
}


