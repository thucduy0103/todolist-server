const express = require ('express');
const router = express.Router();
const Todo = require('../models/ToDoModel');

router.get('/get-all-tasks', (req, res, next) => {
  console.log('get-all')
  //this will return all the data, exposing only the id and action field to the client
  Todo.find({})
    .then(data => res.json(data))
    .catch(next)
});

router.post('/create-task', (req, res, next) => {
  console.log(req.body);
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
  console.log(req.body);
    if(req.body._id){
        Todo.findOne({_id:req.body._id})
            .then(data=>{
              data.task = req.body.task;
                data.isDone = req.body.is_done;
                data.save(function (err) {
                  if (err) return handleError(err);
                  console.log(data);
                  res.send(data);
                });               
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