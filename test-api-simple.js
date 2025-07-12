const axios = require('axios');

const API_BASE_URL = 'http://localhost:3000/api';
const API_TOKEN = 'your-secret-api-token-here';

const testAPIEndpoints = async () => {
  try {
    console.log('🧪 Testing Employee API Endpoints...\n');

    // Test 1: Test authentication middleware - without token
    console.log('1. Testing authentication - No token provided');
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/EMP001`);
      console.log('❌ Should have failed - No token provided');
    } catch (error) {
      if (error.response?.status === 401) {
        console.log('✅ Authentication working correctly - 401 Unauthorized');
        console.log('Response:', error.response.data);
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 2: Test authentication middleware - with invalid token
    console.log('2. Testing authentication - Invalid token');
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/EMP001`, {
        headers: {
          'Authorization': 'Bearer invalid-token'
        }
      });
      console.log('❌ Should have failed - Invalid token');
    } catch (error) {
      if (error.response?.status === 403) {
        console.log('✅ Authentication working correctly - 403 Forbidden');
        console.log('Response:', error.response.data);
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 3: Test with valid token (will fail due to database, but shows auth works)
    console.log('3. Testing with valid token');
    try {
      const response = await axios.get(`${API_BASE_URL}/employees/EMP001`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`
        }
      });
      console.log('✅ Authentication passed, but database error expected');
      console.log('Response:', response.data);
    } catch (error) {
      if (error.response?.status === 500) {
        console.log('✅ Authentication working correctly');
        console.log('❌ Database connection error (expected if MySQL not running)');
        console.log('Error:', error.response.data);
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }

    console.log('\n' + '='.repeat(50) + '\n');

    // Test 4: Test server health
    console.log('4. Testing server health');
    try {
      const response = await axios.get('http://localhost:3000/health');
      console.log('✅ Server is running');
      console.log('Response:', response.data);
    } catch (error) {
      console.log('❌ Server health check failed:', error.message);
    }

  } catch (error) {
    console.error('Test failed:', error.message);
  }
};

// Run tests if this file is executed directly
if (require.main === module) {
  testAPIEndpoints();
}

module.exports = { testAPIEndpoints };