const moment = require("moment");
const knex_configs = require("./knexfile").development;

const pg = require("knex")({
  client: 'pg',
  connection: knex_configs.connection,
  debug: false
});

const userInputs = process.argv.slice(2);
const firstname = userInputs[0];
const lastname = userInputs[1];
const birthdate = userInputs[2];

const insertData = {
  first_name: firstname,
  last_name:  lastname,
  birthdate:  birthdate
}

// Take these actions if the input is valid and an error isn't hit
const resultHandler = function(result) {
  console.log("Working...")
  printAction();
  pg.destroy();
}

// Create output string
const printAction = function(result) {
  console.log(`Added ${firstname} ${lastname} to database:`);
}

  if (userInputs.length === 3) {
  // Insert user's input to database via knex's postgres handler
    pg('famous_people')
      .insert(insertData)
      .then(resultHandler)
      .catch(function(error) {
       console.error(error)
    });
  } else {
  // If not all or too many arguments provided by user
  console.log("Please provide first & last name, and birthdate\n", "e.g. node add_person Abraham Lincoln 1809-02-12")
  pg.destroy();
}
