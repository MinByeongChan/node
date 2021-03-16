// module.exports = function (app, fs) {
//   app.get("/", function (req, res) {
//     var sess = req.session;

//     res.render("index", {
//       title: "MY HOMEPAGE",
//       length: 5,
//       name: sess.name,
//       username: sess.username,
//     });
//   });

//   app.get("/list", (req, res) => {
//     fs.readFile(__dirname + "/../data/" + "user.json", "utf8", (err, data) => {
//       console.log(data);
//       res.end(data);
//     });
//   });

//   app.get("/getUser/:username", (req, res) => {
//     fs.readFile(__dirname + "/../data/user.json", "utf8", (err, data) => {
//       var users = JSON.parse(data);
//       // console.log(req.params.username);
//       res.json(users[req.params.username]);
//     });
//   });

//   app.post("/addUser/:username", (req, res) => {
//     var result = {};
//     var username = req.params.username;

//     if (!req.body["password"] || !req.body["name"]) {
//       result["success"] = 0;
//       result["error"] = "invalid request";
//       res.json(result);
//       return;
//     }

//     fs.readFile(__dirname + "/../data/user.json", "utf8", (err, data) => {
//       var users = JSON.parse(data);
//       if (users[username]) {
//         result["success"] = 0;
//         result["error"] = "duplicate";
//         res.json(result);
//         return;
//       }

//       users[username] = req.body;

//       fs.writeFile(
//         __dirname + "/../data/user.json",
//         JSON.stringify(users, null, "\t"),
//         "utf8",
//         (err, data) => {
//           result = { success: 1 };
//           res.json(result);
//         }
//       );
//     });
//   });

//   app.delete("/deleteUser/:username", (req, res) => {
//     var result = {};

//     fs.readFile(__dirname + "/../data/user.json", "utf8", (err, data) => {
//       var users = JSON.parse(data);

//       console.log(users);

//       if (!users[req.params.username]) {
//         result["success"] = 0;
//         result["error"] = "not found";
//         res.json(result);
//         return;
//       }

//       delete users[req.params.username];
//       fs.writeFile(
//         __dirname + "/../data/user.json",
//         JSON.stringify(users, null, "\t"),
//         "utf8",
//         (err, data) => {
//           result["success"] = 1;
//           res.json(result);
//           return;
//         }
//       );
//     });
//   });

//   app.get("/login/:username/:password", (req, res) => {
//     var sess;
//     sess = req.session;

//     fs.readFile(__dirname + "/../data/user.json", "utf8", (err, data) => {
//       var users = JSON.parse(data);
//       var username = req.params.username;
//       var password = req.params.password;
//       var result = {};

//       if (!users[username]) {
//         result["success"] = 0;
//         result["error"] = "not found";
//         res.json(result);
//         return;
//       }

//       if (users[username]["password"] == password) {
//         result["success"] = 1;
//         sess.username = username;
//         sess.name = users[username]["name"];

//         console.log(sess);
//         res.json(result);
//       } else {
//         result["success"] = 0;
//         result["error"] = "incorrect";
//         res.json(result);
//       }
//     });
//   });

//   app.get("/logout", (req, res) => {
//     var sess = req.session;

//     if (sess.username) {
//       req.session.destroy((err) => {
//         if (err) console.log(err);
//         else res.redirect("/");
//       });
//     }
//   });
// };
