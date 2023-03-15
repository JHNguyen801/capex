const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let connection = null;
let model = null;

let Schema = mongoose.Schema;

// Create a Capex Schema 
let capexSchema = new Schema({
	budgetNumber: Number,
    projectDescription: String,
    budgetYear: Number,
    budgetAmount: {type: Number},
    assetClass: String,
    department: String,
    businessJustification: String,
    requestor: String,
    status: String,
    actualSpending: {type: Number},
    remainingBudget: {type: Number},	
}, {
	collection: 'capexProject_Nguyen' // database collection
});

// var counter = mongoose.model('counter', capexSchema);

// var entitySchema = mongoose.Schema({
//     testvalue: {type: Number}
// });

// entitySchema.pre('save', function(next){
// 	var doc = this;
// 	counter.findByIdAndUpdate({budgetNumber: 'entityId'}, {$inc: { seq: 1} }, function(error, counter)   {
//         if(error)
//             return next(error);
//         doc.testvalue = counter.seq;
//         next();
//     });
// })

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
























