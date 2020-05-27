const {AuthenticationError} = require('apollo-server')
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('../config')

module.exports = (context) =>{
    // context = {...hearder}

    const authHeader = context.req.headers.authorization;
    if(authHeader){
        const token = authHeader.split('Bearer ')[1];
        if(token){
            try{
                const user = jwt.verify(token,SECRET_KEY);
                return user
            }catch(err){
                throw new AuthenticationError('Invalib/Expired token')

            }
            
        }
        throw new AuthenticationError('Authentiocation token must be Bearer [token]')
    }
    throw new AuthenticationError('Authorization header must  be provided')
}