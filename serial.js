//serial.js

var sqlite = require("sqlite3");
var db = new sqlite.Database("serial.db");
var async = require("async");

// db.run("CREATE TABLE IF NOT EXISTS test (x, y)",
// 	function() {
// 		db.run("INESRT INTO test VALUES ($x, $y)",{
// 			$x: 1,
// 			$y: 2
// 		}, function(){
// 			db.all("SELECT * FROM test", function(err,
// 			results) {
// 				console.log(results);
// 		});
// 	});
// });