const jwt = require('jsonwebtoken');
import getConfig from 'next/config';

import { apiHandler } from '../../../helpers/api/api-handler';

const { serverRuntimeConfig } = getConfig();

// users in JSON file for simplicity, store in a db for production applications
// const users = require('public/json/users.json');

export default apiHandler(handler);

// Authentication route - handles token signing and password checks
function handler(req, res) {
    switch (req.method) {
        case 'POST':
            return authenticate(res);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function findUser(users, username, password) {
        let userToReturn
        users.forEach(user => {
            if (user.username == username && user.password == password) {
                userToReturn = user
            }
        })
        return userToReturn
    }

    async function authenticate(response) {
        const res = await fetch('https://stfrancisone.herokuapp.com/home/getAllUsers')
        let users = await res.json()

        const { username, password } = req.body;

        const user = findUser(users, username, password)

        if (!user) throw 'Username or password is incorrect';
    
        // create a jwt token that is valid for 7 days
        const token = jwt.sign({ sub: user.volunteerID }, serverRuntimeConfig.secret, { expiresIn: '7d' });
    
        // return basic user details and token
        return response.status(200).json({
            volunteerID: user.volunteerID,
            username: user.username,
            token
        })
    }
}
