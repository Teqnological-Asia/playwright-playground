import { Page } from "@playwright/test";

export const mockAbortAnalytics = async (page: Page) => {
  await page.route(/.*(boredapi).*/, (route) => route.abort());
};
