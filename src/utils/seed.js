const { PrismaConfig } = require('../config');

const seedEmployees = async () => {
  const prisma = PrismaConfig.prisma;

  try {
    // Clear existing data
    await prisma.emp_management.deleteMany();

    // Seed sample employees
    const employees = [
      {
        employee_id: 'EMP001',
        first_name: 'John',
        last_name: 'Doe',
        city: 'Mumbai',
        aadhar_link: 'https://aadhar.gov.in/verify/123456789012',
        whatsapp_number: '9876543210',
        attendance_status: 'Present'
      },
      {
        employee_id: 'EMP002',
        first_name: 'Jane',
        last_name: 'Smith',
        city: 'Delhi',
        aadhar_link: 'https://aadhar.gov.in/verify/234567890123',
        whatsapp_number: '8765432109',
        attendance_status: 'Absent'
      },
      {
        employee_id: 'EMP003',
        first_name: 'Mike',
        last_name: 'Johnson',
        city: 'Bangalore',
        aadhar_link: 'https://aadhar.gov.in/verify/345678901234',
        whatsapp_number: '7654321098',
        attendance_status: 'Present'
      },
      {
        employee_id: 'EMP004',
        first_name: 'Sarah',
        last_name: 'Williams',
        city: 'Hyderabad',
        aadhar_link: 'https://aadhar.gov.in/verify/456789012345',
        whatsapp_number: '6543210987',
        attendance_status: 'Absent'
      },
      {
        employee_id: 'EMP005',
        first_name: 'David',
        last_name: 'Brown',
        city: 'Chennai',
        aadhar_link: 'https://aadhar.gov.in/verify/567890123456',
        whatsapp_number: '5432109876',
        attendance_status: 'Present'
      }
    ];

    for (const employee of employees) {
      await prisma.emp_management.create({
        data: employee
      });
    }

    console.log('✅ Database seeded successfully!');
    console.log(`📊 Created ${employees.length} employees`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
};

// Run seeder if this file is executed directly
if (require.main === module) {
  seedEmployees();
}

module.exports = { seedEmployees };