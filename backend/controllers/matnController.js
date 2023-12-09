import { tayebah } from '../motoon/tayebah.js'
import { shatebeya } from '../motoon/shatebeya.js'
import { dorra } from '../motoon/dorra.js'
import { normalizeText } from '../helpers/normalize.js'
import prisma from '../lib/prisma.js'

function splitByLine(str) {
    return str.split(/\r?\n/)
}

function splitByBayt(str) {
    let res = [];
    for (let line of str) {
        if (/^(\s*?)*$/gm.test(line)) continue //remove empty lines
        if (!/^([٠-٩]|[0-9])*/gm.test(line)) {
            continue
        } else {
            res.push(line);
        }
    }
    return res
}

export const addMatn = async (req, res) => {
    const { name, description } = req.body
    const createdMatn = await prisma.matn.create({
        data: {
            name: name,
            description: description ?? 'الوصف غير متوفر'
        }
    })
    res.send(createdMatn)
}


export async function getAbyat(req, res) {

    if (req.url?.endsWith('tayebah')) {
        const data = tayebah()
        const splitData = splitByLine(data)
        const abyat = splitByBayt(splitData)
        res.send(abyat)
    } else if (req.url?.endsWith('shatebeya')) {
        const data = shatebeya()
        const splitData = splitByLine(data)
        const abyat = splitByBayt(splitData)
        res.send(abyat)
    } else if (req.url?.endsWith('dorra')) {
        const data = dorra()
        const splitData = splitByLine(data)
        const abyat = splitByBayt(splitData)
        res.send(abyat)
    } else {
        res.send({ data: 'not found' })
    }
}

export async function getMotoon() {
    // const data = tayebah() + shatebeya() + dorra()
    // const splitData = splitByLine(data)
    // const abyat = splitByBayt(splitData)

    const abyat = await prisma.bayt.findMany({})
    // console.log('returning abyat')
    // console.log(abyat)
    return abyat
}

export async function getAllAbyat(req, res) {
    res.send(getMotoon())
}

export async function searchForBayt(req, res) {

    const { searchText } = req.body
    const data = await getMotoon()
    const nMatches = req.body.nMatches ?? 10
    let counter = 0
    let result = []
    console.log('before loop')
    console.log(data.length)
    for (let index = 0; index < data.length && counter <= nMatches; index++) {
        if (data[index].normalizedBayt.includes(searchText)) {
            // console.log(data[index])
            result.push(data[index])
            counter++
        }
    }

    console.log('after loop')
    console.log(result)
    res.send(result)

}

export async function seedAbyatAndMotoon(req, res) {



    await prisma.bayt.deleteMany({})
    await prisma.matn.deleteMany({})


    const numberOfMotoon = await prisma.matn.createMany({
        data: [{
            name: 'tayebah',
            description: 'متن الطيبة'
        },
        {
            name: 'shatebeya',
            description: 'متن الشاطبية'
        },
        {
            name: 'dorra',
            description: 'متن الدرة'
        }
        ]
    })

    const motoon = await prisma.matn.findMany({ where: { name: { in: ['tayebah', 'shatebeya', 'dorra'] } } })



    for (let matn of motoon) {

        console.log('in motoon')
        console.log(motoon)

        if (matn.name === 'tayebah') {
            let data = tayebah()
            let splitData = splitByLine(data)
            let abyat = splitByBayt(splitData)

            await prisma.bayt.createMany({
                data: abyat.map((bayt) => {
                    //     connect: {
                    //         id: matn.id
                    //     }
                    // },
                    return {
                        bayt: bayt,
                        // matn: {
                        matnId: matn.id,
                        normalizedBayt: normalizeText(bayt)
                    }
                })
            })
        }

        if (matn.name === 'shatebeya') {
            let data = shatebeya()
            let splitData = splitByLine(data)
            let abyat = splitByBayt(splitData)

            await prisma.bayt.createMany({
                data: abyat.map((bayt) => {
                    return {
                        bayt: bayt,
                        // matn: {
                        //     connect: {
                        //         id: matn.id
                        //     }
                        // },
                        matnId: matn.id,
                        normalizedBayt: normalizeText(bayt)
                    }
                })
            })
        }


        if (matn.name === 'dorra') {
            let data = dorra()
            let splitData = splitByLine(data)
            let abyat = splitByBayt(splitData)

            await prisma.bayt.createMany({
                data: abyat.map((bayt) => {
                    return {
                        bayt: bayt,
                        // matn: {
                        //     connect: {
                        //         id: matn.id
                        //     }
                        // },
                        matnId: matn.id,
                        normalizedBayt: normalizeText(bayt)
                    }
                })
            })
        }

    }


    res.send(await prisma.bayt.findMany())
}
