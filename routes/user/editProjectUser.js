const projectDB = require('../../data/projectData.js');
const Projects = projectDB.getModel();

module.exports = async (req, res, next) => {
  try {
    let id = req.params.id;
    let project = await Projects.findById(id).exec();

    if (!project) {
      return res.render('404');
    }

    let data = {
      id: project.id,
      budgetNumber: project.budgetNumber,
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
    };

    res.format({
      'application/json': function () {
        res.json(data);
      },

      'application/xml': function () {
        let resultXML = '<?xml version="1.0"?>\n<projects>\n' +
          '<project>\n' +
          '   <Budget Number>' + data.budgetNumber + '</Budget Number>\n' +
          '   <Project Description>' + data.projectDescription + '</Project Description>\n' +
          '   <Budget Year>' + data.budgetYear + '</Budget Year>\n' +
          '   <Budget Amount>' + data.budgetAmount + '</Budget Amount>\n' +
          '   <Asset Class>' + data.assetClass + '</Asset Class>\n' +
          '   <Department>' + data.department + '</Department>\n' +
          '   <Bussiness Detail>' + data.businessJustification + '</Bussiness Detail>\n' +
          '   <Requestor>' + data.requestor + '</Requestor>\n' +
          '   <Status>' + data.status + '</Status>\n' +
          '   <actualSpending>' + data.actualSpending + '</actualSpending>\n' +
          '   <Remaining Budget>' + data.remainingBudget + '</Remaining Budget>\n' +
          '</project>\n</projects>\n';
        res.type('application/xml');
        res.send(resultXML);
      },

      'text/html': function () {
        res.render('./user/editProjectUserView', {
          title: 'Edit a Project',
          data: data
        });
      }
    });
  } catch (err) {
    console.log("Error selecting project: ", err);
    next(err);
  }
};