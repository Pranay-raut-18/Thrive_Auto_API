import { test, expect } from "@playwright/test";

test("Get All Customers", async ({ request }) => {
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
  const authToken = loginResponseBody.token;

  // Step 2: Get all customers
  const customersUrl = "https://thrive.thrive-qa.com/api/v1/customers";
  const customersResponse = await request.get(customersUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  expect(customersResponse.status()).toBe(200); // Ensure the GET request was successful

  const customersResponseBody = await customersResponse.json();
  console.log(customersResponseBody); // Log the customers response for debugging
});
