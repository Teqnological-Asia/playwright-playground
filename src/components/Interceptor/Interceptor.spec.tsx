import { test, expect } from "@playwright/experimental-ct-react";
import { Page } from "@playwright/test";
import Interceptor from "@/components/Interceptor/Interceptor";

const mockAbortAnalytics = async (page: Page) => {
  await page.route(/.*(boredapi|picsum).*/, (route) => route.abort());
};

test.beforeEach(async ({ page }) => {
  await mockAbortAnalytics(page);
});

test("should renders", async ({ mount }) => {
  const component = await mount(<Interceptor />);
  await expect(component).toContainText("This is a test for interceptors");
});

test("should render a new card and a toast after clicking on existing one", async ({
  mount,
  page,
}) => {
  const component = await mount(<Interceptor />);
  const card1 = await component.getByText("step-1");
  await expect(card1).toBeVisible();
  await card1.click();
  await page.waitForSelector("text=Wow so easy 1!");
  expect(await page.isVisible("text=Wow so easy 1!")).toBe(true);

  const card2 = await component.getByText("step-2");
  await expect(card2).toBeVisible();
  await card2.click();
  await page.waitForSelector("text=Wow so easy 2!");
  expect(await page.isVisible("text=Wow so easy 2!")).toBe(true);

  const card3 = await component.getByText("step-3");
  await expect(card3).toBeVisible();
  await card3.click();
  await page.waitForSelector("text=Wow so easy 3!");
  expect(await page.isVisible("text=Wow so easy 3!")).toBe(true);

  const card4 = await component.getByText("step-4");
  await expect(card4).toBeVisible();
  await card4.click();
  await page.waitForSelector("text=Wow so easy 4!");
  expect(await page.isVisible("text=Wow so easy 4!")).toBe(true);

  const card5 = await component.getByText("step-5");
  await expect(card5).toBeVisible();
  await card5.click();
  await page.waitForSelector("text=Wow so easy 5!");
  expect(await page.isVisible("text=Wow so easy 5!")).toBe(true);

  const card6 = await component.getByText("step-6");
  await expect(card6).toBeVisible();
});
