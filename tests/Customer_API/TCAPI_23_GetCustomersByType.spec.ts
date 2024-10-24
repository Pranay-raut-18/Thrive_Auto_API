import { test, expect } from "@playwright/test";
import {
  apiLoginusername,
  apiPassword,
  apiUrl,
} from "../../utils/config-utils";
import { customerTypeapi } from "../../utils/Apis";

test("Get All Customers by type and Validate Response", async ({ request }) => {
  // Step 1: Login to obtain the authentication token
  const loginUrl = apiUrl;
  const loginResponse = await request.post(loginUrl, {
    data: {
      user: {
        username: apiLoginusername,
        password: apiPassword,
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
  const customersTypeUrl = customerTypeapi;
  const customersResponse = await request.get(customersTypeUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });
  console.log("data -->", customersResponse);

  console.log("response :", customersResponse.status());
  expect(customersResponse.status()).toBe(200);
});
