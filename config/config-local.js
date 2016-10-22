module.exports = {
    'sessionSecret': '12345QWERTY',
    'sessionExpirationInSeconds' : 8600000,

    'facebookAuth' : {
		    'clientID' 		: '{{insert your clientID}}',
        'clientSecret'  : '{{inser your clientSecret}}',
		    'callbackURL' 	: 'http://localhost:3000/auth/facebook/callback'
	  }
};
