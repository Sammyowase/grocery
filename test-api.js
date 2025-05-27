// Simple test script to verify API endpoints structure
const axios = require('axios');

const BASE_URL = 'http://localhost:3000';

async function testAPI() {
  console.log('🧪 Testing Grocery Delivery API...\n');

  try {
    // Test 1: Register a new user
    console.log('1. Testing user registration...');
    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      email: 'test@example.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User'
    });
    console.log('✅ Registration successful');
    console.log('Token:', registerResponse.data.accessToken.substring(0, 20) + '...');
    
    const token = registerResponse.data.accessToken;

    // Test 2: Login
    console.log('\n2. Testing user login...');
    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: 'test@example.com',
      password: 'password123'
    });
    console.log('✅ Login successful');

    // Test 3: Add grocery item
    console.log('\n3. Testing add grocery item...');
    const groceryResponse = await axios.post(`${BASE_URL}/grocery`, {
      name: 'Organic Bananas',
      description: 'Fresh organic bananas',
      price: 2.99,
      quantity: 5,
      category: 'Fruits'
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Grocery item added successfully');
    console.log('Item ID:', groceryResponse.data.id);
    
    const itemId = groceryResponse.data.id;

    // Test 4: Get all grocery items
    console.log('\n4. Testing get all grocery items...');
    const allItemsResponse = await axios.get(`${BASE_URL}/grocery`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Retrieved all grocery items');
    console.log('Total items:', allItemsResponse.data.length);

    // Test 5: Get specific grocery item
    console.log('\n5. Testing get specific grocery item...');
    const specificItemResponse = await axios.get(`${BASE_URL}/grocery/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Retrieved specific grocery item');

    // Test 6: Update grocery item
    console.log('\n6. Testing update grocery item...');
    const updateResponse = await axios.patch(`${BASE_URL}/grocery/${itemId}`, {
      name: 'Updated Organic Bananas',
      price: 3.99
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Grocery item updated successfully');

    // Test 7: Delete grocery item
    console.log('\n7. Testing delete grocery item...');
    await axios.delete(`${BASE_URL}/grocery/${itemId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    console.log('✅ Grocery item deleted successfully');

    console.log('\n🎉 All API tests passed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Only run if MongoDB is available
if (process.argv.includes('--run')) {
  testAPI();
} else {
  console.log('API test script created. Run with --run flag when MongoDB is available.');
}
