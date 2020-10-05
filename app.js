const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");


const app = express();
var newItems = ["Buy Food", "Cook Food", "Eat Food"];
let workItem = [];
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    let day = date.getDate();
    res.render("list", {
        kinday: day,
        newListItem: newItems
    });
});

app.get("/work",function(req,res){
    res.render("list",{kinday:"Work",newListItem:workItem});
})

app.get("/about",function(req,res){
    res.render("about");
})

app.post("/", function (req, res) {
    if (req.body.list==="Work")
    {
        workItem.push(req.body.nItem);
        res.redirect("/work");
    }
    else
    {
        newItems.push(req.body.nItem);
        res.redirect("/");
    }

})

app.post("/work",function(req,res){
    workItem.push(req.body.nItem);
    res.redirect("/work");
})
app.listen("3000", function () {
    console.log("Server is running on port 3000");
})