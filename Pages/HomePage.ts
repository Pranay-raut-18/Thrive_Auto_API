import { Locator, Page, expect } from "@playwright/test";

/**
 * Home page
 * @author Pranay
 */
export class HomePage {
  readonly page: Page;
  private goToAdminPortal: Locator;
  private OpenAccountMenuButton: Locator;
  private openActionMenu: Locator;
  private addPerson: Locator;
  private uploadLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.goToAdminPortal = page.locator(
      "//p[@class='MuiTypography-root MuiTypography-body1 MuiTypography-noWrap MuiListItemText-primary css-gnfns7']"
    );
    this.OpenAccountMenuButton = page.getByLabel("Open Account Menu");
    this.openActionMenu = page.getByLabel("Open Action Menu").first();
    this.addPerson = page.getByRole("menuitem", { name: "Add Person" });
    this.uploadLink = page.getByRole("button", { name: "Click to upload" });
  }

  /**
   * Click on Go to Open Account Menu
   */
  async clickOnOpenAccountMenu() {
    await this.openActionMenu.click();
  }

  /**
   * Click on Go to Admin portal
  */
 async clickOnGoToAdminPortal() {
   await this.page.waitForURL("https://thrive.thrive-qa.com/hub");
   await this.goToAdminPortal.click();
   
  }
  
  /**
   * Click on open Action Menu
   */
  async clickOnopenActionMenu() {
    await this.OpenAccountMenuButton.click();
  }

  /**
   * Click on Add Person
   */
  async clickOnAddPerson() {
    await this.addPerson.click();
  }

  /**
   * Click on Upload Link
   */
  async clickOnUploadLink() {
    await this.uploadLink.click();
  }

    /**
   * verify Fname LName And Email
   */
  async verifyFnameLNameAndEmail(){
   this.page.on("response", async (response) => {
    if (response.url().includes("/parsed_resumes") && response.status() === 200) {
      const responseBody = await response.json();

      const parsedFirstName = responseBody.firstName || responseBody.resumeToParse.firstName; // Adjust based on your response structure
      const parsedLastName = responseBody.lastName || responseBody.resumeToParse.lastName;
      const parsedEmail = responseBody.email || responseBody.resumeToParse.email;

      await this.page.waitForSelector(".css-1xsto0d");
      
      const firstName = await this.page.getByPlaceholder("First name").inputValue(); // Adjust selectors as necessary
      const lastName = await this.page.getByPlaceholder("Last name").inputValue();
      const email = await this.page.getByPlaceholder("Email").inputValue();
      
      expect(firstName).toBe(parsedFirstName);
      expect(lastName).toBe(parsedLastName);
      expect(email).toBe(parsedEmail);
    }
  });
  }

  


}
