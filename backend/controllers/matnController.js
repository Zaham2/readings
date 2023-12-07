import fs from 'fs'
import { tayebah } from '../motoon/tayebah.js'
import { shatebeya } from '../motoon/shatebeya.js'
import { dorra } from '../motoon/dorra.js'
import { normalizeText } from '../helpers/normalize.js'
import arajs from 'arajs'

function splitByLine(str){
    return str.split(/\r?\n/)
}

function splitByBayt(str){
    let res = [];
    for(let line of str){
        if(/^(\s*?)*$/gm.test(line)) continue //remove empty lines
        if(!/^([٠-٩]|[0-9])*/gm.test(line)){
            continue
        } else {
            res.push(line);
        }
    }
    return res
}

export async function getAbyat(req, res) {

    if(req.url?.endsWith('tayebah')){
        const data = tayebah()
        const splitData = splitByLine(data)
        const abyat = splitByBayt(splitData)
        res.send(abyat)
    } else if (req.url?.endsWith('shatebeya')){
        const data = shatebeya()
        const splitData = splitByLine(data)
        const abyat = splitByBayt(splitData)
        res.send(abyat)
    } else if (req.url?.endsWith('dorra')){
        const data = dorra()
        const splitData = splitByLine(data)
        const abyat = splitByBayt(splitData)
        res.send(abyat)
    } else {
        res.send({data: 'not found'})
        }
    }

    export async function getAllAbyat(req, res) {

        console.log(req.url)
    
            const data = tayebah() + shatebeya() +dorra()
            const splitData = splitByLine(data)
            const abyat = splitByBayt(splitData)
            res.send(abyat)
    }

    export async function searchForBayt(req, res) {

            const data = tayebah() + shatebeya() +dorra()
            const splitData = splitByLine(data)
            const abyat = splitByBayt(splitData)

            let result = []

            for(let bayt of abyat){
                console.log(bayt)
                bayt = normalizeText(bayt)
                if(bayt.includes(req.body.searchText)){
                    result.push(bayt)
                }
            }

            console.log('res')
            console.log(result)

            res.send(result)

    }