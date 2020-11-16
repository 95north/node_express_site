// import { Router } from 'express';
// import auth from './routes/auth';
// import project from './routes/project';
// import user from './routes/user';
// // import agendash from './routes/agendash';


// // guaranteed to get dependencies
// export default () => {
// 	const app = Router();
// 	auth(app);
//     project(app);
//     user(app);
// 	// agendash(app);

// 	return app
// }




// Initialize express router
let router = require('express').Router();
console.log("Express Router initialized in API index file")
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
console.log("Basic testing home route up")
// Import contact controller
var projectController = require('../services/project.js');
console.log("projectController : ", projectController)

console.log("projectController.allprojects : ", projectController.allProjects) // is undefined. 
// Project routes
router.route('/allprojects')
    .get(projectController.allProjects)  // Route.get() requires a callback function but got a [object Undefined]
    // .get(allprojects)  // ReferenceError: allprojects is not defined
    // .post(projectController.new);
router.route('/p')
    .get(projectController.aProject)
    // .patch(contactController.update)
    // .put(contactController.update)
    // .delete(contactController.delete);
// Export API routes
module.exports = router;





// // Initialize express router
// let router = require('express').Router();
// // Set default API response
// router.get('/', function (req, res) {
//     res.json({
//         status: 'API Its Working',
//         message: 'Welcome to RESTHub crafted with love!',
//     });
// });
// // Import contact controller
// var contactController = require('./contactController');
// // Contact routes
// router.route('/contacts')
//     .get(contactController.index)
//     .post(contactController.new);
// router.route('/contacts/:contact_id')
//     .get(contactController.view)
//     .patch(contactController.update)
//     .put(contactController.update)
//     .delete(contactController.delete);
// // Export API routes
// module.exports = router;