const express = require('express');
const app = express();

// const timer = setTimeout(() => {});


// // App level Middleware.
// app.use((req, res, next) => {
//     console.log("This is the 1st middleware function");
//     // throw new Error("This is an error thrown from the 1st middleware function");
//     next();
// });



// app.use((err, req, res, next) => {
//     console.log("This is the error handling middleware function", err);
//     res.status(500).send("Something went wrong!");
// });

app.get('/univeristy/collageName/:collegeName/department/:departmentName/student/:studentId/details', (req, res) => {
    console.log("This is the university controller function");
    res.send({
        "Method": req.method,
        "URL": req.url,
        "Query": req.query,
        "Body": req.body,
        "Params": req.params
    });
});



// URL, Method, Controller.
app.get('/', (req, res) => {
    console.log("This is the home controller function");
    res.send({
        "Method": req.method,
        "URL": req.url,
        "Query": req.query,
        "Body": req.body
    });
});

app.get('/student', (req, res) => {
    console.log("This is the student controller function");
    res.send({
        "Method": req.method,
        "URL": req.url,
        "Query": req.query,
        "Body": req.body
    });
});

app.get('/data', (req, res) => {
    console.log("This is the data controller function");
    res.status(210).send("This is the data page of the Express App");
});

// app.use(Timer);

app.listen(3000, () => {
    console.log("Server is running on PORT: 3000"); 
});


function authentication(req, res, next) {
    console.log("This is the authentication middleware function");
    next();
}

function Timer (req, res, next) {
    console.log("This is the timer middleware function");
    next();
}