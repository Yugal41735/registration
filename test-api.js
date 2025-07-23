const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
const API_TOKEN = 'secret_token';

const testAPI = async () => {
  try {
    console.log('🧪 Testing Employee API...\n');

    // Test 1: Get all employees
    console.log('1. Testing GET /api/v1/employee');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee`, {
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
    console.log('2. Testing GET /api/v1/employee/EMP001');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/EMP001`, {
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
      const response = await axios.get(`${API_BASE_URL}/v1/employee/EMP001`);
      console.log('✅ Success:', response.data);
    } catch (error) {
      console.log('❌ Error (Expected):', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 4: Test with invalid token
    console.log('4. Testing with invalid token');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/EMP001`, {
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
      const response = await axios.get(`${API_BASE_URL}/v1/employee?page=2&limit=2`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    // Test 6: Search by city
    console.log('6. Testing GET /api/v1/employee/search?city=Mumbai');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/search?city=Mumbai`, {
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
    console.log('7. Testing GET /api/v1/employee/search?first_name=John&city=Mumbai');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/search?first_name=John&city=Mumbai`, {
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
    console.log('8. Testing GET /api/v1/employee/search?attendance_status=Present');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/search?attendance_status=Present`, {
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

    // Test 9: Generic search - single field
    console.log('9. Testing Generic Search - GET /api/v1/employee/search/generic?q=John');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/search/generic?q=John`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
      console.log('   Generic search found:', response.data.total, 'results');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 10: Partial matching - single character
    console.log('10. Testing Partial Search - GET /api/v1/employee/search/generic?q=J');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/search/generic?q=J`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
      console.log('   Partial search with "J" found:', response.data.total, 'results');
      if (response.data.data && response.data.data.length > 0) {
        console.log('   Sample results:', response.data.data.slice(0, 2));
      }
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 11: Enhanced field search with partial matching
    console.log('11. Testing Enhanced Field Search - GET /api/v1/employee/search?first_name=J');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/search?first_name=J`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
      console.log('   Enhanced field search with partial "J" found:', response.data.total, 'results');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 12: Generic search with city
    console.log('12. Testing Generic Search for City - GET /api/v1/employee/search/generic?q=Mumbai');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/search/generic?q=Mumbai`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success:', response.data);
      console.log('   Generic search for "Mumbai" found:', response.data.total, 'results');
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 13: Get Present employees count
    console.log('13. Testing Attendance Count - Present Employees');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/search?attendance_status=Present&page=1&limit=1`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success - Present Count:', response.data.total);
      console.log('   Total Present employees:', response.data.total);
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 14: Get Absent employees count
    console.log('14. Testing Attendance Count - Absent Employees');
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/employee/search?attendance_status=Absent&page=1&limit=1`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Success - Absent Count:', response.data.total);
      console.log('   Total Absent employees:', response.data.total);
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 15: Get attendance summary (Present + Absent + Total)
    console.log('15. Testing Complete Attendance Summary');
    try {
      const [presentRes, absentRes, totalRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/v1/employee/search?attendance_status=Present&page=1&limit=1`, {
          headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        }),
        axios.get(`${API_BASE_URL}/v1/employee/search?attendance_status=Absent&page=1&limit=1`, {
          headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        }),
        axios.get(`${API_BASE_URL}/v1/employee?page=1&limit=1`, {
          headers: { 'Authorization': `Bearer ${API_TOKEN}` }
        })
      ]);

      const presentCount = presentRes.data.total;
      const absentCount = absentRes.data.total;
      const totalCount = totalRes.data.total;

      console.log('✅ Complete Attendance Summary:');
      console.log('   👥 Total Employees:', totalCount);
      console.log('   ✅ Present Employees:', presentCount, `(${((presentCount/totalCount)*100).toFixed(1)}%)`);
      console.log('   ❌ Absent Employees:', absentCount, `(${((absentCount/totalCount)*100).toFixed(1)}%)`);
      console.log('   🧮 Verification:', presentCount + absentCount === totalCount ? 'PASSED' : 'FAILED');
      
    } catch (error) {
      console.log('❌ Error:', error.response?.data || error.message);
    }
  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };