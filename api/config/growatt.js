const Growatt = require('growatt')

const user="noc.netwey"
const passwort="NocNetwey2024"
const options={}

const growattLogin = async ()=>{
    const myapi = new Growatt({});
    let login = await myapi.login(user,passwort).catch(e => {console.log(e)})
    console.log('login:',login)
    return myapi;
}

module.exports = growattLogin