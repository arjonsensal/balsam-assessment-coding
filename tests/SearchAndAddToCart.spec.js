import { test } from '../fixtures/custom-test.ts';

test('Search and Add to Cart Test', async ({data, homePage, resultsPage, productPage, cartPage}) => {
  let productdetails;
  await test.step('Go to Balsam Hill website', async () => {
    await homePage.goto();
  });

  await test.step('Search and Select for Product', async () => {
    await homePage.searchProduct(data.searchItem.productName);
    await homePage.waitForPageLoad();
    productdetails = await resultsPage.getProductDetailsByResultNumber(data.searchItem.index)
    await resultsPage.clickProductByResultNumber(data.searchItem.index);
    await productPage.waitForPageLoad();
    await productPage.verifyPrice({ expectedPrice: productdetails.productPrice });
  });

  await test.step('Customize Product and Add to cart', async () => {
    // Customize product dynamically based on available options
    await productPage.customizeProductDynamically();
    await productPage.addProductToCart();
    await homePage.verifyCartItemCount(1);
  });

  await test.step('Verify Cart Price', async () => {
    await productPage.verifyAddToCartPrice({ expectedProdPrice: productdetails.productPrice });
    await productPage.clickViewCart();
    await cartPage.waitForPageLoad();
    await cartPage.verifyProductPrice({ index: 0, prodTitle: productdetails.productName, prodPrice: productdetails.productPrice });
  });
  
  await test.step('Remove Product from Cart and Verify Removal Confirmation', async () => {
    await cartPage.removeProductAndVerify({ index: 0, title: productdetails.productName });
    await homePage.verifyCartItemCount(0);
  });
});