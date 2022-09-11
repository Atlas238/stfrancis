import path from 'path'
const fs = require('fs')
const settings = require('../../public/json/settings.json')

export default function handler(req, res) {
    switch (req.method) {
        case 'GET' : 
            return res.status(200).json(settings)
        case 'POST': 
            return setSettings(req, res)
    }

    async function setSettings(req, res) {
        let updated = req.body
        let jsonDir = path.join(process.cwd(), 'public') + '/json/settings.json'
        fs.writeFile(jsonDir, updated, { flag: 'w+' }, function (err) {
            if (err) return res.status(500)
            return res.status(200)
        })
        return res.status(500)
    }
}
