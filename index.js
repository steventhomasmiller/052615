var sqlite = require ("sqlite3");

var db = new sqlite.Database("test.db" , function() {
	db.run("CREATE TABLE IF NOT EXISTS users (name, age)" , function() {

		db.run("INSERT INTO users VALUES ('Steve', 27)");

		db.get("SELECT * FROM users", function(err, result) {
			console.log(result);
		});

		var query = "INSERT INTO users VALUES ($name, $age);";
		db.run(query, {
			$name: "Alice",
			$age: 42
		});

		var statement = db.prepare(query);
		statement.run({
			$name: "Bob",
			$age: 20
		});

		db.all("SELECT * FROM users", function(err, results) {
			console.log(results);
		});
	});
});



