var mongoose 	= require("mongoose")
	Campground  = require("./models/campground")
var Comment     = require("./models/comment");

var data = [
		{
			name: "Malderen",
			image: "https://images.unsplash.com/photo-1532511064565-b7df5ca32985?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ef4159b4a60997737c8d0ae39b90b48b&auto=format&fit=crop&w=1050&q=80",
			description: "Lekker chill!"
		},
		{
			name: "Steenhuffel",
		 	image:"https://images.unsplash.com/photo-1528835333825-7dc1cee67e63?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=944a66e3473db6d1fda34029b072fc19&auto=format&fit=crop&w=1049&q=80",
		 	description: "Waw! Geweldig!"
		},
		{
			name: "Sint-Jozef",
			image:"https://images.unsplash.com/photo-1529385101576-4e03aae38ffc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2295b89ce9c2701955175f7fc40d94d1&auto=format&fit=crop&w=1050&q=80",
			description: "nom nom nom!"
		},
		{
			name: "Londerzeel",
			image:"https://images.unsplash.com/photo-1527786356703-4b100091cd2c?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=601fcba3c5d7ddec0c8f2690e8638461&auto=format&fit=crop&w=500&q=60",
			description: "gezellig zeg!"
		}
]

function seedDB(){
	//remove all campgrounds
	Campground.remove({}, function(err){
		if (err){
			console.log("error");
		}
			else
			{
				console.log("Campgrounds removed!");
					//add campgrounds
					for (i in data){
						Campground.create(data[i], function(err, campground){
								if (err){
									console.log(err);
								}
								else {
									console.log(campground);
			                        //create a comment
			                        Comment.create(
			                            {
			                                text: "This place is great, but I wish there was internet",
			                                author: "Homer"
			                            }, function(err, comment){
			                                if(err){
			                                    console.log(err);
			                                } else {
			                                    campground.comments.push(comment);
			                                    campground.save();
			                                     console.log("Created new comment");
			                                }
			                            });
								}
							})
					};
			}
	});
}

module.exports = seedDB;