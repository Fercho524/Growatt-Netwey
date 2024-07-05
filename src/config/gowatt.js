import Growatt from 'growatt'

const options={}

const growattLogin = async ()=>{
    const myapi = new Growatt({});
    const user = process.env.GROWATT_USER;
    const password = process.env.GROWATT_PASSWORD;

    let login = await myapi.login(user,password).catch(e => {console.log(e)})
    console.log('login:',login)
    return myapi;
}

const growattAPI = await growattLogin()

export default growattAPI;