import { test, expect, request } from '@playwright/test';
  
  test('TCAPI_16: Verify Single Person Profile Employment Records Grouped by Company', async ({ request }) => {
    // Define the login API endpoints
    const loginApiEndpoint = 'https://thrive.thrive-dev.com/api/v1/login';
    const profileApiEndpoint = 'https://thrive.thrive-qa.com/api/v1/people/64ee87cb-ee2e-4d9a-a4ef-6ddb4d6eb946/employments/grouped_by_company';
    
    // Define the request body for the login
    const requestBody = {
      user: {
        username: "qatesting+charly@thrivetrm.com",
        password: "Changeme1$"
      }
    };

    // Send a POST request to the login API endpoint
    await request.post(loginApiEndpoint, {
      data: requestBody,
    });

    //Send a GET request to the profileApi endpoint
    const response= await request.get(profileApiEndpoint);
           console.log(response);
    // Assertion 1: Verify the response status is 200
    expect(response.status()).toBe(200);

    // Parse the response JSON
    const responseData = await response.json();
    console.log(responseData);

    // Assertion 2: Verify response is an array
    expect(Array.isArray(responseData)).toBeTruthy();

    // Assertion 3: Verify each object has 'company' and 'employments' properties
    responseData.forEach((item: any) => {
      expect(item).toHaveProperty('company');
      expect(item).toHaveProperty('employments');
    });

    // Assertion 4: Verify 'company' object has 'id', 'name', and 'tenureInMonths' properties
    responseData.forEach((item: any) => {
      const company = item.company;
      expect(company).toHaveProperty('id');
      expect(company).toHaveProperty('name');
      expect(company).toHaveProperty('tenureInMonths');
    });

    // Assertion 5: Verify 'employments' array has specific properties for each employment record
    responseData.forEach((item: any) => {
      item.employments.forEach((employment: any) => {
        expect(employment).toHaveProperty('id');
        expect(employment).toHaveProperty('createdAt');
        expect(employment).toHaveProperty('updatedAt');
        expect(employment).toHaveProperty('personProfileId');
        expect(employment).toHaveProperty('description');
        expect(employment).toHaveProperty('primary');
        expect(employment).toHaveProperty('startDate');
        expect(employment).toHaveProperty('endDate');
        expect(employment).toHaveProperty('tenureInMonths');
        expect(employment).toHaveProperty('title');
      });
    });
  });
