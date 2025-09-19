import { expect } from '@playwright/test';
/**
 * Base class for all page objects.
 */
export class Base {
  constructor(page) {
    this.page = page;
    this.loadingImage = page.locator('[class*="bLoader_loader-icon-active"]');
  }

  async goto(url = '/') {
    await this.page.goto(url,{ waitUntil: 'domcontentloaded' });
  }

  /**
   * Clicks on the specified locator.
   * @param {string} locator - The locator to click.
   */
  async click(locator) {
    console.log(`Clicking ${locator._selector}`);
    await locator.click();
  }

  /**
   * Fills the specified locator with the given text and presses Enter.
   * @param {string} locator - The locator to fill.
   * @param {string} text - The text to fill with.
   */
  async fillAndEnter(locator, text) {
    console.log(`Filling ${locator._selector} with ${text}`);
    await locator.fill(text);
    console.log(`Expecting ${locator._selector} to have value ${text}`);
    expect(locator).toHaveValue(text);
    await locator.press('Enter');
  }

  /**
   * Gets the text content of the specified locator.
   * @param {string} locator - The locator to get the text content from.
   * @returns {Promise<string|null>}
   */
  async getText(locator) {
    console.log(`Getting Text Content for ${locator._selector}`);
    return (await locator.textContent())?.trim();
  }

  /**
   * Waits for the page to load by waiting for the loading image to be hidden.
   */
  async waitForPageLoad() {
    await this.loadingImage.waitFor({ state: 'visible' });
    await this.page.waitForTimeout(500);
    await this.loadingImage.waitFor({ state: 'detached' });
  }
}
