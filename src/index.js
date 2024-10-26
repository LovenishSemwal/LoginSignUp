const express = require("express")
const app = express()
const path = require("path")
const hbs = require("hbs")
const {collection} = require("./mongodb")

const templatePath = path.join(__dirname, '../templates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({ extended: false }))


app.get("/", (req, res) => {
    res.render("login")
})

app.post("/login", async(req, res)=>{
    try{
        console.log(req.body);
        const email = req.body.email;
        const password= req.body.password;
        const user = await collection.findOne({email, password})
        if (user) {
            res.render("home")
        }
        else{
            throw new Error('false')
        }
    }
    catch(e)
    {
        console.log(e);
    }
})



app.get("/signup", (req, res) => {
    res.render("signup")
})


app.post("/signup", async (req, res) => {
    try {
        console.log(req.body);

        if (req.body.email=== "" || req.body.password=== "") {
           console.log("error");
        }
        else{        
        const data ={
            email: req.body.email,
            password: req.body.password
        }
        // console.log('1234');
        await collection.insertMany([data])

        res.render("home")
    }
}
    catch (err) { console.log(err); }

})


app.listen(3000, () => {
    console.log("port connected");
})