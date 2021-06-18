const express = require ('express');
const router = express.Router();
const Todo = require('../models/ToDoModel');

router.get('/get-all-tasks', (req, res, next) => {
  console.log("get");
  //this will return all the data, exposing only the id and action field to the client
  Todo.find({}, 'todo')
    .then(data => res.json(data))
    .catch(next)
});

router.post('/create-task', (req, res, next) => {
  console.log(create);
  if(req.body.task){
    Todo.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.put('/update-task',(req,res,next)=>{
    if(req.body.id){
        Todo.findOne({_id:req.body.id},'todo')
            .then(data=>{
                data.task = req.body.task;
                data.isDone = req.body.isDone;
            })
            .catch(next)
      }
});

router.delete('/delete-task/:id', (req, res, next) => {
  Todo.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;