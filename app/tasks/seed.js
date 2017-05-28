//here we'll seed the database

const dbConnection = require('../config/mongoConnections');
const taskDataModule = require('../data');


dbConnection().then((db) => {
    return db.dropDatabase();
})
.then(() => {
    return taskDataModule.addNewTask(
        {
               title:"title",
               description : "desc",
               hoursEstimated : 2,
               completed: false
               
        } 
    )
})
.then((task) => {
    return taskDataModule.addNewComment(task._id, 
        {
            name: "Christian",
            comment: "seeding wasn't required for this lab, but I went above and beyond"
        }
    )
})
.then(() => {
    return taskDataModule.addNewTask(
         {
                title: "other title",
                description: "other description",
                hoursEstimated: 4,
                completed: false
        }
    );
}).then(() => {
    return dbConnection();
}).then((db)=> {
    return db.close();
})


   