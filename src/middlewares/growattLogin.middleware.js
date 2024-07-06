import growatt from "../config/gowatt.js";

export const growattLogin = async (req, res,next) => {
    if (growatt.session.result != 1){
        console.log('CONNECT Growatt Session has expired, logining again')
        await growatt.login();
    }
    console.log('CONNECT Growatt session is active')
    next()
}