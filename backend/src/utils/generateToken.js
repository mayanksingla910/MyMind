import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET|| 'defaultsecretkey';
const EXPIRATION_TIME = '30d';

export const generateToken = (userId) => {
    return jwt.sign(
        {
            id : userId
        }, SECRET_KEY, { expiresIn: EXPIRATION_TIME }
    );
};
