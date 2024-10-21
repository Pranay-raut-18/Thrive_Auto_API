import { test, expect, request } from '@playwright/test';

test('Create Person Profile and verify response assertions', async ({ request }) => {
  // Define the API endpoint for creating a person profile
  const createProfileApiEndpoint = 'https://thrive.thrive-dev.com/api/v1/people';

  // Define the request body for the person profile
  const requestBody = {
    personProfile: {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumbers: [
        {
          phoneNumber: '1234567890',
          preferred: true
        }
      ],
      emails: [
        {
          email: 'john.doe@example.com',
          preferred: true,
          emailType: 'work'
        }
      ]
    }
  };

  // Send a POST request to the create profile API endpoint
  const response = await request.post(createProfileApiEndpoint, {
    data: requestBody,
  });

  // Assert response status
  expect(response.status()).toBe(201);

  // Parse response JSON
  const responseBody = await response.json();

  // Assert response has id property
  expect(responseBody).toHaveProperty('id');

  // Assert response has createdAt property
  expect(responseBody).toHaveProperty('createdAt');

  // Assert response has updatedAt property
  expect(responseBody).toHaveProperty('updatedAt');

  // Assert response has firstName property
  expect(responseBody).toHaveProperty('firstName');

  // Assert response has lastName property
  expect(responseBody).toHaveProperty('lastName');

  // Assert response has emails property
  expect(responseBody).toHaveProperty('emails');
  expect(responseBody.emails.length).toBeGreaterThan(0);

  // Assert response has phoneNumbers property
  expect(responseBody).toHaveProperty('phoneNumbers');
  expect(responseBody.phoneNumbers.length).toBeGreaterThan(0);

  // Assert response has people property
  expect(responseBody).toHaveProperty('people');

  // Set environment variables from the response (similar to Postman)
  process.env.ID = responseBody.id;
  process.env.EMAILS_ID = responseBody.emails[0].id;
  process.env.PHONE_NUMBERS_ID = responseBody.phoneNumbers[0].id;
});
