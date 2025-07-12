#!/bin/bash

# Employee API Test Script
# Make sure your server is running: npm run dev

API_TOKEN="your-secret-api-token-here"
BASE_URL="http://localhost:3000"

echo "🚀 Employee API Test Script"
echo "=========================="
echo ""

# Function to make API calls with formatted output
test_api() {
    local method=$1
    local endpoint=$2
    local description=$3
    
    echo "📡 Testing: $description"
    echo "📍 Endpoint: $method $endpoint"
    echo "🔑 Token: $API_TOKEN"
    echo ""
    
    response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
        -H "Authorization: Bearer $API_TOKEN" \
        -H "Content-Type: application/json" \
        "$BASE_URL$endpoint")
    
    # Extract HTTP status and response body
    http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
    response_body=$(echo "$response" | sed '/HTTP_STATUS:/d')
    
    echo "📊 HTTP Status: $http_status"
    echo "📄 Response:"
    echo "$response_body" | jq '.' 2>/dev/null || echo "$response_body"
    echo ""
    echo "----------------------------------------"
    echo ""
}

# Test 1: Get all employees
test_api "GET" "/api/employees" "Get All Employees"

# Test 2: Get specific employee
test_api "GET" "/api/employees/EMP001" "Get Employee by ID (EMP001)"

# Test 3: Get non-existent employee
test_api "GET" "/api/employees/EMP999" "Get Employee by ID (Non-existent)"

# Test 4: Test without authorization
echo "📡 Testing: Get All Employees (No Authorization)"
echo "📍 Endpoint: GET /api/employees"
echo "🔑 Token: None"
echo ""

response=$(curl -s -w "\nHTTP_STATUS:%{http_code}" \
    -H "Content-Type: application/json" \
    "$BASE_URL/api/employees")

http_status=$(echo "$response" | grep "HTTP_STATUS:" | cut -d: -f2)
response_body=$(echo "$response" | sed '/HTTP_STATUS:/d')

echo "📊 HTTP Status: $http_status"
echo "📄 Response:"
echo "$response_body" | jq '.' 2>/dev/null || echo "$response_body"
echo ""
echo "----------------------------------------"
echo ""

echo "✅ API Testing Complete!"