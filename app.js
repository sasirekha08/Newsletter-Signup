const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;

    var data={
        members:[
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    }

    var jsonData=JSON.stringify(data);

    var options={
        url:"https://us4.api.mailchimp.com/3.0/lists/77f94f6d22",
        method:"POST",
        headers:{
            "Authorization":"JamesP a63103150ea2965b52fd59f391e16c1a-us4"
        },
        body: jsonData
    };


    request(options,function(error,response,body){
        if(error){
            res.sendFile(__dirname+"/failure.html");
            console.log(error);
        }
        else{
            if(response.statusCode==200){
                res.sendFile(__dirname+"/success.html");
                console.log(response.statusCode);    
            }
            else
            {
                res.sendFile(__dirname+"/failure.html");
            }
        }
    })
    
})

app.post("/failure",function(req,res){
    res.redirect("/");
})


app.listen(process.env.PORT || 3000,function(){
    console.log("Server is running on port 3000")
})

//77f94f6d22
//a63103150ea2965b52fd59f391e16c1a-us4