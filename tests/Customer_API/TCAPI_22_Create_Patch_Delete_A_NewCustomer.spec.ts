import { test, expect } from "@playwright/test";
import { apiLoginusername, apiPassword } from "../../utils/config-utils";
import { generateRandomString } from "../../utils/common-utils";
import { customerApi, loginApi } from "../../utils/Apis";
import exp from "constants";

test("Create, Update, and Delete Customer with Randomized Name", async ({
  request,
}) => {
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

  // Generate a random name and subdomain
  const randomName = `autorolenama${generateRandomString(6)}`;
  const randomSubdomain = `subdomain${generateRandomString(6)}`;

  // Step 2: Create a customer
  const createCustomerUrl = `${customerApi}`;
  const createCustomerPayload = {
    customer: {
      name: randomName,
      subdomain: randomSubdomain,
      avatar: "https://example.com/avatar.png", // Replace with a valid avatar URL
      parentCustomerId: "5f7c7584-fbdd-4047-93b5-fe5f00539dd5",
      customerCategoryId: "d1c58fd4-fc58-4aac-9a1c-c5472ff65f4c",
      customerTypeId: "7d1413f3-626e-4959-8715-0f7661dc2bf4",
      primaryUserId: "dedab73e-e39c-477f-a9d0-cb65740b6c43",
    },
  };

  // console.log("Create Customer Payload:", createCustomerPayload);

  const createCustomerResponse = await request.post(createCustomerUrl, {
    data: createCustomerPayload,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  // console.log("Create Response Status:", createCustomerResponse.status());
  // console.log("Create Response Body:", await createCustomerResponse.json());

  expect(createCustomerResponse.status()).toBe(201);

  const createCustomerResponseBody = await createCustomerResponse.json();
  const customerId = createCustomerResponseBody.id;
  // Assertions for response body properties
  expect(createCustomerResponseBody).toHaveProperty("id");
  expect(createCustomerResponseBody).toHaveProperty("createdAt");
  expect(createCustomerResponseBody).toHaveProperty("updatedAt");
  expect(createCustomerResponseBody).toHaveProperty("subdomain");
  expect(createCustomerResponseBody).toHaveProperty("name");
  expect(createCustomerResponseBody).toHaveProperty("status");

  // Assertion for customer status
  expect(createCustomerResponseBody.status).toHaveProperty("name", "Pending");

  // Step 3: Update (PATCH) the created customer
  const updateCustomerUrl = `${customerApi}${customerId}`;
  const updateCustomerPayload = {
    customer: {
      name: `updated${randomName}`,
      subdomain: `updated${randomSubdomain}`,
    },
  };

  // console.log("Update Customer Payload:", updateCustomerPayload);

  const updateCustomerResponse = await request.patch(updateCustomerUrl, {
    data: updateCustomerPayload,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  // console.log("Update Response Status:", updateCustomerResponse.status());
  // console.log("Update Response Body:", await updateCustomerResponse.json());

  expect(updateCustomerResponse.status()).toBe(200); // Ensure the customer was updated successfully
  // Assertions for response body properties
  const updateResponseBody = await updateCustomerResponse.json();
  expect(updateResponseBody).toHaveProperty("id");
  expect(updateResponseBody).toHaveProperty("createdAt");
  expect(updateResponseBody).toHaveProperty("updatedAt");
  expect(updateResponseBody).toHaveProperty("subdomain");
  expect(updateResponseBody).toHaveProperty("name");
  expect(updateResponseBody).toHaveProperty("status");
  expect(updateResponseBody).toHaveProperty("parentCustomer");
  expect(updateResponseBody).toHaveProperty("customerType");
  expect(updateResponseBody).toHaveProperty("customerCategory");

  // Assertions for nested objects
  expect(updateResponseBody.parentCustomer).toHaveProperty("id");
  expect(updateResponseBody.parentCustomer).toHaveProperty("name");

  expect(updateResponseBody.customerType).toHaveProperty("id");
  expect(updateResponseBody.customerType).toHaveProperty("name");

  expect(updateResponseBody.customerCategory).toHaveProperty("id");
  expect(updateResponseBody.customerCategory).toHaveProperty("name");

  expect(updateResponseBody.status).toHaveProperty("id");
  expect(updateResponseBody.status).toHaveProperty("name");

  // Step 4: Delete the created customer
  const deleteCustomerUrl = `https://thrive.thrive-dev.com/api/v1/customers/${customerId}`;
  const deleteCustomerResponse = await request.delete(deleteCustomerUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log("Delete Response Status:", deleteCustomerResponse.status());
  expect(deleteCustomerResponse.status()).toBe(204);
});
