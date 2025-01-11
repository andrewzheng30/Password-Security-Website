const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
app.use(bodyParser.json());

// Password Strength Checker
app.post("/check-strength", (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    const strength = checkPasswordStrength(password);
    res.json({ strength });
});

// Password Hashing Endpoint
app.post("/hash-password", async (req, res) => {
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ error: "Password is required" });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        res.json({ hashedPassword });
    } catch (err) {
        res.status(500).json({ error: "Error hashing password" });
    }
});

// Password Strength Logic
function checkPasswordStrength(password) {
    let score = 0;

    if (password.length >= 8) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

    return score < 3 ? "Weak" : score < 5 ? "Moderate" : "Strong";
}

// Server Configuration
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
