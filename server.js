const express = require('express');

const app = express();
const port = 3000;

const employees = [
  { name: 'John Doe', department: 'IT', position: 'Software Engineer' },
  { name: 'Jane Smith', department: 'IT', position: 'Network Administrator' },
  { name: 'David Johnson', department: 'IT', position: 'IT Manager' },
  { name: 'Sarah Williams', department: 'IT', position: 'Database Administrator' },
  { name: 'Michael Brown', department: 'IT', position: 'IT Support Specialist' },
  { name: 'Emily Davis', department: 'Marketing', position: 'Marketing Manager' },
  { name: 'Matthew Wilson', department: 'Finance', position: 'Financial Analyst' },
  { name: 'Olivia Taylor', department: 'Sales', position: 'Sales Representative' },
  { name: 'James Anderson', department: 'Operations', position: 'Operations Manager' },
  { name: 'Sophia Martinez', department: 'Customer Support', position: 'Customer Support Specialist' }
];

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
