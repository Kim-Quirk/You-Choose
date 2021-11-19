const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated');
        return res.status(401).json({
            message: "An Error occured",
            error: error
        });
        // error.StatusCode = 401;
        // throw error;
    }
    let decodedToken;
    try {
        decodedToken = jwt.verify(authHeader, process.env.SECRET);
    } catch (err) {
        const error = new Error(err);
        return res.status(500).json({
            message: "An Error occured",
            error: error
        });
        // err.statusCode = 500;
        // throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated');
        return res.status(401).json({
            message: "An Error occured",
            error: error
        });
        // error.statusCode = 401;
        // throw error;
    }
    req.userId = decodedToken.userId;
    next();
}