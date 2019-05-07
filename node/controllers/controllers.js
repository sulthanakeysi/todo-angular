
const model = require("../models/model");


// displaying tasks from database
exports.getController = async function(req,res){

    try{
        await model.todo.find({},(err,docs) =>{
            if(err) console.log("err");
            else{
                return res.json(docs);
            }
        }); 
    }

    catch(error){
        console.log("Error while displaying tasks",error);
        return res.json({status:false,error:error});
    }
    
}



//inserting tasks into database
exports.insertController = async function(req,res){

    try{
        //adding new task
        let task = await new model.todo({task: req.body.task,done: false});
        //saving to database
        task.save((err,task) => {
            if (err) return console.error("database saving error");
            else  res.json(task);

        });
    }
    catch(error){
        console.log("Error while inserting tasks",error);
        return res.json({status:false,error:error});
    }
    
}



//update tasks in database
exports.updateController = async function(req, res){

    try {
        let updated_task=await model.todo.findByIdAndUpdate(req.params.id,{task:req.body.task},{new:true});
        return res.json({status:true,task:updated_task});
    } 

    catch (error) {
        console.log("Error while updating tasks",error);
        return res.json({status:false,error:error});
    }
}



//delete tasks from database
exports.deleteController = async function( req,res) {

    try{
        await model.todo.deleteOne({_id:req.params.id});
        return res.send(true);
    }

    catch(error){
        console.log("error while deleting task",error);
        return  res.json({status:false,error:error});
    }
}



//update tasks when checked
exports.checkController = async function(req,res){

    try{
        let checkedTask =await model.todo.findByIdAndUpdate({_id:req.params.id}, {done:!req.body.done},{new:true});
        return res.json({status:true,task:checkedTask});
    }

    catch(error){
        console.log("error while checking the task",error);
        return  res.json({status:false, error:error});
    }   
        
}



//navigating to active tasks
exports.activeController = async function(req,res){

    try{
        await model.todo.find({done:false},(err,docs) =>{
            if(err) console.log("err");
            else{
                res.json(docs);
            }
        });
    }

    catch(error){
        console.log("error while navigating",error);
        return  res.json({status:false,error:error});
    }

}



// navigating to completed tasks
exports.completedController = async function(req,res){

    try{
        await model.todo.find({done:true},(err,docs) =>{
            if(err) console.log("err");
            else{
                res.json(docs);
            }
        });
    }
    
    catch(error){
        console.log("error while navigating",error);
        return  res.json({status:false,error:error});
    }
}



// clearing all completed tasks
exports.clearController = async function(req,res){

    try{
     await model.todo.deleteMany({done:true})
    res.send(true);
    }

    catch(error){
        console.log("error while deleting all tasks",error);
        return  res.json({status:false,error:error});
    }

}