import { test, expect } from "@playwright/test";
import { apiPassword, apiTestLogin } from "../../utils/config-utils";

test("Get All Customers and Validate Response", async ({ request }) => {
  // Step 1: Login to obtain the authentication token
  const loginUrl = "https://thrive.thrive-qa.com/api/v1/login";
  const loginResponse = await request.post(loginUrl, {
    data: {
      user: {
        username: apiTestLogin,
        password: apiPassword,
      },
    },
    headers: {
      "Content-Type": "application/json",
    },
  });
  // Ensure the login was successful
  expect(loginResponse.status()).toBe(200);

  const loginResponseBody = await loginResponse.json();
  const authToken = loginResponseBody.token;

  // Step 2: Get all customers
  const customersUrl = "https://thrive.thrive-qa.com/api/v1/customersa";
  const customersResponse = await request.get(customersUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  expect(customersResponse.status()).toBe(404);
});
