var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootroot",
    database: "employeeTracker"
});

con.connect(function(err){
    if (err) throw err;
    console.log("Looks good and connected!")
})