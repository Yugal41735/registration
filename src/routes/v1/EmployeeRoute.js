const express = require('express');
const { authenticateToken } = require('../../middlewares/auth.middleware');
const EmployeeController = require('../../controller/employee.controller');

const router = express.Router();
const employeeController = new EmployeeController();

// Apply authentication middleware to all employee routes
router.use(authenticateToken);

// Generic search across all fields (new route)
router.get('/search/generic', employeeController.genericSearch.bind(employeeController));

// Specific field search for employees (by any field except aadhar_link)
router.get('/search', employeeController.searchEmployees.bind(employeeController));

// Get employee by employee ID
router.get('/:employeeId', employeeController.getEmployeeByEmployeeId.bind(employeeController));

// Get all employees (optional endpoint)
router.get('/', employeeController.getAllEmployees.bind(employeeController));

module.exports = router;