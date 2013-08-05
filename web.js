var express = require('express');
var fs = require('fs');

var stripeApiKey = "sk_live_bIN2AebwP4qxObQab0sw6uwj";
var stripeApiKeyTesting = "sk_test_tk6iYu7K4khzJGxi6YglNYe1";

var stripe = require('stripe')(stripeApiKeyTesting);

var buffer = fs.readFileSync('index.html');
var string = buffer.toString();

var app = express.createServer(express.logger());

app.use(express.bodyParser());

app.get('/', function(request, response) {
  response.send(string);
});

app.post('/test-charge', function(request, response) {

    var token = request.param('stripeToken',null); // or request.body.stripeToken
    console.log('token: '+ token);

    stripe.charges.create(
	{ amount: '0050',
	  currency: 'usd', //see https:stripe.com/docs/api#create_charge
	  card: token},
	function(err, customer) {
	    if (err) {
		console.log(err.message);
		return;
	    } 
	    //success
	    console.log("customer if: ", customer.id);
	    response.send("It worked");
	}
    );
});
app.post('/test-charge2', function(request, response) {

    var token = request.param('stripeToken',null); // or request.body.stripeToken
    console.log('token: '+ token);

    stripe.charges.create(
	{ amount: '0075',
	  currency: 'usd', //see https:stripe.com/docs/api#create_charge
	  card: token},
	function(err, customer) {
	    if (err) {
		console.log(err.message);
		return;
	    } 
	    //success
	    console.log("customer if: ", customer.id);
	    response.send("It worked");
	}
    );
});


app.post('/signup', function(request, response){

    response.send("Under construction! Username:"+request.param("username")+" Password:"+request.param("password")+" Email:"+request.param("email"));
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Node Server on port " + port);
});
