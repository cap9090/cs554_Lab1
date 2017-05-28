const express = require('express');
const router = express.Router();
const taskDataModule = require('../data');

//400 is bad requst
//200 is success

//these should check to make sure the request body is valid that is all

router.get ("/", (req, res) => {
    return taskDataModule.getAllTasks().then((allTasks) => {
        res.status(200).send((allTasks));
        return;
    })
});

router.get("/:id", (req, res) => {
    return taskDataModule.getTasksById(req.params.id).then((task) => {
        res.status(200).send(task);
        return;
    })
});

router.post("/", (req, res) => {

    //400 if not all data is in request body
    if(!req.body.title || !req.body.description || !req.body.hoursEstimated || req.body.completed === undefined){
        res.status(400).send("make sure to include all necssary info in request body ");
    }

    return taskDataModule.addNewTask(req.body).then((task) => {
        res.status(200).send(task);
        return;
    })
});

router.put("/:id" , (req, res) => {
    //400 if no id field in request or if whole request body is not provided
    //if comments are provided just ignore them
    if( !req.body.title || !req.body.description || !req.body.hoursEstimated || req.body.completed === undefined){
        res.status(400).send("must provide full request body");
    }
    return taskDataModule.updateTask(req.params.id, req.body).then((id) => {
        res.status(200).send('task with id ' + id + ' was updated');
        return;
    })
});

router.patch("/:id" , (req, res) => {
       return taskDataModule.updateTask(req.params.id, req.body).then((id) => {
            res.status(200).send('task with id ' + id + ' was updated');
            return;
       })

});

router.post("/:id/comments", (req, res) => {
    //400 if not comment provided 
    if(!req.body.name || !req.body.comment){
        res.status(400).send();
    }
    return taskDataModule.addNewComment(req.params.id, req.body).then((comment) => {
        res.status(200).send(JSON.stringify(comment) + 'was added');
    }, (error) => {
        res.status(400).send(error);
    })
});

router.delete("/:taskId/:commentId" , (req, res) => {
    //400 if no taskId field or commentId field 
    return taskDataModule.deleteComment(req.params.taskId, req.params.commentId).then((id) => {
        res.status(200).send("comment with id " +  id + "was deleted" );
    }, (error) => {
        res.status(400).send(error);
    })
});

module.exports = router;