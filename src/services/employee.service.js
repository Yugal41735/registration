const { PrismaConfig } = require('../config');
const { StatusCodes } = require('http-status-codes');

class EmployeeService {
  constructor() {
    this.prisma = PrismaConfig.prisma;
  }

  async getEmployeeByEmployeeId(employeeId) {
    try {
      const employee = await this.prisma.employees.findUnique({
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
        this.prisma.employees.findMany({
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
        this.prisma.employees.count()
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

  // New: Generic search across all fields with partial matching
  async genericSearch(searchTerm, page = 1, limit = 10) {
    try {
      if (!searchTerm || searchTerm.trim() === '') {
        // If no search term, return all employees with pagination
        return await this.getAllEmployees(page, limit);
      }

      const searchPattern = `%${searchTerm.trim()}%`;
      
      const where = {
        OR: [
          { first_name: { contains: searchTerm.trim(), mode: 'insensitive' } },
          { last_name: { contains: searchTerm.trim(), mode: 'insensitive' } },
          { city: { contains: searchTerm.trim(), mode: 'insensitive' } },
          { whatsapp_number: { contains: searchTerm.trim() } },
          { employee_id: { contains: searchTerm.trim(), mode: 'insensitive' } },
          { attendance_status: { equals: searchTerm.trim() } }
        ]
      };

      const skip = (page - 1) * limit;
      const [employees, total] = await Promise.all([
        this.prisma.employees.findMany({
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
        this.prisma.employees.count({ where })
      ]);

      return {
        success: true,
        data: employees,
        count: employees.length,
        total,
        page,
        totalPages: Math.ceil(total / limit),
        searchTerm: searchTerm.trim()
      };
    } catch (error) {
      throw {
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Error performing generic search',
        error: error.message
      };
    }
  }

  // Updated: Enhanced search with partial matching support
  async searchEmployees(query = {}, page = 1, limit = 10) {
    try {
      const { first_name, last_name, city, whatsapp_number, attendance_status } = query;
      const where = {};
      
      // Enhanced search with partial matching (case-insensitive)
      if (first_name) {
        where.first_name = { 
          contains: first_name.trim(), 
          mode: 'insensitive' 
        };
      }
      if (last_name) {
        where.last_name = { 
          contains: last_name.trim(), 
          mode: 'insensitive' 
        };
      }
      if (city) {
        where.city = { 
          contains: city.trim(), 
          mode: 'insensitive' 
        };
      }
      if (whatsapp_number) {
        where.whatsapp_number = { 
          contains: whatsapp_number.trim() 
        };
      }
      if (attendance_status) {
        where.attendance_status = attendance_status;
      }

      const skip = (page - 1) * limit;
      const [employees, total] = await Promise.all([
        this.prisma.employees.findMany({
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
        this.prisma.employees.count({ where })
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