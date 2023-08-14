/*
The controller enables one to
    create a project
    access each project
    access one project
    access all projects
    delete on project
then export the functions
***steps
make one controller, add it to routes, then include it on app.http, send request and see the output


*/


const {v4} = require('uuid')//to generate unique ids, make sure you install uuid: npm i uuid

const projects = [];// we will store all our projects in an array

class Project{
    constructor(id, project_name, project_location, description, startdate, enddate){
        this.id = id
        this.project_name = project_name,
        this.project_location = project_location,
        this.description = description,
        this.startdate = startdate,
        this.enddate = enddate

    }
}

const createProject = async(req, res)=>{ //try catch to handle error
    try {
       const id = v4() 
        //request of type post hence requires body
       const {project_name, description, project_location, startdate, enddate} = req.body//the route is going to direct it so that it is gotten by app.http for modification

       const newProject = {id, project_name, description, project_location, startdate, enddate}

       projects.push(newProject)

    //    console.log(projects)
        res.json({
            message: "Project created Succesfully",
            project: newProject
        })
    } catch (error) {
        return res.json({error})
    }
}

const  getProjects = async(req, res)=>{//has no request since its a get 
    try {
        res.json({projects: projects})
    } catch (error) {
        return res.json({error})
    }
}

const getOneProject = async(req, res)=>{
    try {
        const id = req.params.id//get the id parameter from the body

        // console.log(id);

        const project = projects.filter(el =>el.id == id)//filter the array to get the one with the id

        res.json({//return rewult in json
            project
        })
    } catch (error) {
        return res.json({error})
    }
}

const updateProject = async(req, res)=>{
    try {
        const id = req.params.id

        const {project_name, description, project_location, startdate, enddate} = req.body

        const project_index = projects.findIndex(project => project.id == id)

        if (project_index <0) {
            res.json('Project not found')
        }
        else{
            projects[project_index] = new Project(id, project_name, description, project_location, startdate, enddate)
        }
        res.json({
            message: "Project updated successfully",
            project: projects[project_index]
        })
    } catch (error) {
        return res.json({Error: error})
    }
}

const deleteProject = async(req, res)=>{
    try {
        const id = req.params.id

        let project_index = projects.findIndex(project => project.id==id)

        if(project_index< 0){
            res.json({message: 'project not found'})
        }
        else{
            projects.splice(project_index, 1)
        }

        return res.json({
            message: 'deleted successfully'
        })
    } catch (error) {
        return res.json({Error: error})
    }
}

module.exports = {
    createProject,
    getProjects,
    getOneProject,
    updateProject,
    deleteProject
}