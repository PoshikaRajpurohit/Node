const express = require("express")
const server = express()
server.use(express.urlencoded())
server.set("view engine", "ejs")
let tasks=[
    {
        id:"1",
        time:"5:30 AM",
        task:"Wake up & Morning Walk",
        priority:'High',
        category:"Health",
        status:"Completed "
    },
    {
        id:"2",
        time:"7:30 AM",
        task:"Attend College",
        priority:'High',
        category:"Education",
        status:"In Progress "
    },
    {
        id:"3",
        time:"2:00 PM",
        task:"Study Polity(GS)",
        priority:'Medium',
        category:"Education",
        status:"Pending"
    },
    {
        id:"4",
        time:"5:30 PM",
        task:"Buy Groceries",
        priority:'Low',
        category:"Household Work",
        status:"Pending"
    },
    {
        id:"5",
        time:"7:00 PM",
        task:"Work on Project",
        priority:'High',
        category:"Developement",
        status:"Pending"
    }
]
server.get("/", (req,res) => {
    res.render("Index",{tasks})
})
server.get("/add", (req,res) => {
    res.render("Add")
})
server.post("/add-task",(req,res) =>{
    let newtask=req.body
    tasks.push(newtask)
    res.redirect("/")
})
server.get("/delete-task/:id", (req,res) =>{
    let id= req.params.id;
    tasks=tasks.filter(tas=> tas.id !=id)
    res.redirect("/")
})
server.get("/edit-task/:id",(req,res)=>{
    let id= req.params.id;
    let singletask=tasks.find(tas=> tas.id === id);
    res.render("Edit",{task:singletask})
})
server.post("/update-task/:id",(req,res)=>{
    let id=req.params.id;
    let updatedtask=tasks.map(tas=>{
        if(tas.id===id){
            return{...req.body,id:id}
        }else{
            return tas;
        }
    })
    tasks=updatedtask;
    res.redirect("/")
})
server.use((req, res) => {
  res.status(404).render("NotFound");
});

server.listen(8502,()=>{
    console.log("server started at http://localhost:8502")
})