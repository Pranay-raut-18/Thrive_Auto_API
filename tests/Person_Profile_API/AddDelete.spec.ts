import { test, expect } from "@playwright/test";
// import {getCompleteTimestamp} from "../../utils/common-utils"
import { timeStamp } from "console";
import { randomBytes } from "crypto";

test("should create and delete a person", async ({ request }) => {
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
  const authToken = loginResponseBody.token; // Assuming the token is returned in the login response

  // Step 2: Use the token to create a new person
  const createPersonUrl = "https://thrive.thrive-qa.com/api/v1/people";

  // Define the request body
  const requestBody = {
    person: {
      firstName: "testdata134",
      lastName: "testdata134",
      educations: [],
      emails: [
        {
          email: `testdata@gmail.com`,
          primary: true,
          type: null,
        },
      ],
      employments: [],
      linkedinUrl: "",
      names: [
        {
          firstName: "testdata23",
          lastName: "testdatal3",
          primary: true,
          type: null,
        },
      ],
      phoneNumbers: [
        {
          phoneNumber: "0495721948",
          primary: true,
          type: null,
        },
      ],
      socialUrls: [
        {
          url: "",
          type: null,
        },
      ],
    },
  };

  // Send a POST request to create the person
  const createResponse = await request.post(createPersonUrl, {
    data: requestBody,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`, // Add the token to the headers
    },
  });

  console.log(`Create Response status: ${createResponse.status()}`);
  console.log(`Create Response body: ${await createResponse.text()}`);

  expect(createResponse.status()).toBe(201); // Check if the creation was successful

  // Parse the response body
  const createResponseBody = await createResponse.json();
  const personId = createResponseBody.id;

  // Ensure the person was created successfully
  expect(createResponseBody).toHaveProperty("id");
  expect(createResponseBody).toHaveProperty("createdAt");
  expect(createResponseBody).toHaveProperty("updatedAt");

  // Step 3: Delete the same person using the ID from the create response
  const deletePersonUrl = `https://thrive.thrive-qa.com/api/v1/people/${personId}`;

  // Send a DELETE request to the delete person endpoint
  const deleteResponse = await request.delete(deletePersonUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`, // Add the token to the headers
    },
  });

  console.log(`Delete Response status: ${deleteResponse.status()}`);
  console.log(`Delete Response body: ${await deleteResponse.text()}`);

  expect(deleteResponse.status()).toBe(204); // Ensure the deletion was successful
});
