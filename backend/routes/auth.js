const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
// LinkedIn OAuth
const axios = require('axios');
const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = 'http://localhost:5173/linkedin-callback'; // Match your frontend
const jwtSecret = process.env.JWT_SECRET;

router.get('/linkedin', (req, res) => {
  const scope = 'r_liteprofile r_emailaddress';
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${scope}`;
  res.redirect(authUrl);
});

router.get('/linkedin/callback', async (req, res) => {
  const code = req.query.code;
  try {
    const tokenRes = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
    );

    const accessToken = tokenRes.data.access_token;

    const profileRes = await axios.get('https://api.linkedin.com/v2/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const emailRes = await axios.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const name = `${profileRes.data.localizedFirstName} ${profileRes.data.localizedLastName}`;
    const email = emailRes.data.elements[0]['handle~'].emailAddress;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: '', // password blank since it's OAuth-based
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token back to frontend
    res.redirect(`http://localhost:5173/linkedin-success?token=${token}`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'LinkedIn login failed' });
  }
});

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) return res.status(400).json({ msg: "Passwords don't match" });

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
