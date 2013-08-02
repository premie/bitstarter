var express = require('express');
var fs = require('fs');

var buffer = fs.readFileSync('index.html');
var string = buffer.toString();

var app = express.createServer(express.logger());
app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/assets/css'));
app.use(express.static(__dirname + '/assets/img'));
app.use(express.static(__dirname + '/assets/js'));

app.get('/', function(request, response) {
  response.send(string);
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Node Server  on port " + port);
});

var stripeApiKey = "sk_live_bIN2AebwP4qxObQab0sw6uwj";
var stripeApiKeyTesting = "sk_test_tk6iYu7K4khzJGxi6YglNYe1";
var stripe = require('stripe')(stripeApiKey);
   
app.post("/test-page", function (req, res) {
    var token = req.body.stripeToken;

    stripe.customers.create(
	{ email: "foobar@example.org" },
	function(err, customer) {
	    if (err) {
		console.log(err.message);
		return;
	    }
	    console.log("customer id", customer.id);
	}
    );

});
