import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
import {
  chromium,
  Page,
  Browser,
  expect,
  BrowserContext,
} from "@playwright/test";
import { pageFixture } from "./pageFixture";

let page: Page;
let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  browser = await chromium.launch({ headless: false });
});

Before(async function () {
  context = await browser.newContext();
  page = await browser.newPage();
  pageFixture.page = page;
});

After(async function ({ pickle }) {
  const image = await pageFixture.page.screenshot({
    path: "../../../test-results/screenshots/${pickle.name}.png",
    type: "png",
  });

  await this.attach(image, "image/png");
  await pageFixture.page.close();
  await context.close();
});

AfterAll(async function () {
  await browser.close();
});
