import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import * as path from "path";

test.only("TCCP_01:LoginPage | Verify Login correct ID and Password", async ({page,}) => {
  const loginPage = new LoginPage(page);

  const filename = "Resume_Upload_Tests.docx";

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
    await page.waitForSelector(
      "//p[@class='MuiTypography-root MuiTypography-body1 MuiTypography-noWrap MuiListItemText-primary css-gnfns7']"
    );
  });

  //Login using email address and password
  await test.step(`Open Action Menu`, async () => {
    await page.getByLabel("Open Action Menu").first().click();
  });

  await test.step(`Click on Add Person`, async () => {
    await page.getByRole("menuitem", { name: "Add Person" }).click();
  });
  
  await test.step(`Click on Upload Link`, async () => {
    await page.getByRole("button", { name: "Click to upload" }).click();
  });
  
  await test.step(`Upload File`, async () => {  
    // Path to the file you want to upload
    const filePath = path.resolve(__dirname,`D:/Thrive_Auto_API/Resume/${filename}`); 
    // Upload the file using the input element
    await page.setInputFiles('input[type="file"]', filePath);
  });
  
  await test.step(`Verify the Firstname, LastName and Email`, async () => {    
    // Listen for the response from the API that parses the uploaded file
    page.on("response", async (response) => {
      if (response.url().includes("/parsed_resumes") && response.status() === 200) {
        // Capture and verify the response data
        const responseBody = await response.json();

        // Assert the parsed data matches expected first name, last name, and email
        const parsedFirstName = responseBody.firstName || responseBody.resumeToParse.firstName; // Adjust based on your response structure
        const parsedLastName = responseBody.lastName || responseBody.resumeToParse.lastName;
        const parsedEmail = responseBody.email || responseBody.resumeToParse.email;

        await page.waitForSelector(".css-1xsto0d");
        
        // Verify that the form fields are populated with the correct data
        const firstName = await page.getByPlaceholder("First name").inputValue(); // Adjust selectors as necessary
        const lastName = await page.getByPlaceholder("Last name").inputValue();
        const email = await page.getByPlaceholder("Email").inputValue();
        
        // Assert that the form fields have been populated correctly
        expect(firstName).toBe(parsedFirstName);
        expect(lastName).toBe(parsedLastName);
        expect(email).toBe(parsedEmail);
      }
    });
  });
});
