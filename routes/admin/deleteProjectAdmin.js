const projectDB = require('../../data/projectData.js');
const Projects = projectDB.getModel();

module.exports = async (req, res, next) => {
  let id = req.params.id; // Define id as parameter

  try {
    // Use await to wait for the query to complete
    let project = await Projects.findById(id).exec();
    
    if (!project) {
      // Use return to prevent further execution if project is not found
      return res.render('404');
    }

    // Set data variable to project
    let data = project;

    // Use res.format() to handle different response formats
    res.format({
      'application/json': function () {
        // Use res.json() to send JSON response
        res.json(data);
      },

      'application/xml': function () {
        // Use res.type() to set response content type
        res.type('application/xml');
        // Use template literals to construct XML response
        let resultXML = `<?xml version="1.0"?>
        <projects>
          <project>
            <BudgetNumber>${data.budgN}</BudgetNumber>
            <ProjectDescription>${data.projectDescription}</ProjectDescription>
            <BudgetYear>${data.budgetYear}</BudgetYear>
            <BudgetAmount>${data.budgetAmount}</BudgetAmount>
            <AssetClass>${data.assetClass}</AssetClass>
            <Department>${data.department}</Department>
            <BusinessJustification>${data.businessJustification}</BusinessJustification>
            <Requestor>${data.requestor}</Requestor>
            <Status>${data.status}</Status>
            <ActualSpending>${data.actualSpending}</ActualSpending>
            <RemainingBudget>${data.remainingBudget}</RemainingBudget>
          </project>
        </projects>`;
        res.send(resultXML);
      },

      'text/html': function () {
        // Render the edit page view to show project data
        res.render('./admin/deleteProjectAdminView', {
          title: 'Delete a Project',
          data: {
            id: project.id,
            budgetNumber: project.budgN,
            projectDescription: project.projectDescription,
            budgetYear: project.budgetYear,
            budgetAmount: project.budgetAmount,
            assetClass: project.assetClass,
            department: project.department,
            businessJustification: project.businessJustification,
            requestor: project.requestor,
            status: project.status,
            actualSpending: project.actualSpending,
            remainingBudget: project.remainingBudget
          }
        });;
      }
    });
  } catch (err) {
    // Use next() to pass error to next error handling middleware
    next(err);
  }
};

