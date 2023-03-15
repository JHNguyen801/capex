const projectDB = require('../../data/projectData.js');
const Projects = projectDB.getModel();

module.exports = async (req, res, next) => {
  // This function generates a random number
  function generateRandomId() {
    const randomNumber = Math.floor(Math.random() * 9000) + 1000;
    return `${randomNumber}`;
  }
  
  // define data as request body
  let data = req.body;

  /* 
    Create a new object project  
   */
  let project = new Projects({
    budgetNumber: data.budgN = generateRandomId(), 
    projectDescription: data.projectDesc,
    budgetYear: data.budgetY,
    budgetAmount: data.budgetA,
    assetClass: data.assetC,
    department: data.depart, 
    businessJustification: data.bussinessJ,
    requestor: data.reqName,
    status: data.stat,
    actualSpending: data.actualC, 
    remainingBudget: data.budgetA - data.actualC
  });
  
  console.log(project);

  // save method store the new data into a database
  project.save((err,result) => {
    if(err){
      console.log("Error updating : %s ", err);
    }
    res.format({
      // JSON format
      'application/json': function(){
        res.json({statusCode: 200, data: data});
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
        res.type('application/xml');
        res.send(resultXml);
      },
      
      'text/html': function() {
        res.redirect('/projects/admin'); // redirect to projects view page
      }
    });   
  });
};
