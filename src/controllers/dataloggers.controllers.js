import growattAPI from "../config/gowatt.js"

export const listDataLoggers =async (req, res) => {
    try {
        let dataloggers = await growattAPI.getDataLoggers().catch(e => { console.log(e) })
        console.log(dataloggers)
        res.json(dataloggers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}