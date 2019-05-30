const jwt = require("koa-jwt");
const SECRET = "S3cRET~!";
const jwtInstance = jwt({secret: SECRET});
const jsonwebtoken = require("jsonwebtoken");

function JWTErrorHandler(res, next) {
    return next().catch(err => {
        if(401 === err.status) {
            res.status = 401;
            res.body = {
                "error": "Not authorized"
            };
        } else {
            throw err;
        }
    });
};

module.exports.jwt = () => jwtInstance;
module.exports.errorHandler = () => JWTErrorHandler;
module.exports.issue = (payload) => {
    return jsonwebtoken.sign(payload, SECRET);
};
