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

  expect(customersResponse.status()).toBe(200);

  const customersResponseBody = await customersResponse.json();
  //console.log(customersResponseBody); // Log the response body for debugging

  // Assertions for response body
  const responseData = customersResponseBody.data;

  // Assertion: Response contains at least one Customer Type
  expect(responseData).toBeInstanceOf(Array);
  expect(responseData.length).toBeGreaterThan(0);

  // Assertion: Data array contains objects with id and name properties
  responseData.forEach((item: any) => {
    expect(item).toHaveProperty("id");
    expect(item).toHaveProperty("name");
    expect(item).toHaveProperty("tag");
  });
});
