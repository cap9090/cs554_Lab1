const dbCollections = require("../config/mongoCollections");
const tasks = dbCollections.tasks;
const uuid = require('node-uuid');

//return a promis for all of these

let getAllTasks = () => {
   return tasks().then((taskCollection) => {
        return taskCollection.find().toArray();
    })
};

let getTasksById = (id) => {
   return tasks().then((taskCollection) => {
        return taskCollection.findOne({_id: id}).then((task) => {
            if(!task) throw "task not found";
            return task;
        });
    }).catch((error)=> {
        return error;
    })
};

let addNewTask = (taskInfo) => {
    return tasks().then((taskCollection) => {
        let newTask = {
            _id : uuid.v4(),
            title: taskInfo.title,
            description: taskInfo.description,
            hoursEstimated: taskInfo.hoursEstimated,
            completed: taskInfo.completed
        };

        return taskCollection.insertOne(newTask).then((newInsertInformation) => {

             return newInsertInformation.insertedId;

            }).then((id) => {
                return getTasksById(id);
            });
    }).catch((error) => {
        console.log(error);
        return error;
    })
};

let updateTask = (id, updatedTaskInfo) => {
   
    return tasks().then((taskCollection) => {
        
        return taskCollection.updateOne({_id: id}, {$set: updatedTaskInfo}).then(() => { return id; });
    })
};

let addNewComment = (taskId, newComment) => {
    return getTasksById(taskId).then((task) => {
        if(task.comments === undefined) {
            return updateTask(taskId, {comments: []});
        }
    }).then(() => {
        return tasks();
    }).then((taskCollection) => {
        return taskCollection.updateOne({_id: taskId}, {$push : {comments : {_id: uuid.v4(), name: newComment.name, comment: newComment.comment}}});
    }).then((status) => {
        if(status.modifiedCount === 0) {
          throw ("Unable to insert comment");
        }else {
          return newComment;
        }
    }).catch ((error) => {
        return error;
    })
}


    


let deleteComment = (taskId, commentId) => {
    return tasks().then((taskCollection) => {
        return taskCollection.updateOne({_id: taskId}, {$pull : {comments: {_id: commentId}}})
    }).then((writeResult) => {
        if(writeResult.modifiedCount !== 0) {
          return commentId;
        } else {
          throw "Unable to remove comment with id " + commentId;
        }
    })
};



module.exports = {
    getAllTasks : getAllTasks,
    getTasksById : getTasksById,
    addNewTask: addNewTask,
    updateTask: updateTask,
    addNewComment: addNewComment,
    deleteComment: deleteComment
};