const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const foundUser = await User.findOne({ refreshToken });
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "id": User._id
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1m' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = { handleRefreshToken }