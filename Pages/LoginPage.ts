import { Locator, Page, expect } from "@playwright/test";

/**
 * login page
 * @author Pranay
 */
export class LoginPage {
  readonly page: Page;
  private email_AddressInputFeild: Locator;
  private passwordInputField: Locator;
  private ContinueWithEmail: Locator;

  constructor(page: Page) {
    this.page = page;
    this.email_AddressInputFeild = page.locator("#username");
    this.passwordInputField = page.locator("#password");
    this.ContinueWithEmail = page.getByRole("button", {
      name: "Continue with email",
    });
  }

  /**
   * Goin to url
   * @param url The url of the website
   */
  async goTo(url: string): Promise<void> {
    await this.page.goto(url, { timeout: 300000 });
    await this.page.waitForLoadState("networkidle");
  }

  /**
   * Enter Email Address
   * @param emailAddress the email address to be entered
   */
  async enterEmailAddress(emailAddress: string) {
    await this.email_AddressInputFeild.click();
    await this.email_AddressInputFeild.fill(emailAddress);
  }

  /**
   * Enter Password
   * @param password the Password to be enetered.
   */
  async enterPassword(password: string) {
    await this.passwordInputField.click();
    await this.passwordInputField.fill(password);
  }

  /**
   * Click on 'Continue with Email'
   */
  async clickOnContinueWithEmailButton() {
    await this.ContinueWithEmail.click();
  }

  /**
   * Log In
   * @param url going to the URL website
   * @param email the email to be entered
   * @param password the Password to be entered
   */
  async login(url: string, email: string, password: string): Promise<void> {
    await this.goTo(url);
    await this.enterEmailAddress(email);
    await this.enterPassword(password);
    await this.clickOnContinueWithEmailButton();
  }
}
