import { test, expect, request } from '@playwright/test';

  test('TCAPI_02:- Verifying the Login API with Invalid inputs and checking response Code', async ({ request }) => {
    // Define the login API endpoint
    const loginApiEndpoint = 'https://thrive.thrive-dev.com/api/v1/login';
   
    // Define the request body for the login
    const requestBody = {
      user: {
        username: "support@thrivetrm.com",
        password: "Changesame1$1"
      }
    };
 
    // Send a POST request to the login API endpoint
    const response = await request.post(loginApiEndpoint, {
      data: requestBody,
    });
 
    // Assertions for the response status code
    expect(response.status()).toBe(401);
    
  });
 
