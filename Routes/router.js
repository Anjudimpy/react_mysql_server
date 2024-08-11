const express  = require("express");
const router = new express.Router();
const conn = require("../db/conn");

// add student data
router.post("/create",(req,res)=>{
    //console.log(req.body);

    const { name, email,  add,city, state,mobile,img } = req.body;

    if(!name || !email || !add || !city || !state || !mobile){
           res.status(422).json("plz fill the all data")
    }
    
    try{
       conn.query("SELECT * FROM schools WHERE email=?", email,(err,result)=>{
        if(result.length){
            res.status(422).json("This Data is Already Exist")
        }else{
            conn.query("INSERT INTO schools SET ?",{ name, email,  add,city, state,mobile,img  },(err, result)=>{
                if(err){
                    console.log("err" + err);
                }else{
                    res.status(201).json(req.body);
                }
            })
        }
       })
    }catch(error){

    }
});

//get userdata

router.get("/getstudents",(req,res)=>{

    conn.query("SELECT * FROM schools",(err,result)=>{
        if(err){
            res.status(422).json("nodata available");
        }else{
            res.status(201).json(result);
        }
    })
});

// user delete api

router.delete("/deleteuser/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("DELETE FROM schools WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});



// get single user

router.get("/induser/:id",(req,res)=>{

    const {id} = req.params;

    conn.query("SELECT * FROM schools WHERE id = ? ",id,(err,result)=>{
        if(err){
            res.status(422).json("error");
        }else{
            res.status(201).json(result);
        }
    })
});


// update users api


router.patch("/updateuser/:id",(req,res)=>{

    const {id} = req.params;

    const data = req.body;

    conn.query("UPDATE schools SET ? WHERE id = ? ",[data,id],(err,result)=>{
        if(err){
            res.status(422).json({message:"error"});
        }else{
            res.status(201).json(result);
        }
    })
});

module.exports = router;
