var express = require('express')
var router = express.Router()
var passport = require('./auth')

// Define routes.
router.get('/',
  function(req, res) {
    res.render('home', { user: req.user })
  })

router.get('/login',
  function(req, res) {
    if (req.user)
      res.redirect('/profile')
    else
      res.render('login')
  })
  
router.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/')
  })
  
router.get('/logout',
  function(req, res) {
    req.logout()
    res.redirect('/')
  })

router.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res) {
    res.render('profile', { user: req.user })
  })

module.exports = router
