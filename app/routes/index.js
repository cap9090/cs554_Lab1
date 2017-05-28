const taskRoutes = require("./taskRoutes");

var constructorMethod = function (app) {
    app.use("/tasks", taskRoutes);

    app.use("*", (request, response ) => {
        response.status(404).send("Nothing here, try http://localhost:3000/tasks");
    })
}

module.exports = constructorMethod;