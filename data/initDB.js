const projectDB = require('../projectData.js');
const Projects = projectDB.getModel();

(async() => {

	await Projects.deleteMany({});

	let capex1 = new Projects({
		budgetId: 4250,
		projectName: 'Upgrade Servers',
		budgetYear: 'FY23',
		budgetAmount: 120000,
		assetClass: 'Computer Hardware',
		department: 'Corporate Server',
		businessJustification: 'Replace new servers',
		requestor: 'John Doe',
		status: 'Pending',
		actualSpending: 0,
		remainingBudget: budgetAmount - actualSpending
	}); 

	let capex2 = new Projects({
		budgetId: 4250,
		projectName: 'New Offices',
		budgetYear: 'FY23',
		budgetAmount: 500000,
		assetClass: 'Leasehold Improvement',
		department: 'Facility',
		businessJustification: 'Expand operation',
		requestor: 'Mark Hackerway',
		status: 'Approved',
		actualSpending: 500000,
		remainingBudget: budgetAmount - actualSpending	
	}); 

	let capex3 = new Projects({
		budgetId: 4250,
		projectName: 'Laptops',
		budgetYear: 'FY23',
		budgetAmount: 100000,
		assetClass: 'Computer Hardware',
		department: 'IT',
		businessJustification: 'New laptops for new hires',
		requestor: 'Don Smith',
		status: 'Approved',
		actualSpending: 80000,
		remainingBudget: budgetAmount - actualSpending	
	}); 


	await Promise.all([
		capex1.save(), 
		capex2.save(), 
		capex3.save()
		]);

	let currentProject = await CapeExpProject.find({});

	console.log(currentProject);

	process.exit();


})();












