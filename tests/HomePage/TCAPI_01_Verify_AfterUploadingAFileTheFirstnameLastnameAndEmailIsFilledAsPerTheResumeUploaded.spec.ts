import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";
import * as path from "path";
import { HomePage } from "../../Pages/HomePage";

test.only("TCAPI_01: HomePage | Verify After uploading a File the Firstname, Lastname and email is Filled As per the resume uploaded", async ({page,}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

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
    await homePage.clickOnOpenAccountMenu();
  });

  await test.step(`Click on Add Person`, async () => {
    await homePage.clickOnAddPerson();
  });
  
  await test.step(`Click on Upload Link`, async () => {
    await homePage.clickOnUploadLink();
  });
  
  await test.step(`Upload File`, async () => {  
    const filePath = path.resolve(__dirname,`D:/Thrive_Auto_API/Resume/${filename}`);
    await page.setInputFiles('input[type="file"]', filePath); 
  });
  
  await test.step(`Verify the Firstname, LastName and Email`, async () => { 
    await homePage.verifyFnameLNameAndEmail();
  });

});
