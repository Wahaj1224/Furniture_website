const { expressjwt: expressJwt } = require('express-jwt');
const dotenv = require('dotenv');

dotenv.config();

function authJwt() {
    const secret = process.env.SECRET;

    // console.log(process.env.SECRET);
    // const api = process.env.API_URL;

    return expressJwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: '/api/furni/content', methods: ['GET', 'OPTIONS'] },
            { url: '/api/furni/blog_content', methods: ['GET', 'OPTIONS'] },
            { url: '/api/furni/team', methods: ['GET', 'OPTIONS'] },
            {url: '/api/furni/subscribe',method:['GET','OPTIONS','POST']},
            {url: '/api/furni/contact',method:['GET','OPTIONS','POST']},
            // {url: '/api/furni/blog', methods:['GET','OPTIONS','POST']},
            '/api/furni/login',
            '/api/furni/register',
        ],
    });
    // .unless({
    //     path: [
    //         { url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS'] },
    //         { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
    //         { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
    //         { url: /\/api\/v1\/orders(.*)/, methods: ['GET', 'OPTIONS', 'POST'] },
    //         `localhost:5000/api/furni/login`,
    //         `localhost:5000/api/furni/register`,
    //     ],
    // });
}

async function isRevoked(req, token) {
    console.log('Token payload:', token.payload); 

    return new Promise((resolve, reject) => {
        if (!token.payload.isAdmin) {

            console.log('Token revoked: Not an admin');
            return resolve(true); // Revoke token if user is not admin
        }
        console.log('Token accepted: Admin user');
        resolve(false); // Do not revoke token
    });
}

module.exports = authJwt;
