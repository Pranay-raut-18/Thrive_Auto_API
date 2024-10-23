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
  //console.log(customersResponseBody);

  // Step 3: Validate the response body
  const { meta, customers } = customersResponseBody;

  // Assertions for meta and customers properties
  expect(meta).toBeDefined();
  expect(customers).toBeDefined();

  // Assertions for each customer
  customers.forEach((customer: any) => {
    expect(customer).toHaveProperty("id");
    expect(customer).toHaveProperty("subdomain");
    expect(customer).toHaveProperty("name");
    expect(customer).toHaveProperty("customerType");
    expect(customer).toHaveProperty("customerCategory");
    //expect(customer).toHaveProperty("primaryUser");

    // Assertions for customer category
    const customerCategory = customer.customerCategory;
    expect(customerCategory).toHaveProperty("id");
    expect(customerCategory).toHaveProperty("name");

    // Assertions for customer type
    const customerType = customer.customerType;
    expect(customerType).toHaveProperty("id");
    expect(customerType).toHaveProperty("name");
  });
});
