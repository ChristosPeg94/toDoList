# toDoList
First i create the fixed javaScript code to run the server.

Inside the hyper i install the npm, express, body-parser, require.

I used if/else statement to make the logic:
for example:
if it's a weekday --> Work
else (Weekend) --> Free day

I need the EJS to run my app with templates.

I install the EJS in my server.

To run the EJS need some code:
app.set('view engine', 'ejs');

So i need to create i folder that the server is going to look for.
The file named "view".
Inside this folder I create the file: "list.ejs".

In this file I write html code.

In my app.js i write the code that passes the variable so passes the current value
of the current day.

res.render('list', { kindOfDay: day });

the key that passes in the list.ejs is kindOfDay
and the value is day.

In order to passes my parameter in the list.ejs 
I use the EJS TAG: <%= Outputs the value into the template (HTML escaped)
I use the code : <%= kindOfDay%> in the list.ejs file.

Then (in the app.js) I use the switch method in order to have a value of every single of the week.
To pass the value in the key kindOfDay. That matches in the list.ejs .

I want to change the color of the day in the output result at thw web.
So i use the EJS TAG: <% 'Scriptlet' tag, for control-flow, no output.
To allow me to write some javaScript code in the EJS file.
NOTE: the EJS TAG: <% ... %> should only included code that it is NOT HTML code.

Instead of using the switch method :
switch (currentDay) {
        case 0:
            day = "Sunday"
            break;
        case 1:
            day = "Monday"
            break;
        case 2:
            day = "Tuesday"
            break;
        case 3:
            day = "Wednesday"
            break;
        case 4:
            day = "Thursday"
            break;
        case 5:
            day = "Friday"
            break;
        case 6:
            day = "Saturday"
            break;
        default:
            console.log("Error: current day is equal to: " + currentDay); 
            break;
    }

    there is a better solution in <stackoverflow>

    Using the : toLocaleDateString(); method

    To use this method:
    First create a javaScript object named options:
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"};

    Next I use this object to render my <day>.
    let day = today.toLocaleDateString("en-US", options);

    At this point I can change the list.ejs code.
    By changing the <h1> level. I can replace the code:
    <h1>
        <%= kindOfDay %>
    </h1>

Now that I make the code clear, I can continue By
make the to-do list, using <ul> and <li>.

After making my list I want to pass data in my server throw this list.

    In order to do this I used "post request".

    First I make the <form> in the list/ejs file.
        In this form I use action="/" which is the root rout.
        And the method="post"

    Then inside the <form> I create the <input>
        <input type="text" name="newItem">

    Then inside the <form> I create the <button>
        <button type="submit" name="button">Add</button>

    In order to pass my data in the server
    I use the app.post method.

    And in order to have access to the body of the
    list.ejs file i used the:
    const bodyParser = require("body-parser"); in the app.js file
    Also i write the code:
    app.use(bodyParser.urlencoded({ extended: true })); 
    so the app.js use the bodyParser
    
    And the by setting (let) a variable a keep the data
    by using the: req.body.newItem 
    and the newItem is the name of the input in list.js file

Now that I pass data form the wed page into the server,
I want to pass the data back to the server to create a
new list item.
    
    I create a new list item and it's content
    it's an EJS TAG <%= %> that it's render newListItems:
    <%= newListItems %>

    Now I need to pass in that newListItems.

    In order to do this i redirect the data to the root rout.
     And then render  the "list" template passing also the newListItems the value of the item.


    I want to keep the values of every new input.
    So I make an empty array named items that I append(push) every new input.

    Then I use the EJS TAG:<% ... %> in the list.ejs file.
    to write javaScript code that is looping throw my items list and create a new list element
    for every item in my items list.

Now it's time to style (CSS) the application.

    First I create the public folder. Inside the public folder I create the css folder and inside the css folder
    I create the styles.css.

    Then in the app.js file bu using express I give access to the public folder:
    app.use(express.static("public"));

    Then I write the <link> in the list.ejs file so the styles.css file passes to my web application.

    Now it's time to make my styles.css file as I prefer to style my web application by using css code.

After I'm done with the style I made some changes to the code to be cleaner and more accurate.

I changed the word kindOfDay --> listTitle for meaning purposes

Now I want to make a new template.
    For this I made a new app.get and I target
    the work template by using the /work rout

    Then I create the app.post
    I made change in the HTML file to succeed passing data to server
    and the back to the wed to new template.

Now I want to make layout by using EJS.

    I create 2 new files named header.ejs + footer.ejs inside the view folder.
    This 2 files will included the header and the footer that is going to repetend in 
    all the web page of my web application.

    I implement the code of header and footer at the correct files,
    and I add at the list.ejs the EJS TAG.
    <%- include('header'); -%>
        ...
        ...
    <%- include('footer'); -%>

Now I create a web page called about.
    And by using the EJS TAG for the layout, my web page has the style that i want.qq

Now I want to restore the data by using Mongoose.
    First I have to install Mongoose.
        I install it in the terminal "npm i mongoose"
    Then I require the mongoose package inside the app.ejs file.
    
    Now I create a new data-base  inside mongodb
        The way of doing this is inside the app.ejs file,
        I type "mongoose.connect()" and then the thing that 
        I am going to connect to is the URL that mongodb is hosted locally.
        "mongoose.connect("mongodb://0.0.0.0:27017")".
        Then I specify the name of the data-base:
            mongoose.connect("mongodb://0.0.0.0:27017/todolistDB")

        Now I have to create a new items schema.
            const itemsSchema = new Schema({
                _id: Number,
                name: String
});


        Then I create the mongoose model based on the schema.
            const Item = mongoose.model("Item", itemSchema);

        Then I create 3 new Items and a new array named "defaultItems",
        which include the 3 new Items. 

        Then I use the mongoose method insertMany(), so that I insert all 3 items
        in one go into my items collection.

    Then I want to find all the data that there are inside the items collection.
        To do that, inside the root rout, I call the find() method inside the app.js file, so I send over to my list.ejs
        to render in my todolist.

    Then inside the list.ejs file I want to track only the name of the rendered 
    javaScript object and to do this I implement an forEach() method inside
    the list.ejs file.

    Then I want to show to the user Only the 3 default added items the first time 
    and every time the user add new item, I want to add only the new added and not the 3 every time.
        I call an if statement that checks the length of the foundItems array.
        If is 0 I call the insertMany method to add the 3 default items,
        and redirect them to the root rout.
        Else I render the new added item.

    Next I want to add every new adding item (that user adds, every time the user hit the "+")
    to the database and refresh the page with adding to the list that
    the user sees.
        For this, I implement the code inside the app.js file,
        at the post method of the root rout.
        I const the itemName variable witch holds the req.body.newItem value,
        I create an item document by using the itemName,
        which only has a single field "name" and the value is going to be
        the itemName.

        Then I use the item.save() and the res.redirect("/")
        methods.

    Now I want to give to the user the capability of deleting an items of the list,
    when the user clicks on the box right of each item.
    Action must happened when the user clicks the checkbox.
        Inside the list.ejs file I create a new <form> which includes
        the item <div>.
        Then to the styles.css file I implement the form to specific target
        all the forms that have class item. form.item

        Then inside the list.ejs file and in the form that I implement,
        I add the method="post" and action="/delete".
        In the <input> I add the type onChange="this.form.submit()"
        and value="<%=item._id%>" to find out which item is clicked (checked off) by the user. 
        Then in order to have access to the input action a also add name="checkbox"
        
        Now inside the app.js file under the post root rout
        I add the new /delete rout.
        
        First I hold the id of the checked Item:
            const checkedItemId = req.body.checkbox;
        Then I use the findByIdAndRemove() method with the value of
        checkedItemId.
            Item.findByIdAndRemove(checkedItemId).then(function() { console.log("Successfully Removed the checked Item"); })
            .catch(function(err) {
                console.log(err);
            });

        Then I use the res.redirect("/"); to redirect to the home rout.

............
............

Now I will make changes so every time the user adds
a new item in a specific todo list, this item only added
in the todo list that the user wants.

    In the list.ejs file, at the <button>, I add a value="<%= listTitle %>"
    In the app.js file, at the post rout level I add const listName = req.body.list;
    so I have access to the "name" of the button and the value is going to be the
    current list that the user is trying to add an item to.
    Also in the app.js file, I add the code below:
     if (listName === "today") {
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

Now I want to be sure that when a user checks the checkbox,
the correct item of the correct todo list will be deleted.
    In the list.ejs file at the <form> that make the delete action
    I add a "hidden" input:
    <input type="hidden" name="listName" value="<%=listTitle%>">.

    Next I use the $pull method of the mongoose to search throw the lists
    in order to find the specific list that the item is, which the user wants
    to delete. 



