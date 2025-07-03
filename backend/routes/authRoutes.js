const express = require('express');
const authRoutes = express.Router();
const { registerController, loginController, getMe } = require('../controllers/authController.js');
const authMiddleware = require('../middleware/authMiddleware.js');
const passport = require("passport");

authRoutes.post('/login', loginController);

authRoutes.post('/register', registerController);

authRoutes.get('/getMe', authMiddleware, getMe);

//google authentication here:-

authRoutes.get('/google',
  passport.authenticate("google", { scope: ["profile", "email"] })

);

//handling callback

authRoutes.get('/google/callback',
  passport.authenticate("google", { failureRedirect: "/login", session: true }),
  (req, res) => {
    const token = req.user.token;
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
    res.redirect('http://localhost:5173/dashboard');
  }
);

authRoutes.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:5173");
  });
});
module.exports = authRoutes;