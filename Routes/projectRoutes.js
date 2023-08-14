const {Router} = require('express');//destructor it from express
//line below will be added automatically by vs code as you add each method
const { createProject, getProjects, getOneProject, updateProject, deleteProject } = require('../Controllers/projectsController');

const projectrouter = Router();// use router in a variable

projectrouter.post('/', createProject);//is a post bcos has body and posts
projectrouter.get('/', getProjects);
projectrouter.get('/:id', getOneProject);
projectrouter.put('/:id', updateProject);
projectrouter.delete('/:id', deleteProject);

module.exports = {
    projectrouter 
}