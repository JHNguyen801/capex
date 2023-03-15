const projectDB = require('../../data/projectData.js');
const Projects = projectDB.getModel();

/* 
    Find a specific id in the dabase and update the new data into a database
*/

module.exports = async (req, res, next) => {

  // define id variable
  let id = req.body.id;

  // define project object to look up the id in the database
  let project = await Projects.findById(id);

  // if the id is not found, then render 404
  if (!project) {
    return res.render('404');
  }

  // set the variables of the form
  project.projectDescription = req.body.projectDesc;
  project.budgetYear = req.body.budgetY;
  project.budgetAmount = req.body.budgetA;
  project.assetClass = req.body.assetC;
  project.department = req.body.depart;
  project.businessJustification = req.body.bussinessJ;
  project.requestor = req.body.reqName;
  project.status = req.body.stat;
  project.actualSpending = req.body.actualC;
  project.remainingBudget = req.body.budgetA - req.body.actualC;

  // save project to the database
  await project.save();

  res.format({
    // JSON format
    'application/json': function(){
      res.json({data});
    },
    // XML format
    'application/xml': function(){
      let resultXML = '<?xml version="1.0"?>\n' +
      '<project>\n'+
      '   <Budget Number">\n' + data.budgN +  '</Budget Number>\n' +
      '   <Project Description>' + result.projectDesc + '</Project Description>\n' + 
      '   <Budget Year>' + data.budgetY + '</Budget Year>\n' + 	
      '   <Budget Amount>' + data.budgetA + '</Budget Amount>\n' + 		
      '   <Asset Class>' + data.assetC + '</Asset Class\n' +
      '   <Department>' + data.depart + '</Department\n' +	
      '   <Bussiness Detail>' + data.bussinessJ + '</Bussiness Detail\n' +	
      '   <Requestor>' + data.reqName + '</Requestor\n' +	
      '   <Status>' + data.stat + '</Status\n' +	
      '   <actualSpending>' + data.actualC + '</actualSpending\n' +
      '   <Remaining Budget>' + data.budgetA - data.actualC + '</Remaining Budget\n' +				 
      '</project>\n';
    },
    
    'text/html': function() {
      res.redirect('/projects/admin'); // redirect to projects view page
    }
  })

  // res.redirect('/projects');
};
