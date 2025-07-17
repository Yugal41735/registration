const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
const API_TOKEN = 'secret_token';

const testAPI = async () => {
  try {
    console.log('🧪 Testing Employee API...\n');

    // Test 1: Get all employees
    console.log('1. Testing GET /api/v1/employees');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 2: Get specific employee
    console.log('2. Testing GET /api/v1/employees/EMP001');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees/EMP001`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 3: Test without token
    console.log('3. Testing without authorization token');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees/EMP001`);
      console.log('✅ Success:', response.data);
    } catch (error) {
      console.log('❌ Error (Expected):', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 4: Test with invalid token
    console.log('4. Testing with invalid token');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees/EMP001`, {
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      });
      console.log('✅ Success:', response.data);
    } catch (error) {
      console.log('❌ Error (Expected):', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');
 
     // Test 5: Pagination support
     console.log('5. Testing GET /api/v1/employees?page=2&limit=2');
     try {
       const response = await axios.get(`${API_BASE_URL}/v1/employees?page=2&limit=2`, {
         headers: {
           'Authorization': `Bearer ${API_TOKEN}`
         }
       });
       console.log('✅ Success:', response.data);
     } catch (error) {
       console.log('❌ Error:', error.response?.data || error.message);
     }

    // Test 6: Search by city
    console.log('6. Testing GET /api/v1/employees/search?city=Mumbai');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees/search?city=Mumbai`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
      if (response.data.data && response.data.data.length > 0) {
        const hasCity = response.data.data.every(emp => emp.city === 'Mumbai');
        console.log('   City field present and correct:', hasCity);
      }
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 7: Search by first_name and city
    console.log('7. Testing GET /api/v1/employees/search?first_name=John&city=Mumbai');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees/search?first_name=John&city=Mumbai`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
      if (response.data.data && response.data.data.length > 0) {
        const allMatch = response.data.data.every(emp => emp.first_name === 'John' && emp.city === 'Mumbai');
        console.log('   All results match first_name and city:', allMatch);
      }
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 8: Search by attendance_status
    console.log('8. Testing GET /api/v1/employees/search?attendance_status=Present');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employees/search?attendance_status=Present`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
      if (response.data.data && response.data.data.length > 0) {
        const allPresent = response.data.data.every(emp => emp.attendance_status === 'Present');
        console.log('   All results have attendance_status Present:', allPresent);
      }
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');
  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };