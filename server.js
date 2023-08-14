//some explained in my book
const express = require('express');
const { projectrouter } = require('./Routes/projectRoutes');//import, vscode will generate this automatically

const app = express()

app.use(express.json())

//the /project will be used in our .http path definition and the request will imported from routes (projectrouter)
app.use('/project', projectrouter)

app.use((err, req, res, next)=>{//return error in json formart
    res.json({Error: err})
})

app.listen(4500, ()=>{
    console.log('Server running on port 4500');
})

