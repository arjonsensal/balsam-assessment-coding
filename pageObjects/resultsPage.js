import { Base } from './base.js';
/**
 * Represents the home page.
 * @extends Base
 */
export class ResultsPage extends Base {
  constructor(page) {
    super(page);
    this.page = page;
    this.resultItems = page.locator('[data-testid="results-grid"] .row > div');
  }

  /**
   * Retrieves the product details from a result card.
   * @param {number} resultNumber - The index of the result card.
   * @returns {Promise<{productName: string, productPrice: string}>}
   */
  async getProductDetailsByResultNumber(resultNumber) {
    const prodTitle = '[class*="productCard_detail"] [class*="productCard_title"]';
    const prodPrice = '[class*="productCard_prod-sale-price"]';
    const productCard = await this.resultItems.nth(resultNumber - 1);
    await productCard.waitFor();
    const title = await this.getText(productCard.locator(prodTitle));
    const price = await this.getText(productCard.locator(prodPrice));
    return { productName: title.trim(), productPrice: price.trim() };
  }

  /**
   * Clicks on a product result card.
   * @param {number} resultNumber - The index of the result card.
   */
  async clickProductByResultNumber(resultNumber) {
    await this.click(await this.resultItems.nth(resultNumber - 1));
  }
}
