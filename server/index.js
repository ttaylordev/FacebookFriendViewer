var express = require( 'express' );
var session = require( 'express-session' );
var passport = require( 'passport' );
var FacebookStrategy = require( 'passport-facebook' ).Strategy;
var keys = require('../keys');

//initialize app
var app = express();

//initialize dependencies
app.use( session( {
  secret: "thisIsMySecret"
} ) );
app.use( passport.initialize() );
app.use( passport.session() );

// Passport
passport.use( new FacebookStrategy( {
  clientID: keys.facebook_clientID,
  clientSecret: keys.facebook_clientSecret,
  callbackURL: 'http://localhost:3000/auth/facebook/callback'
}, function ( token, refreshToken, profile, done ) {
  return done( null, profile ); // first param is if error
} ) );

app.get( '/auth/facebook', passport.authenticate( 'facebook' ) );
app.get( '/auth/facebook/callback', passport.authenticate( 'facebook', {
  successRedirect: '/me',
  failureRedirect: '/login'
} ) );

passport.serializeUser(function(dataToSerialize, done){
  done(null, dataToSerialize);
});
passport.deserializeUser(function(dataFromSessionTopPutOnRepDotUser, done){
  done(null, dataFromSessionTopPutOnRepDotUser);
});

// read end point
app.get( '/me', function(req, res){
  res.send(req.user);
}); //meCtrl.read );

//routing Variables
var port = 3000;


// app listen
app.listen( port, function () {
  console.log( 'listening on port ', port );
} );
