//server.js

var users = {
	steve: "12345",
	admin: "admin"
};

var sqlite = require("sqlite3");
var hapi = require("hapi");

var server = new hapi.Server();
server.connection({ port: 8000 });

var db = new sqlite.Database("auth.db", function() {
	//table has two columns - USERNAME & SESSION
	db.run("CREATE TABLE IF NOT EXISTS auth (username, session)",
		function() {
			console.log("Starting server.");
			server.start();
		});
});

server.route({
	method: "GET",
	path: "/",
	handler: function(req, reply) {
		console.log(req.state);
		if(!req.state.user) {
			return reply.redirect("/login");
		}
		db.get("SELECT * FROM auth WHERE username = $user", {
			$user: req.state.user
		}, function(err, result){
			if (!result) {
				return reply.redirect("/login");
			}
			if (result.session != req.state.session) {
				return reply.redirect("/login");
			}
			reply("This is a mystery.");
		});
	}
});

server.route({
	method: "GET",
	path: "/login",
	handler: function(req, reply){
		reply(
			"<form method=POST>" +
			"<input name=user placeholder=user>" +
			"<input name=password placeholder=password>" +
			"<input type=submit>" +
			"</form>"
		);
	}
});

server.route({
	path: "/login",
	method: "POST",
	handler: function(req, reply){
		var expected = users[req.payload.user];
		if (req.payload.password == expected) {
			var response = reply("Worked.");
			var id = Date.now();
			response.state("user", req.payload.user);
			response.state("session", id + "");

			db.run("DELETE FROM auth WHERE username = $user", {
				$user: req.payload.user
			}, function(){
				db.run("INSERT INTO auth VALUES($user, $session)", {
					$user: req.payload.user,
					$session: id
				});
			});
		} else {
		reply.redirect("/login");

		}
	}
});





















