import { Base } from './base.js';
import { expect } from "@playwright/test";
/**
 * Represents the product page.
 * @extends Base
 */
export class ProductPage extends Base {
  constructor(page) {
    super(page);
    this.page = page;
    this.themeNameSelected = page.locator('[data-testid="pdf-Theme-display-value"]');
    this.themeSelector = page.locator('[aria-labelledby="product_filter_theme"]');
    this.colorSelector = page.locator('[aria-labelledby="product_filter_color"]');
    this.sizeSelector = page.locator('[aria-labelledby="product_filter_size"]');
    this.heightSelector = page.locator('[aria-labelledby="product_filter_height"]');
    this.lightSelector = page.locator('[aria-labelledby="product_filter_lights"]');
    this.productPrice = page.locator('[class*="productPrice_new-price"]');
    this.addToCartButton = page.locator('.produt-detail-container [data-testid="pdc-btn-addtocart"]');
    this.productAddToCartModal = {
      prodTitle: page.locator('[class*="productAddToCartModal_title"]'),
      prodPrice: page.locator('[class*="productAddToCartModal_meta-item"]', { hasText: 'Price'}),
      viewCartButton: page.locator('[data-testid="pdc-add-to-cart-modal-btn-viewcart"]')
    }
  }

  async verifyPrice({ expectedPrice }) {
    await this.productPrice.waitFor();
    const prodPrice = await this.getText(this.productPrice);
    console.log(`Expected product price is ${expectedPrice}, Actual product price is ${prodPrice}`);
    await expect(prodPrice).toBe(expectedPrice);
  }

  /**
   * Customizes the product dynamically based on available options.
   */
  async customizeProductDynamically() {
    const selectChoice = async (locator, choiceValueLocator) => {
      let choices = '> div [class*="productDetailFilter_product-filter-item"]'
      console.log(`Selecting first choice for ${locator._selector}`);
      const firstChoice = await locator.locator(choices).first();
      const firstChoiceText = await this.getText(firstChoice);
      await this.click(firstChoice);
      await this.page.waitForTimeout(500);
      const actualChoiceText = await this.getText(choiceValueLocator);
      console.log(`Expected Value for ${choiceValueLocator._selector}: ${actualChoiceText}, Actual Value: ${firstChoiceText}`);
      await expect(actualChoiceText).toBe(firstChoiceText);
    }

    if (await this.heightSelector.count() > 0) {
      console.log('Product option for Height is available');
      await selectChoice(this.heightSelector, this.page.locator('[data-testid="pdf-Height-display-value"]'));
    }

    if (await this.lightSelector.count() > 0) {
      console.log('Product option for Light is available');
      await selectChoice(this.lightSelector, this.page.locator('[data-testid="pdf-Lights-display-value"]'));
    }

    if (await this.themeSelector.count() > 0) {
      console.log('Product option for Theme is available');
      await selectChoice(this.themeSelector, this.page.locator('[data-testid="pdf-Theme-display-value"]'));
    }

    if (await this.colorSelector.count() > 0) {
      console.log('Product option for Color is available');
      await selectChoice(this.colorSelector, this.page.locator('[data-testid="pdf-Color-display-value"]'));
    }

    if (await this.sizeSelector.count() > 0) {
      console.log('Product option for Size is available');
      await selectChoice(this.sizeSelector, this.page.locator('[data-testid="pdf-Size-display-value"]'));
    }
  }

  /**
   * Adds the product to the cart.
   */
  async addProductToCart() {
    await this.click(this.addToCartButton);
  }

  /**
   * Verifies the details in the add to cart modal.
   * @param {Object} params - The parameters for verification.
   * @param {string} params.expectedProdPrice - The expected price of the product in the cart.
   */
  async verifyAddToCartPrice({ expectedProdPrice }) {
    const productPrice = await this.getText(this.productAddToCartModal.prodPrice);
    console.log(`Expected Value for ${productPrice._selector}: ${expectedProdPrice}, Actual Value: ${productPrice.trim()}`);
    expect.soft(productPrice.trim()).toContain(expectedProdPrice);
  }

  /**
   * Clicks the view cart button in the add to cart modal.
   */
  async clickViewCart() {
    await this.click(this.productAddToCartModal.viewCartButton);
  }
}
