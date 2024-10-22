import { test, expect } from "@playwright/test";

test.skip("should delete an existing person", async ({ request }) => {
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

  // Step 2: Delete the person using the ID from the previous response
  const personId = process.env.ID; // Assume the ID was set in the previous test
  const deletePersonUrl = `https://thrive.thrive-qa.com/api/v1/people/e9f9a7f2-372e-4a4b-a7fe-2abd2518284d`;

  // Send a DELETE request to the delete person endpoint with the authentication token
  const deleteResponse = await request.delete(deletePersonUrl, {
    headers: {
      "Authorization": `Bearer ${authToken}`, // Add the token to the headers
    },
  });

  // Log the response status and body for debugging
  console.log(`Response status: ${deleteResponse.status()}`);
  console.log(`Response body: ${await deleteResponse.text()}`);

  // Check the response status
  expect(deleteResponse.status()).toBe(204); // Assuming the API returns 200 OK for successful deletion

  // Optionally, parse the response body if needed
  const responseBody = await deleteResponse.json();

  // Validate the response for deletion confirmation if applicable
  expect(responseBody).toHaveProperty('message');
  expect(responseBody.message).toContain('successfully deleted'); // Assuming a success message is returned
});
