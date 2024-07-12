import growatt from "../config/gowatt.js"
import db from "../config/firebase.js"



export const setVoltageThreshold = async (req, res) => {
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

export const setFrequencyThreshold = async (req, res) => {
    const { voltage: frecuency } = req.body

    if (frecuency) {
        try {
            const frecuencyConfig = db.collection('config').doc('frecuency');
            await frecuencyConfig.update({
                voltage: frecuency
            });

            res.json({ 'frecuency': frecuency })
        } catch (error) {
            res.status(501).json({ "error": "Error updating document: " });
        }
    }
}