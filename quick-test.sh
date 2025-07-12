#!/bin/bash

# Quick API Test with jq formatting
API_TOKEN="your-secret-api-token-here"

echo "🔍 Quick API Tests"
echo "=================="

echo ""
echo "📋 1. Get All Employees:"
curl -s -H "Authorization: Bearer $API_TOKEN" \
     http://localhost:3000/api/employees | jq '.'

echo ""
echo "📋 2. Get Employee EMP001:"
curl -s -H "Authorization: Bearer $API_TOKEN" \
     http://localhost:3000/api/employees/EMP001 | jq '.'

echo ""
echo "📋 3. Test Error (Non-existent employee):"
curl -s -H "Authorization: Bearer $API_TOKEN" \
     http://localhost:3000/api/employees/EMP999 | jq '.'