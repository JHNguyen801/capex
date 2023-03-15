const MongoClient = require('mongodb').MongoClient;
const credentials = require("./credentials.js");

const dbUrl = 'mongodb+srv://' + credentials.username +
	':' + credentials.password + '@' + credentials.host + '/' + credentials.database;

let client = null;

const getConnection = async () => {
	if (client == null)
		client = await MongoClient.connect(dbUrl,
			{ useNewUrlParser: true, useUnifiedTopology: true });
	return client;
}

module.exports.lookupByYear = async (budgetYear) => {
	let client = await getConnection();
	let collection = client.db(credentials.database).collection('capexProject_Nguyen');

	let result = await collection.find({ 'budgetYear': budgetyear }).toArray();

	if (result.length > 0)
		return result[0];
	else
		return undefined;
};

// Complete the code for the following
module.exports.lookupByClass = async (assetClass) => {
	let client = await getConnection();
	let collection = client.db(credentials.database).collection('capexProject_Nguyen');

	// define budget object to find the collection of asset data
	const budgetData = await collection.find({ 'assetClass': assetClass }).toArray();

	// return the city state and output
	return { budgetData};
};

module.exports.lookupByStatus = async (status) => {

	let client = await getConnection();
	let collection = client.db(credentials.database).collection('capexProject_Nguyen');

	const budgetData = await collection.find({ 'status': status }).toArray();

	// return the city state and output
	return { budgetData };
}; 