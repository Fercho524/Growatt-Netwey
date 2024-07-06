import Growatt from 'growatt'


class GrowattAPI{
    constructor(){
        this.options = {}
        this.api = new Growatt(this.options)
        this.session;
    }

    async login(){
        const user = process.env.GROWATT_USER;
        const password = process.env.GROWATT_PASSWORD;

        this.session = await this.api.login(user,password).catch(e => {console.log(e)})
        return 'Login succesfull'
    }
}


const growatt = new GrowattAPI()
const login = await growatt.login()

if (login){
    console.log('CONNECT Growatt API Connected')
}


export default growatt;