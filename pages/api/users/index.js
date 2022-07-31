import { apiHandler } from '../../../helpers/api/api-handler';

// users in JSON file for simplicity, store in a db for production 
const users = require('/public/json/users.json');

export default apiHandler(handler);

// Handles the users route - helper for authenticate in a way 
function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getUsers();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getUsers() {
        // return users without passwords in the response
        const response = users.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });
        return res.status(200).json(response);
    }
}