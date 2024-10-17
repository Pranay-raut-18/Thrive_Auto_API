import { Locator, Page, expect } from "@playwright/test";

/**
 * Home page
 * @author Pranay
 */
export class HomePage {
  readonly page: Page;
  private goToAdminPortal: Locator;
  private OpenAccountMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.goToAdminPortal = page.locator(
      "//p[@class='MuiTypography-root MuiTypography-body1 MuiTypography-noWrap MuiListItemText-primary css-gnfns7']"
    );
    this.OpenAccountMenuButton = page.getByLabel("Open Account Menu");
  }

  /**
   * Click on Go to Open Account Menu
   */
  async clickOnOpenAccountMenu() {
    await this.OpenAccountMenuButton.click();
  }

  /**
   * Click on Go to Admin portal
   */
  async clickOnGoToAdminPortal() {
    await this.page.waitForURL("https://thrive.thrive-qa.com/hub");
    await this.goToAdminPortal.click();
    
  }
}
