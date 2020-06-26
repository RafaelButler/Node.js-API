const jwt = require("jsonwebtoken");

module.exports = {
    function(req, res, next) {
        const token = req.header("auth");
        if (!token) {
            return res.json({ message: "Acces Denied" });
        }

        try {
            const verified = jwt.verify(token, secretToken);
            req.user = verified;
        } catch {
            return res.json({ message: "Wrong Token" });
        }
    }
};
