const capexDB = require('../projectData.js');
const Projects = capexDB.getModel();

/*
  search the project id, and display the data from the database
*/
module.exports = async (req, res, next) => {

    // define the project variable and set it to find the id
    let capexProject = await Projects.find({});

    // define resuts to map the project data from the database search
    let results = capexProject.map(project => {
        return {
            id: project._id,
            budgetNumber: project.budgetNumber,
            projectDescription: project.projectDescription,
            budgetYear: project.budgetYear,
            budgetAmount: `$${project.budgetAmount.toLocaleString()}`,
            assetClass: project.assetClass,
            department: project.department,
            businessJustification: project.businessJustification,
            requestor: project.requestor,
            status: project.status,
            actualSpending: `$${project.actualSpending.toLocaleString()}`,
            remainingBudget: `$${project.remainingBudget.toLocaleString()}`
        }
    })

    // Implement the JSON and XML
    res.format({
        // JSON format
        'application/json': function () {
            res.json(results);
        },

        // XML format
        'application/xml': function () {
            let resultXML = '<?xml version="1.0"?>\n<projects>\n';
            capexProject.forEach(project => {
                resultXML += '<project>\n' +
                    '   <BudgetNumber>' + project.budgetNumber + '</BudgetNumber>\n' +
                    '   <ProjectDescription>' + project.projectDescription + '</ProjectDescription>\n' +
                    '   <BudgetYear>' + project.budgetYear + '</BudgetYear>\n' +
                    '   <BudgetAmount>' + project.budgetAmount + '</BudgetAmount>\n' +
                    '   <AssetClass>' + project.assetClass + '</AssetClass>\n' +
                    '   <Department>' + project.department + '</Department>\n' +
                    '   <BusinessJustification>' + project.businessJustification + '</BusinessJustification>\n' +
                    '   <Requestor>' + project.requestor + '</Requestor>\n' +
                    '   <Status>' + project.status + '</Status>\n' +
                    '   <ActualSpending>' + project.actualSpending + '</ActualSpending>\n' +
                    '   <RemainingBudget>' + project.remainingBudget + '</RemainingBudget>\n' +
                    '</project>\n';
            });

            resultXML += '</projects>';

            res.type('application/xml');
            res.send(resultXML);
        },

        'text/html': function () {
            res.render('displayProjectView', { title: "List of Projects - Home View", data: results });
        }
    });

};
