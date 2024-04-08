const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    console.log("auth", req.headers['x-token']);

    try {
        const user = jwt.verify(req.headers['x-token'], 'token');

        req.user = {
            id: user.id,
        };
      } catch(err) {
        return res.status(401).send({
            success: false,
            error: 'Auth failed',
        });
      }
      next();
};

module.exports = auth;