const { PrismaConfig } = require('../config');
const { StatusCodes } = require('http-status-codes');

class EmployeeService {
  constructor() {
    this.prisma = PrismaConfig.prisma;
  }

  async getEmployeeByEmployeeId(employeeId) {
    try {
      const employee = await this.prisma.emp_management.findUnique({
        where: {
          employee_id: employeeId
        }
      });

      if (!employee) {
        throw {
          statusCode: StatusCodes.NOT_FOUND,
          message: 'Employee not found',
          error: 'Employee with the provided employee ID does not exist'
        };
      }

      return {
        success: true,
        data: {
          employee_id: employee.employee_id,
          first_name: employee.first_name,
          last_name: employee.last_name,
          city: employee.city,
          aadhar_link: employee.aadhar_link,
          whatsapp_number: employee.whatsapp_number,
          attendance_status: employee.attendance_status
        }
      };
    } catch (error) {
      if (error.statusCode) {
        throw error;
      }
      throw {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving employee information',
        error: error.message
      };
    }
  }

  async getAllEmployees(page = 1, limit = 10) {
    try {
      const skip = (page - 1) * limit;
      const [employees, total] = await Promise.all([
        this.prisma.emp_management.findMany({
          skip,
          take: limit,
          select: {
            employee_id: true,
            first_name: true,
            last_name: true,
            city: true,
            aadhar_link: true,
            whatsapp_number: true,
            attendance_status: true
          }
        }),
        this.prisma.emp_management.count()
      ]);

      return {
        success: true,
        data: employees,
        count: employees.length,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Error retrieving employees',
        error: error.message
      };
    }
  }

  // New: Generic search by any combination of fields except aadhar_link
  async searchEmployees(query = {}, page = 1, limit = 10) {
    try {
      const { first_name, last_name, city, whatsapp_number, attendance_status } = query;
      const where = {};
      if (first_name) where.first_name = first_name;
      if (last_name) where.last_name = last_name;
      if (city) where.city = city;
      if (whatsapp_number) where.whatsapp_number = whatsapp_number;
      if (attendance_status) where.attendance_status = attendance_status;

      const skip = (page - 1) * limit;
      const [employees, total] = await Promise.all([
        this.prisma.emp_management.findMany({
          where,
          skip,
          take: limit,
          select: {
            employee_id: true,
            first_name: true,
            last_name: true,
            city: true,
            aadhar_link: true,
            whatsapp_number: true,
            attendance_status: true
          }
        }),
        this.prisma.emp_management.count({ where })
      ]);

      return {
        success: true,
        data: employees,
        count: employees.length,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      throw {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Error searching employees',
        error: error.message
      };
    }
  }
}

module.exports = EmployeeService;