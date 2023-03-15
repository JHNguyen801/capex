var express = require('express');
var router = express.Router();

//
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars');

var app = express();

// setup handlebars view engine
app.engine('handlebars', handlebars({defaultLayout: 'main_logo'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

/* */
// var homeProjects = require('./homeView');
var displayProjects 	= require("./displayProjects");

/* user module */
var displayProjectsUser = require("./user/displayProjectsUser");
var addProjectUser 			= require("./user/addProjectUser");
var editProjectUser		= require("./user/editProjectUser");
var saveProjectUser 			= require("./user/saveProjectUser");
var saveAfterEditUser 	= require("./user/saveAfterEditUser");
var deleteProjectUser 		= require("./user/deleteProjectUser");
var deleteProjectAfterConfirmUser 		= require("./user/deleteProjectAfterConfirmUser");

/* admin module */
var displayProjectsAdmin = require("./admin/displayProjectsAdmin");
var addProjectAdmin 			= require("./admin/addProjectAdmin");
var editProjectAdmin		= require("./admin/editProjectAdmin");
var saveProjectAdmin 			= require("./admin/saveProjectAdmin");
var saveAfterEditAdmin 	= require("./admin/saveAfterEditAdmin");
var deleteProjectAdmin 		= require("./admin/deleteProjectAdmin");
var deleteProjectAfterConfirmAdmin		= require("./admin/deleteProjectAfterConfirmAdmin");

// router specs
router.get('/', function(req, res, next) {
  res.redirect('/projects');
});

router.get('/user', function(req, res, next) {
  res.redirect('/projects/user');
});

router.get('/admin', function(req, res, next) {
  res.redirect('/projects/admin');
});

/* user */
router.get('/projects/user', displayProjectsUser);
router.get('/projects/user/add', addProjectUser);
router.post('/projects/user/add', saveProjectUser);
router.get('/projects/user/edit/:id', editProjectUser);
router.post('/projects/user/edit/', 	saveAfterEditUser);
router.get('/projects/user/delete/:id', deleteProjectUser);
router.post('/projects/user/delete', deleteProjectAfterConfirmUser);

/* admin */
router.get('/projects/admin', displayProjectsAdmin);
router.get('/projects/admin/add', addProjectAdmin);
router.post('/projects/admin/add', saveProjectAdmin);
router.get('/projects/admin/edit/:id', editProjectAdmin);
router.post('/projects/admin/edit/', 	saveAfterEditAdmin);
router.get('/projects/admin/delete/:id', deleteProjectAdmin);
router.post('/projects/admin/delete', deleteProjectAfterConfirmAdmin);


/* Original */
router.get('/projects', 						displayProjects);

module.exports = router;
