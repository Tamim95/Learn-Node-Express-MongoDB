//we will use external package
//search in npmjs.com "random-fruits-name"
//we have to initialize npm in directory
// type in terminal -> npm init

// const randomFruitsName=require("random-fruits-name");
// console.log(randomFruitsName('de'));

var moviesName=require("movies-names");
console.log(moviesName.random());
// moviesNames.all # returns all movies
// moviesNames.random() # returns a random movie name
// moviesName.random(2) # returns specified number of random movies
// moviesNames.getmovieName('The Dark Knight') # returns specified movie 