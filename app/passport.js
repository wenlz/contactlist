// load all the things we need
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt 		= require('bcrypt-nodejs');

// expose this function to our app using module.exports
module.exports = function(passport, emailValidator, configAuth, models) {
    var User = models.User;

    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
      User.findById(id, function (err, user) {
        done(err, user);
      });
    });

// START SIGNUP
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err) {
                return done(err);
            }

            // check to see if theres already a user with that email
            if (user) {
                err = "Email already exists";
                return done(err);
            } else {
                if(!emailValidator.validate(email)){
                    err = "Invalid email, please try again";
                    return done(err);
                }



				        // save the user
                bcrypt.hash(password, bcrypt.genSaltSync(8), null, function(err, hash) {


                // if there is no user with that email
                // create the user
                var user = new User();

                // set the user's local credentials
                user.fullname = req.body.fullname;
                user.email = email;
                user.password = hash;

                user.save(function (err, user) {
                    if (err) {
                        return done (err);
                    }
                    User.findOne({ _id: user._id}).exec(function (err, user) {
                        if (err) {
                            return done (err);
                        }

                        req.login(user, function (err) {
                            if (err) {
                                return done (err);
                            }
                            return done (null, user);
                        });
                    });
                });
              });
            }
        });
    }));
    // END SIGNUP

    // START LOGIN
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
      //console.log(email);
        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
                return done(err);
            }
                
            // if no user is found, return the message
            if (!user){
                err = "no user";
                return done(err);
            }

            // if the user is found but the password is wrong
            console.log(password);
            bcrypt.compare(password, user.password, function(err, res2) {

              console.log(res2);

              if(err){
              err = "invalid password";
              return done(err)
              }
              else if (res2 == false) {
                err = "Wrong password";
                return done(err)
              }
              else if (res2 = true) {
                return done(null, user)
              }
            });
        });

    }));

};
