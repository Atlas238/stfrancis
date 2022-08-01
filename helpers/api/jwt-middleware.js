const expressJwt = require('express-jwt')
const util = require('util')
import getConfig from 'next/config'

const { serverRuntimeConfig } = getConfig()

export { jwtMiddleware }

// Checks token for validity
function jwtMiddleware(req, res) {
    const middleware = expressJwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256']}).unless({
        path: [
            '/api/users/authenticate'
        ]
    })

    return util.promisify(middleware)(req, res)
}