var express = require('express');
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express();

// setup handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main_logo'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Use the mongo module
const capex = require('./mongoModule');

// GET request to the homepage
app.get('/', function (req, res){
	res.render('displayProjectView');
});

app.get('/projects', async function(req, res) {
	if (req.query.budgetYear) {
		let budgetYear = req.query.budgetYear;
		let result = await capex.lookupByYear(budgetYear);
		res.render('displayProjectView', result);
	} 
});

app.post('/projects', async function(req, res) {
	let budgetYear = req.body.budgetYear;
	let result = await capex.lookupByYear(budgetYear);
	res.render('displayProjectView', result);
});


app.get('/projects/:budgetYear', async function(req, res) {
	let budgetYear = req.params.budgetYear;
	let result = await capex.lookupByYear(budgetYear);

	res.format({

		'application/json': function() {
			res.json(result);
		},

		'application/xml': function() {
			let resultXml = 
				'<?xml version="1.0"?>\n' +
						'<Budget Year="' + result.budgetYear + '">\n' + 
						'   <Budget Number>' + result.budgetNumber + '</Budget Number>\n' + 
						'   <Project Description>' + result.projectName + '</Project Name>\n' + 	
						'   <Budget Amount>' + result.budgetAmount + '</Budget Amount>\n' + 
						'   <Asset Class>' + result.assetClass + '</Asset Class>\n' +
						'   <Department>' + result.department + '</Department>\n' +	
						'   <Bussiness Detail>' + result.businessJustification + '</Bussiness Detail>\n' +	
						'   <Requestor>' + result.requestor + '</Requestor>\n' +	
						'   <Status>' + result.status + '</Status>\n' +	
						'   <Actual Spending>' + result.assetClass + '</Actual Spending>\n' +	
						'   <Remaining Budget>' + result.assetClass + '</Remaining Budget>\n' +					 				 
						'</Budget Year>\n';
					
			res.type('application/xml');
			res.send(resultXml);
		},

		'text/html': function() {
			res.render('displayProjectView', result);

		}
	});
});


// Complete the code for the following

app.get('/projects', async function(req, res){
	if((req.query.city) && (req.query.state)){
		let assetClass = req.query.assetClass;
		let output = await capex.lookupByClass(assetClass);
		res.render('displayProjectView', output);
	}
});

app.post('/projects', async function(req, res){
	let assetClass = req.query.assetClass;
	let output = await capex.lookupByClass(assetClass);
	res.render('displayProjectView', output);
});

app.get('/projects/:projects', async function(req, res) {
	let assetClass = req.params.assetClass;
	let output = await capex.lookupByClass(assetClass);
	res.format({
		'application/json': () => {
			res.json(output);
		},

		'application/xml': () => {
			'<?xml version="1.0"?>\n' +
			'<Budget Year="' + result.budgetYear + '">\n' + 
			'   <Budget Number>' + result.budgetNumber + '</Budget Number>\n' + 
			'   <Project Description>' + result.projectName + '</Project Name>\n' + 	
			'   <Budget Amount>' + result.budgetAmount + '</Budget Amount>\n' + 
			'   <Asset Class>' + result.assetClass + '</Asset Class>\n' +
			'   <Department>' + result.department + '</Department>\n' +	
			'   <Bussiness Detail>' + result.businessJustification + '</Bussiness Detail>\n' +	
			'   <Requestor>' + result.requestor + '</Requestor>\n' +	
			'   <Status>' + result.status + '</Status>\n' +	
			'   <Actual Spending>' + result.assetClass + '</Actual Spending>\n' +	
			'   <Remaining Budget>' + result.assetClass + '</Remaining Budget>\n' +					 				 
			'</Budget Year>\n';

			res.type('application/xml');
			res.send(capexXml);
		},

		'text/html': () => {
			res.render('displayProjectView', output);
		},
	});

});