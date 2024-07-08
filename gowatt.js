import Growatt from 'growatt'


class GrowattAPI {
    constructor() {
        this.options = {}
        this.api = new Growatt(this.options)
        this.session;
    }

    async login() {
        const user = process.env.GROWATT_USER;
        const password = process.env.GROWATT_PASSWORD;

        this.session = await this.api.login(user, password).catch(e => { console.log(e) })
        return 'Login succesfull'
    }
}

const growatt = new GrowattAPI()

if (growatt.api.isConnected()) {
    const plants = await growatt.api.getAllPlantData().catch(e => { console.log(e) })
    let plantKeys = Object.keys(plants)
    let plant = plants[plantKeys[0]]
    let device = plant.devices['TSEFDCD0BE']
    let devices = plant.devices
    let devicesIDS = Object.keys(devices)
    let dev = devices[devicesIDS[0]]

    // Plant ID, page
    let logger = await growatt.api.getDataLogger('2461525',1)
    let allDevicesOfPlant = await growatt.api.getAllPlantDeviceData('2606743')

    console.log(plant.id)
    console.log(plant.timezone)
    console.log(device)

    


    let loggers = await growatt.api.getDataLoggers().catch(e => { console.log(e) })
    const loggerRegister = await growatt.api.getDataLoggerRegister(loggers[0].sn, 5).catch(e => { console.log(e) })
}