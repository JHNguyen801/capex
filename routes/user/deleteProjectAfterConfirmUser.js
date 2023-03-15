const projectDB = require('../../data/projectData.js');
const Projects = projectDB.getModel();

/*
  search the project id, and delete data from the database
  */
module.exports = async (req, res, next) => {

  // define id as parameter
  let id = req.body.id;

  // define project object to look up the id in the database
  let project = await Projects.findById(id);

  // if not found display 404
  if (!project) {
    return res.render('404');
  }

  // set the variables of the form
  project.budgetNumber = req.body.budgetNumber
  project.projectDescription = req.body.projectDesc;
  project.budgetYear = req.body.budgetY;
  project.budgetAmount = req.body.budgetA;
  project.assetClass = req.body.assetC;
  project.department = req.body.depart;
  project.businessJustification = req.body.bussinessJ;
  project.requestor = req.body.reqName;
  project.status = req.body.stat;
  project.actualSpending = req.body.actualC;
  project.remainingBudget = req.body.remaining;

  // remove the data from the DB
  await project.remove();

  // after data delete, the app redirects to the projects view page
  res.redirect('/projects/user');
}

