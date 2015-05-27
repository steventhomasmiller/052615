var sqlite = require ("sqlite3");

var db = new sqlite.Database("test.db" , function() {
	db.run("CREATE TABLE IF NOT EXISTS users (name, age)");

	db.run("INSERT INTO users VALUES ('Steve', 27)");

	db.get("SELECT * FROM users", function(err, result) {
		console.log(result);
	});

	db.all("SELECT * FROM users", function(err, results) {
		console.log(results);
	});


});



