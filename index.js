var express 	= require("express"),
	app 		= express(),
	bodyParser 	= require("body-parser"),
	mongoose 	= require("mongoose")
	Campground  = require("./models/campground")
	seedDB		= require("./seeds")



mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set ("view engine", "ejs");

seedDB();

// Campground.create(
// 	{name: "Lobster Creek",
// 	 image: "http://i.imgur.com/qK42fUu.jpg",
// 	 description: "Beautiful Campground, although a bit crowded in the spring."
// 	}, function(err, campground){
// 		if(err){
// 			console.log(err);
// 		} else {
// 			console.log("New Campground: ");
// 			console.log(campground);
// 		}
// 	}
// )


app.get("/", function(req,res){
	res.render("landing");
});


// INDEX -- show all campgrounds
app.get("/campgrounds", function(req, res){

Campground.find({}, function(err, campgrounds){
		if (err){
			console.log(err);
		} else {
			res.render("index",{campgrounds:campgrounds});
		}
	});
});

//CREATE -- add new campground to database
app.post("/campgrounds", function(req,res){
	//get data from form and add to data array
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image: image, description: desc};
	Campground.create(newCampground, function(err,newCamp){
		if (err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});


//NEW -- show form to create a new campground
app.get("/campgrounds/new", function(req,res){
	res.render("new");
});

//SHOW -- shows more info about one campground
app.get("/campgrounds/:id", function(req,res){
// find the campground with provided ID
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		} else {
			// render show template with that campground
			console.log(foundCampground);
			console.log(foundCampground.comments[0].text);
			res.render("show", {campground: foundCampground});
		}
	})
});


app.listen(3000, process.env.IP, function(){
	console.log("YelpCamp server is running...");
});