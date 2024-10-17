import { test, expect } from "@playwright/test";
import { LoginPage } from "../../Pages/LoginPage";
import { HomePage } from "../../Pages/HomePage";
import { Url, EmailAddress, Password } from "../../utils/config-utils";

test.only("TCCP_01:LoginPage | Verify Login correct ID and Password", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  //Login using email address and password
  await test.step(`Login using email address and password`, async () => {
    await loginPage.login(Url, EmailAddress, Password);
  });

  //Verify user is logged in successfully
  await test.step(`Verify user is logged in successfully`, async () => {
    homePage.clickOnOpenAccountMenu();
    await expect(page.getByText("Log Out")).toHaveText("Log Out");
    await page.locator("#account-menu > .MuiBackdrop-root").click();
    await page.waitForSelector(
      "//p[@class='MuiTypography-root MuiTypography-body1 MuiTypography-noWrap MuiListItemText-primary css-gnfns7']"
    );
  });
});
