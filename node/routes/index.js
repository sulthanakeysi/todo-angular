const express= require("express"),
      router = express.Router(),
      model = require("../models/model");
const controller = require("../controllers/controllers");


// displaying tasks from database
router.get('/', controller.getController);

//inserting tasks into database
router.post('/', controller.insertController);

//update tasks in database
router.put('/update/:id', controller.updateController);

//delete tasks from database
router.delete('/delete/:id',controller.deleteController);

//update tasks when checked
router.put('/check/:id', controller.checkController);
    
//navigating to active tasks
router.get('/active', controller.activeController);

// navigating to completed tasks
router.get('/completed', controller.completedController);

// clearing all completed tasks
router.delete('/clear', controller.clearController);

module.exports = router;
