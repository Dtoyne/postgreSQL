const pg = require("pg");
const settings = require("./settings");

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  var id = "10";

  client.query("SELECT * FROM famous_people;", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    result.rows.forEach(function(person) {

      console.log(person.first_name, person.last_name); //output: 1
    })
    client.end();
  });

});
