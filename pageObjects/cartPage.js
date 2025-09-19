import { Base } from './base.js';
import { expect } from "@playwright/test";
/**
 * Represents the product page.
 * @extends Base
 */
export class CartPage extends Base {
  constructor(page) {
    super(page);
    this.page = page;
    this.productList = page.locator('.product-detail-list > div');
    this.cartRemovalConfirmation = page.locator('[class*="cartProductDetailItem_removed-product-list"]');
  }

  /**
   * Verifies the product details on the product card.
   * @param {Object} params - The parameters for verification.
   * @param {number} params.index - The index of the product card.
   * @param {string} params.prodTitle - The expected product title.
   * @param {string} params.prodPrice - The expected product price.
   */
  async verifyProductPrice({ index, prodPrice }) {
    const productCard = await this.productList.nth(index);
    console.log(`Verifying product price is ${prodPrice}`);
    await expect.soft(productCard).toContainText(prodPrice);
  }

  /**
   * Verifies the removal confirmation message.
   * @param {string} prodTitle - The title of the product that was removed.
   */
  async verifyRemovalConfirmation(prodTitle) {
    const removalText = `${prodTitle} has been removed.`;
    console.log(`Verifying Removal Confirmation text is ${removalText}`);
    await expect(await this.cartRemovalConfirmation).toContainText(removalText);
  }

  /**
   * Removes a product from the cart.
   * @param {Object} params - The parameters for removing the product.
   * @param {number} params.index - The index of the product card.
   * @param {string} params.title - The title of the product to remove.
   */
  async removeProductAndVerify({ index, title }) {
    const productCard = this.productList.nth(index);
    const removeButton = productCard.locator('[data-testid*="cc-btn-remove"]');
    await this.click(removeButton);
    await this.verifyRemovalConfirmation(title);
  }
}
