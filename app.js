// ***** *** Require Packages: *** *****
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const _ = require("lodash");

const app = express();

const port = process.env.port || 4000;

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Create a New Database inside MongoDB via Connecting mongoose:
mongoose.connect("mongodb+srv://admin-christos:VrNW8KK2ldCl1Ofs@cluster0.60f7pkb.mongodb.net/todolistDB", { useNewUrlParser: true });

//Created Schema
const itemsSchema = new Schema({
    name: String
});

//Created model
const Item = mongoose.model("Item", itemsSchema);

//Creating items
const item1 = new Item({
    name: "Welcome to your todolist!"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

//Storing items into an array
const defaultItems = [item1, item2, item3];

const listSchema = {
    name: String,
    items: [itemsSchema]
};

// Create a list Model:
const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {


    // Mongoose find()
    Item.find({}).then(function(foundItems) {

            if (foundItems.length === 0) {
                // Mongoose insertMany()
                Item.insertMany(defaultItems)
                    .then(function() {
                        console.log("Successfully saved default items to DB");
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
                res.redirect("/");
            } else {
                res.render("list", { listTitle: "Today", newListItems: foundItems });
            }
        })
        .catch(function(err) {
            console.log(err);
        });
});

// Create a custom parameters Route:
app.get("/:customListName", function(req, res) {
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({ name: customListName })
        .then(function(foundList) {

            if (!foundList) {
                // Create a new list.
                // Create a new Mongoose Document:
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });

                list.save();
                console.log("saved");
                res.redirect("/" + customListName);
            } else {
                //Show an existing list:
                //Go to the page.
                res.render("list", { listTitle: foundList.name, newListItems: foundList.items });
            }
        })
        .catch(function(err) {});
});

app.post("/", function(req, res) {

    // Adding a New Item:
    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });

    if (listName === "Today") {
        // Save item to mongoose:
        item.save().then(function() { console.log("Successfully added the new Item"); })
            .catch(function(err) {
                console.log(err);
            })

        // render item to home page:
        res.redirect("/");
    } else {
        List.findOne({ name: listName })
            .then(function(result) {
                result.items.push(item);
                result.save();
            })
            .catch(function(err) {
                console.log(err);
            });
        res.redirect("/" + listName);
    }

});

app.post("/delete", function(req, res) {
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName;

    if (listName === "Today") {
        Item.findByIdAndRemove(checkedItemId).then(function() { console.log("Successfully Removed checked Item"); })
            .catch(function(err) {
                console.log(err);
            });

        res.redirect("/");
    } else {
        List.findOneAndUpdate({name: listName}, {$pull:{items: {_id: checkedItemId}}}).then(function() {res.redirect("/" + listName); })
        .catch(function(err){
            console.log(err);
        });
    }


});



app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
  });