import { expect } from "@playwright/test";
import { Base } from './base.js';
/**
 * Represents the home page.
 * @extends Base
 */
export class HomePage extends Base {
  constructor(page) {
    super(page);
    this.page = page;
    this.searchInput = page.locator('#constructor-search-input');
    this.cartCount = page.locator('[class*="headerIcons_cart-icon"] span');
    this.cartLink = page.locator('[class*="headerIcons_cart-icon"] a');
  }

  /**
   * Searches for a product.
   * @param {string} productName - The name of the product to search for.
   */
  async searchProduct(productName) {
    await this.fillAndEnter(this.searchInput, productName);
  }

  /**
   * Navigates to the cart page.
   */
  async viewCart() {
    await this.click(this.cartLink);
  }

  /**
   * Verifies the number of items in the cart.
   * @param {number} expectedCount - The expected number of items in the cart.
   */
  async verifyCartItemCount(expectedCount) {
    if (expectedCount === 0) {
      await expect(this.cartCount).toBeHidden();
      return;
    }
    const countText = await this.cartCount.textContent();
    const count = parseInt(countText);
    console.log(`Expected Value for ${this.cartCount._selector}: ${expectedCount}, Actual Value: ${count}`);
    expect(count).toBe(expectedCount);
  }
}
