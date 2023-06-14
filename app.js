const axios = require('axios');
const { saveEmployees, getEmployees } = require('./database');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// Fetch data from the API
axios.get('http://localhost:3000/employees')
  .then(response => {
    const employees = response.data;

    // Filter employees in the IT department
    const filteredEmployees = employees.filter(employee => employee.department === 'IT');

    // Save IT employees to the database
    saveEmployees(filteredEmployees)
      .then(() => {
        console.log('Data saved to the database.');

        // Fetch IT employees from the database
        getEmployees()
          .then(savedEmployees => {
            // Create a CSV file
            const csvWriter = createCsvWriter({
              path: 'filtered_employees.csv',
              header: [
                { id: 'name', title: 'Name' },
                { id: 'department', title: 'Department' },
              ],
            });

            csvWriter
              .writeRecords(savedEmployees)
              .then(() => {
                console.log('CSV file created with filtered employees data.');
              });
          })
          .catch(error => {
            console.error('Error fetching data from the database:', error);
          });
      })
      .catch(error => {
        console.error('Error saving data to the database:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
