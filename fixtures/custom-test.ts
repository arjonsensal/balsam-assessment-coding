import {test as base, expect} from '@playwright/test';
import * as PageObjects from '../pageObjects/index.js';
import data from '../test-data/data.json';

type DataType = {
  searchItem: {
    productName: string;
    index: number;
  };
};

type Pages = {
  homePage: PageObjects.HomePage;
  resultsPage: PageObjects.ResultsPage;
  productPage: PageObjects.ProductPage;
  cartPage: PageObjects.CartPage;
  data: DataType;
};
const test = base.extend<Pages>({
  homePage: async ({ page }, use) => {
    await use(new PageObjects.HomePage(page));
  },
  resultsPage: async ({ page }, use) => {
    await use(new PageObjects.ResultsPage(page));
  },
  productPage: async ({ page }, use) => {
    await use(new PageObjects.ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new PageObjects.CartPage(page));
  },
  data: async ({}, use: (data: DataType) => Promise<void>) => {
    await use(data);
  }
});

export { test, expect };