import axios from 'axios';

console.log(process.env.GROWATT_HOST)
console.log(process.env.SMNTP_USER)

export const getToken = async () => {
    try {
        const response = await axios.post(
            `${process.env.GROWATT_HOST}/api/auth/login`,
            {
                nombre: process.env.GROWATT_USER_NAME,
                email: process.env.GROWATT_USER_EMAIL,
                apellidos: process.env.GROWATT_USER_LASTNAME
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
            }
        );

        return response.data.token;
    } catch (error) {
        console.error('Error al obtener el token de acceso:');
        return null;
    }
};


export const getPlants = async (token = null) => {

    if (!token) {
        let token = await getToken();
    }

    try {
        const response = await axios.get(
            `${process.env.GROWATT_HOST}/api/plants`,
            {
                headers: {
                    "Authorization": `${token}`,
                },
                timeout: 50000
            }
        );

        if (response.status === 403) {
            token = await getToken();
            if (token) {
                return getPlants();
            } else {
                return [];
            }
        }

        return response.data;
    } catch (error) {
        console.error('Error al obtener la lista de plantas:');
        return [];
    }
};


export const accessToken = await getToken()
console.log(accessToken)
