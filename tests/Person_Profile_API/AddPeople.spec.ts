import { test, expect } from "@playwright/test";

test("should create a new person", async ({ request }) => {
  // Step 1: Login to obtain the authentication token
  const loginUrl = "https://thrive.thrive-qa.com/api/v1/login";
  const loginResponse = await request.post(loginUrl, {
    data: {
      user: {
        username: "qatesting+charly@thrivetrm.com",
        password: "Changeme1$",
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  expect(loginResponse.status()).toBe(200); // Ensure the login was successful

  const loginResponseBody = await loginResponse.json();
  const authToken = loginResponseBody.token; // Assuming the token is returned in the login response

  // Step 2: Use the token to create a new person
  const createPersonUrl = "https://thrive.thrive-qa.com/api/v1/people";

  // Define the request body
  const requestBody = {
    person: {
      firstName: "testdata18",
      lastName: "testdata18",
      educations: [],
      emails: [
        {
          email: "testdatal122@gmail.com",
          primary: true,
          type: null,
        },
      ],
      employments: [],
      linkedinUrl: "",
      names: [
        {
          firstName: "testdata3",
          lastName: "testdatal3",
          primary: true,
          type: null,
        },
      ],
      phoneNumbers: [
        {
          phoneNumber: "049573948",
          primary: true,
          type: null,
        },
      ],
      socialUrls: [
        {
          url: "",
          type: null,
        },
      ],
    },
  };

  // Send a POST request to the create person endpoint with the authentication token
  const response = await request.post(createPersonUrl, {
    data: requestBody,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`, // Add the token to the headers
    },
  });

  // Log the response status and body for debugging
  console.log(`Response status: ${response.status()}`);
  console.log(`Response body: ${await response.text()}`);

  // Check the response status
  expect(response.status()).toBe(201); // Assuming the API returns 201 Created for successful creation

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
  // expect(responseBody).toHaveProperty('people');

  // Set environment variables from the response (similar to Postman)
  process.env.ID = responseBody.id;
  process.env.EMAILS_ID = responseBody.emails[0].id;
  process.env.PHONE_NUMBERS_ID = responseBody.phoneNumbers[0].id;
  
});
