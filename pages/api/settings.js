import path from 'path'
const fs = require('fs')
const settings = require('../../public/json/settings.json')

export default function handler(req, res) {
    switch (req.method) {
        case 'GET' : 
            getSettings(res)
            break
        case 'POST': 
            setSettings(req, res)
            break
    }

    async function getSettings(res) {
        res.status(200).json(settings)
    }

    async function setSettings(req, res) {
        let updated = req.body
        let jsonDir = path.join(process.cwd(), 'public') + '/json/settings.json'
        fs.writeFile(jsonDir, updated, { flag: 'w+' }, function (err, file) {
            if (err) throw err
            res.status(200).json(JSON.parse(file))
        })
        
    }
}
