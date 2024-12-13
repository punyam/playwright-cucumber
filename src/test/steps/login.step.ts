import { Given, When, Then } from "@cucumber/cucumber";
import { chromium, Page, Browser, expect } from "@playwright/test";
import { pageFixture } from "../hook/pageFixture";

// let browser: Browser;
// let page: Page;

Given(
  "User navigates to the application",
  { timeout: 9000 },
  async function () {
    // browser = await chromium.launch({ headless: false });
    // page = await browser.newPage();
    // page.setDefaultNavigationTimeout(20000);
    await pageFixture.page.goto("https://bookcart.azurewebsites.net/");
  }
);

Given("User click on the login link", async function () {
  await pageFixture.page.locator("//span[text()=' Login ']").click();
  await pageFixture.page.waitForLoadState();
  await pageFixture.page.waitForTimeout(1000);
});

Given("User enter the username as {string}", async function (username) {
  await pageFixture.page
    .locator("input[formcontrolname='username']")
    .type(username);
});

Given("User enter the password as {string}", async function (password) {
  await pageFixture.page
    .locator("input[formcontrolname='password']")
    .type(password);
});

When("User click on the login button", { timeout: 9000 }, async function () {
  await pageFixture.page
    .locator("mat-card-actions")
    .getByRole("button", { name: "Login" })
    .click();
  await pageFixture.page.waitForLoadState();
  await pageFixture.page.waitForTimeout(6000);
});

Then("Login should be success", async function () {
  const user = pageFixture.page.locator(
    "//button[contains(@class,'mat-focus-indicator mat-menu-trigger')]//span[1]"
  );
  const user1 = pageFixture.page.getByText("ortoni11");
  await expect(user1).toBeVisible();
  const userName = await user1.textContent();
  console.log("Username: " + userName);
});

// When("Login should fail", async function () {
//   const failureMesssage = pageFixture.page.locator("mat-error[role='alert']");
//   await expect(failureMesssage).toBeVisible();
// });
