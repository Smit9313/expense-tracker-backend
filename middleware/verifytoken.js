const jwt = require("jsonwebtoken");

exports.authenticateToken = (req, res, next) => {
    // Get the Bearer token from the request headers
    const tokenHeader = req.headers["authorization"];

    if (!tokenHeader) {
        return res.status(401).json({ message: "Authentication required" });
    }

    // Extract the token from the header (it should be in the format "Bearer <token>")
    const token = tokenHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, "ABC");

        // return res.status(403).json({ message: "Token is not valid" });

        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        res.status(403).json({ message: err.message });
    }

    // Verify the token
};
