import growatt from "../config/gowatt.js"
import {db} from "../config/firebase.js"



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
    const { frequency } = req.body

    if (frequency) {
        try {
            const frecuencyConfig = db.collection('config').doc('frequency');
            await frecuencyConfig.update({
                frequency: frequency
            });

            res.json({ 'frequency': frequency })
        } catch (error) {
            res.status(501).json({ "error": "Error updating document: " });
        }
    }
}