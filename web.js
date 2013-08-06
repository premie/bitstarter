process.env.PWD = process.cwd()

var express = require('express');
var fs = require('fs');

var stripeApiKey = "sk_live_bIN2AebwP4qxObQab0sw6uwj";
var stripeApiKeyTesting = "sk_test_tk6iYu7K4khzJGxi6YglNYe1";

var stripe = require('stripe')(stripeApiKeyTesting);

var buffer = fs.readFileSync('index.html');
var string = buffer.toString();

var app = express.createServer(express.logger());
app.use(express.static(process.env.PWD + '/assets'));
app.use(express.static(process.env.PWD + '/assets/js'));
app.use(express.static(process.env.PWD + '/assets/css'));
app.use(express.static(process.env.PWD + '/assets/img'));

app.use(express.bodyParser());

app.get('/', function(request, response) {
  response.send(string);
});

app.post('/test-charge', function(request, response) {

    var token = request.param('stripeToken',null); // or request.body.stripeToken
    console.log('token: '+ token);
    var chargeAmount = parseInt(parseFloat(request.body.amount.substring(2).replace(/,/g, ''))*100);

    stripe.charges.create(
	{ amount: chargeAmount,
	  currency: 'usd', //see https:stripe.com/docs/api#create_charge
	  card: token},
	function(err, customer) {
	    if (err) {
		console.log(err.message);
		return;
	    } 
	    //success
	    console.log("It worked!\nCharged Customer id#"+customer.id+" $"+chargeAmount/100);
	    var successAlert = "<script>alert('Thanks for funding this campaign.  Your card has been charged: $ "+(chargeAmount/100).toFixed(2).toString()+"');</script>";
	    successAlert += string;
	    response.send(successAlert);
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
