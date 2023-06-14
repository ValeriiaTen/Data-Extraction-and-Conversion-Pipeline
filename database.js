const mysql = require('mysql');

// Configure MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Richi53!',
  database: 'mydatabase'
});

// Connect to the MySQL database
connection.connect(error => {
  if (error) {
    console.error('Error connecting to the database:', error);
  } else {
    console.log('Connected to the database.');
  }
});

// Save IT employees to MySQL database
function saveEmployees(employees) {
  return new Promise((resolve, reject) => {
    const insertQuery = 'INSERT INTO employees (name, department) VALUES ?';
    const values = employees.map(employee => [employee.name, employee.department]);

    // Check if employees already exist in the database
    const selectQuery = 'SELECT name, department FROM employees WHERE name = ? AND department = ?';
    const existingEmployees = [];

    // Helper function to execute the select query for each employee
    const checkExistingEmployee = (index) => {
      if (index >= values.length) {
        // All employees have been checked, proceed with insertion
        // Filter out existing employees from the values to be inserted
        const newValues = values.filter(
          value => !existingEmployees.some(
            existing => existing.name === value[0] && existing.department === value[1]
          )
        );

        // Insert new employees only
        if (newValues.length === 0) {
          console.log('No new employees to insert.');
          resolve();
        } else {
          connection.query(insertQuery, [newValues], (error, results, fields) => {
            if (error) {
              reject(`Error inserting new employees into the database: ${error}`);
              return;
            }
            console.log('Inserted employees:', newValues.map(value => value[0]).join(', '));
            resolve();
          });
        }
        return;
      }

      const employee = values[index];
      connection.query(selectQuery, employee, (error, results, fields) => {
        if (error) {
          reject(`Error fetching existing employees from the database: ${error}`);
          return;
        }

        if (results && results.length > 0) {
          existingEmployees.push(...results);
        }

        checkExistingEmployee(index + 1);
      });
    };

    checkExistingEmployee(0);
  });
}
 


// Fetch IT employees from the database
function getEmployees() {
  return new Promise((resolve, reject) => {
    const selectQuery = 'SELECT name, department FROM employees WHERE department = "IT"';
    connection.query(selectQuery, (error, results, fields) => {
      if (error) reject(error);
      resolve(results);
    });
  });
}

module.exports = { saveEmployees, getEmployees };



