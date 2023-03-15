const projectDB = require('./data/projectData.js');
const Projects = projectDB.getModel();

(async() => {

	await Projects.deleteMany({});

	let budgetAmount;
	let actualSpending;
	let remaining;

	let capex1 = new Projects({
		budgetNumber: 4250,
		projectDescription: 'Upgrade Servers',
		budgetYear: 2024,
		budgetAmount: 120000,
		assetClass: 'Computer Hardware',
		department: 'Corporate Server',
		businessJustification: 'Replace new servers',
		requestor: 'John Doe',
		status: 'Pending',
		actualSpending: 0,
		remainingBudget: 0
	}); 

	let capex2 = new Projects({
		budgetNumber: 4010,
		projectDescription: 'New Offices',
		budgetYear: 2023,
		budgetAmount: 500000,
		assetClass: 'Leasehold Improvement',
		department: 'Facility',
		businessJustification: 'Expand operation',
		requestor: 'Mark Hackerway',
		status: 'Approved',
		actualSpending: 450000,
		remainingBudget: 0	
	}); 

	let capex3 = new Projects({
		budgetNumber: 1000,
		projectDescription: 'Laptops',
		budgetYear: 2022,
		budgetAmount: 100000,
		assetClass: 'Computer Hardware',
		department: 'IT',
		businessJustification: 'New laptops for new hires',
		requestor: 'Don Smith',
		status: 'Approved',
		actualSpending: 80000,
		remainingBudget: 0	
	});

	// Calculate budget amount
	budgetAmount = capex1.actualSpending + capex1.remainingBudget;
	capex1.budgetAmount = budgetAmount;
	remaining = capex2.budgetAmount - capex2.actualSpending;
	capex2.remainingBudget = remaining;
	budgetAmount = capex2.actualSpending + capex2.remainingBudget;
	capex2.budgetAmount = budgetAmount;
	remaining = capex3.budgetAmount - capex3.actualSpending;
	capex3.remainingBudget = remaining;
	budgetAmount = capex3.actualSpending + capex3.remainingBudget;
	capex3.budgetAmount = budgetAmount;

	await Promise.all([
		capex1.save(), 
		capex2.save(), 
		capex3.save()
	]);

	// let currentProject = await Projects.find({});

	process.exit();
})();