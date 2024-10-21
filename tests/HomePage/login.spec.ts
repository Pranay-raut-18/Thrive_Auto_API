import { test, expect } from "@playwright/test";

test("Should Log In Successfully", async ({ request }) => {
  const loginUrl = "https://thrive.thrive-dev.com/api/v1/login";
  const email = "qatesting+charly@thrivetrm.com";
  const password = "Changeme1$";

  // Define the request body
  const requestBody = {
    user: {
      username: email,
      password: password,
    },
  };

  // Send a POST request to the login endpoint
  const response = await request.post(loginUrl, {
    data: requestBody,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Log the response status and body for debugging
  console.log(`Response status: ${response.status()}`);
  console.log(`Response body: ${await response.text()}`);

  // Check the response status
  expect(response.status()).toBe(200);
});

 