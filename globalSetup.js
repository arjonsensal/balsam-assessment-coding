const { chromium } = require('@playwright/test');

async function globalSetup(config) {
  const baseURL = process.env.BASE_URL;
  const storageState = process.env.STORAGE_STATE;

  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Visit the base URL to let the app set any cookies/localStorage
  await page.goto(baseURL);
  console.log(`Navigated to ${baseURL}`);
  // Save the current browser context state
  await page.context().storageState({ path: storageState });

  await browser.close();
}

export default globalSetup;
