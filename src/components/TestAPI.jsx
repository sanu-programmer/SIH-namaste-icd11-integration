import React from 'react';

const TestAPI = () => {
  const testConnection = async () => {
    try {
      console.log('Testing API connection...');
      
      const response = await fetch('http://localhost:8000/api/v1/namaste/bundles/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        },
        body: JSON.stringify({
          resourceType: 'Bundle',
          type: 'collection',
          entry: []
        })
      });
      
      const data = await response.json();
      console.log('API Response:', data);
      alert('API Test Result: ' + JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('API Test Error:', error);
      alert('API Test Failed: ' + error.message);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">API Test</h3>
      <button 
        onClick={testConnection}
        className="btn-primary"
      >
        Test API Connection
      </button>
    </div>
  );
};

export default TestAPI;