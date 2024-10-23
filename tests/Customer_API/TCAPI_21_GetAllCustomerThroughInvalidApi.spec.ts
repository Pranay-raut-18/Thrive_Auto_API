import { test, expect } from "@playwright/test";
import { apiPassword, apiTestLogin, apiUrl } from "../../utils/config-utils";
import { customerApi } from "../../utils/Apis";

test("Get All Customers and Validate Response", async ({ request }) => {
  // Step 1: Login to obtain the authentication token
  const loginUrl = apiUrl;
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
  const customersUrl = customerApi + "invalid";
  const customersResponse = await request.get(customersUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  expect(customersResponse.status()).toBe(404);
});
