import { test, expect } from "@playwright/test";
import { apiPassword, apiTestLogin } from "../../utils/config-utils";
import { generateRandomString } from "../../utils/common-utils";

test("Create, Update, and Delete Customer with Randomized Name", async ({
  request,
}) => {
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

  expect(loginResponse.status()).toBe(200); // Ensure the login was successful

  const loginResponseBody = await loginResponse.json();
  const authToken = loginResponseBody.token;

  // Generate a random name
  const randomName = `autorolenama${generateRandomString(6)}`;

  // Step 2: Create a customer
  const createCustomerUrl = "https://thrive.thrive-qa.com/api/v1/customers";
  const createCustomerPayload = {
    customer: {
      id: "",
      name: randomName,
      customerCategoryId: "6d2d34ea-1104-40e6-8116-fade16d56c90",
      customerTypeId: "2ae6d44c-7155-43d5-b0b2-443788f19dc7",
      subdomain: randomName,
    },
  };

  console.log("Create Customer Payload:", createCustomerPayload); // Log the payload for debugging

  const createCustomerResponse = await request.post(createCustomerUrl, {
    data: createCustomerPayload,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log(
    "Create Customer Response Status:",
    createCustomerResponse.status()
  ); // Log the response status for debugging
  console.log(
    "Create Customer Response Body:",
    await createCustomerResponse.json()
  ); // Log the response body for debugging

  expect(createCustomerResponse.status()).toBe(201); // Ensure the customer was created successfully

  const createCustomerResponseBody = await createCustomerResponse.json();
  const customerId = createCustomerResponseBody.id;

  // Step 3: Update (PATCH) the created customer
  const updateCustomerUrl = `https://thrive.thrive-qa.com/api/v1/customers/${customerId}`;
  const updateCustomerPayload = {
    customer: {
      name: `updated${randomName}`,
      subdomain: `updated${randomName}`,
    },
  };

  console.log("Update Customer Payload:", updateCustomerPayload); // Log the payload for debugging

  const updateCustomerResponse = await request.patch(updateCustomerUrl, {
    data: updateCustomerPayload,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log(
    "Update Customer Response Status:",
    updateCustomerResponse.status()
  ); // Log the response status for debugging
  console.log(
    "Update Customer Response Body:",
    await updateCustomerResponse.json()
  ); // Log the response body for debugging

  expect(updateCustomerResponse.status()).toBe(200); // Ensure the customer was updated successfully

  // Step 4: Delete the created customer
  const deleteCustomerUrl = `https://thrive.thrive-qa.com/api/v1/customers/${customerId}`;
  const deleteCustomerResponse = await request.delete(deleteCustomerUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
  });

  console.log(
    "Delete Customer Response Status:",
    deleteCustomerResponse.status()
  ); // Log the response status for debugging

  expect(deleteCustomerResponse.status()).toBe(204); // Ensure the customer was deleted successfully
});
