import { test, expect } from "@playwright/test";
import { customerCatApi, loginApi } from "../../utils/Apis";
import { apiLoginusername, apiPassword } from "../../utils/config-utils";

test("Get Customer Categories", async ({ request }) => {
  // Step 1: Login to obtain the authentication token
  const loginUrl = loginApi;
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

  // Step 2: Get Customer Categories
  const lookupUrl = customerCatApi;
  const lookupResponse = await request.get(lookupUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  expect(lookupResponse.status()).toBe(200); // Ensure the GET request was successful
  const lookupResponseBody = await lookupResponse.json();

  // Step 3: Validate the response body
  const responseData = lookupResponseBody.data;

  // Assertion: Response contains at least one Customer Category
  expect(responseData).toBeInstanceOf(Array);
  expect(responseData.length).toBeGreaterThan(0);

  // Assertion: Each data object has id and name properties
  responseData.forEach((data: any) => {
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name");
  });
});
