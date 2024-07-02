"use strict"
const api = require('growatt')

const user = "noc.netwey"
const passwort = "NocNetwey2024"
const options = {}


const growatt = new api({})

const test = async () => {
    let login = await growatt.login(user, passwort).catch(e => { console.log(e) })
    console.log('login:', login)

    let getAllPlantData = await growatt.getAllPlantData(options).catch(e => { console.log(e) })
    console.log('getAllPlatData:', JSON.stringify(getAllPlantData, null, ' '));

    let loggers = await growatt.getDataLoggers().catch(e => { console.log(e) })
    console.log('Loggers', loggers)

    let logout = await growatt.logout().catch(e => { console.log(e) })
    console.log('logout:', logout)
}

test()