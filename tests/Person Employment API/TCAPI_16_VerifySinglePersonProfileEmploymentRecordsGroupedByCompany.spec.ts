import { test, expect } from '@playwright/test';

  const API_URL = 'https://thrive.thrive-qa.com/api/v1/people/64ee87cb-ee2e-4d9a-a4ef-6ddb4d6eb946/employments/grouped_by_company';

  test('Verify employment records grouped by company', async ({ request }) => {

    // Send GET request to the API
    const response = await request.get(API_URL);

    // Assertion 1: Verify the response status is 200
    expect(response.status()).toBe(200);

    // Parse the response JSON
    const responseData = await response.json();

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