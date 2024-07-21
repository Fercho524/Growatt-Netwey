import {db} from "../config/firebase.js"


export const setStorageParamsThresholds = async (req, res) => {
    const { voltage } = req.body

    if (voltage) {
        try {
            const voltageConfig = db.collection('config').doc('voltage');
            await voltageConfig.update({
                voltage: voltage
            });

            res.json({ 'voltage': voltage })
        } catch (error) {
            res.status(501).json({ "error": "Error updating document: " });
        }
    }
}

export const setInverterParamsThresholds = async (req, res) => {
    const { frequency } = req.body

    res.status(501).json({"message":"Funcionalidad no implementada"})
}