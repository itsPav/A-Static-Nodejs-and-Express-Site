const express = require('express');
const app = express();

const data = require('./data.json');
const path = require('path');

// Setting port
const port = 3000;

// Setting view engine
app.set('view engine', 'pug')

// Setting default file paths
app.use(express.static(path.join(__dirname, 'public')));
app.set("views", path.join(__dirname, "views"));

// Routing for the app
app.get('/', function (req, res) {
    res.render('index', { projects: data.projects })
  })

app.get('/about', function (req, res) {
    res.render('about', { title: 'Hey', message: 'Hello there!' })
})

app.get('/project/:id', function(req , res, next){
    var projectId = (req.params.id)[1];

    // if projectID results in an undefined project
    if(data.projects[projectId] === undefined){
        const error = new Error('Project does not exist.')
        res.render('error', {})
    // if projectID does not exist
    } else if (!projectId) { 
        const error = new Error('missing id')
        res.render('error', {})
    // if it's all good
    } else {
        res.render('project', { name: `${data.projects[projectId].project_name}`,
                                description: `${data.projects[projectId].description}`,
                                technologies: data.projects[projectId].technologies,
                                github: `${data.projects[projectId].github_link}`,
                                live: `${data.projects[projectId].live_link}`,
                                imgs: `${data.projects[projectId].project_pics}`
        });
    }
});

// Handle Errors
app.get('*', function(req, res, next){
    res.render('error', { })
});

// Starting server
app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});

module.exports = app;