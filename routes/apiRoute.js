module.exports = function(models, express, passport, config){
    var router = express.Router();

    router.authenticationError = function(res, message){
        return res.json({
            error: 'authentication error',
            success: false,
            message: message
        });
    }

    router.missingParametersError = function(res, message){
        return jsonError(res, 'missing parameters', message);
    }

    router.databaseError = function(res, message){
        return jsonError(res, 'database error', message);
    }

    router.get('/', function (req, res) {
        console.log('I received a GET API');
        return res.json({
          success : true
        })
    })

    router.post('/signup', function (req, res, next) {
      var fullname = req.body.fullname;
      var email = req.body.email;
      var password = req.body.password;

      passport.authenticate('local-signup', function(err, user, info) {
        if (err) {
                return router.authenticationError(res, err);
        }

        // if user is found and password is right
        else {
          return res.json({
              success:true,
              user : user
            });
        }

        })(req, res, next);

    });

    router.post('/login', function (req, res, next) {
      var email = req.body.email;
      var password = req.body.password;

      passport.authenticate('local-login', function(err, user, info) {
        if (err) {
                return router.authenticationError(res, err);
        }

        if (!user) {
                return router.authenticationError(res,"user not found");
        }

        // if user is found and password is right
        else {
          return res.json({
              success:true,
              user : user
            });
        }

        })(req, res, next);

    });



    require('./api/friendRoute.js')(models, router);

    return router;
}
