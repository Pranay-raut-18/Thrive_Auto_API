import { test, expect, request } from '@playwright/test';
  
  test('Verify Login API with valid inputs and response assertions', async ({ request }) => {
    // Define the login API endpoint
    const loginApiEndpoint = 'https://thrive.thrive-dev.com/api/v1/login';
    
    // Define the request body for the login
    const requestBody = {
      user: {
        username: "qatesting+charly@thrivetrm.com",
        password: "Changeme1$"
      }
    };

    // Send a POST request to the login API endpoint
    const response = await request.post(loginApiEndpoint, {
      data: requestBody,
    });

    console.log(response);

    // Assertions for the response status code
    expect(response.status()).toBe(200);

    // Parse the response body to JSON
    const responseBody = await response.json();

    // Assertions for required properties in the response
    expect(responseBody).toHaveProperty('id');
    expect(responseBody).toHaveProperty('createdAt');
    expect(responseBody).toHaveProperty('updatedAt');
    expect(responseBody).toHaveProperty('username');
    expect(responseBody).toHaveProperty('profile');
    expect(responseBody.profile).toHaveProperty('id');
    expect(responseBody.profile).toHaveProperty('firstName');
    expect(responseBody.profile).toHaveProperty('lastName');
    expect(responseBody.profile).toHaveProperty('email');
    expect(responseBody).toHaveProperty('customer');
    expect(responseBody.customer).toHaveProperty('id');
    expect(responseBody.customer).toHaveProperty('name');
  });
