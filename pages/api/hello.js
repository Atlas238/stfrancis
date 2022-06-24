// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  const file = require('../../tempdata/Clients.json')
  console.log(file)
  res.status(200).json(clientFile)
}
