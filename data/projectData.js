const mongoose = require('mongoose');

const credentials = require("../credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// Create a Capex Schema 
let capexSchema = new Schema({
	budgetNumber: Number,
    projectDescription: String,
    budgetYear: String,
    budgetAmount: Number,
    assetClass: String,
    department: String,
    businessJustification: String,
    requestor: String,
    status: String,
    actualSpending: Number,
    remainingBudget: Number,	
}, {
	collection: 'capexProject_Nguyen' // database collection
});

module.exports = {	
	getModel: () => {
		if (connection == null) {
			console.log("Creating connection and model...");
			connection = mongoose.createConnection(dbUrl, 
				{ useNewUrlParser: true, useUnifiedTopology: true });
			// project model	
			model = connection.model("ProjectModel", capexSchema);
		};
		return model;
	}
};
























