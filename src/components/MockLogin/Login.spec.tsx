import { test, expect } from "@playwright/experimental-ct-react";
import { Page } from "@playwright/test";
import Login from "./Login";

const mockSetLocalStorage = async (page: Page) => {
  await page.evaluate(() =>
    window.localStorage.setItem(
      "access_token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2IiOiIyNC4xMC4xOTg1IiwibmFtZSI6IldheW5lIFJvb25leSIsImFnZSI6Mzd9.VPj0pf15R47kOgzqhj9qk4iYok5vIOiw8_1IaMYy_mo",
    ),
  );
};

const clearLocalStorage = async (page: Page) => {
  await page.evaluate(() => window.localStorage.clear());
};

const mockLogin = async (page: Page) => {
  const resBody = {
    status: 200,
    // eslint-disable-next-line camelcase
    access_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2IiOiIyNC4xMC4xOTg1IiwibmFtZSI6IldheW5lIFJvb25leSIsImFnZSI6Mzd9.VPj0pf15R47kOgzqhj9qk4iYok5vIOiw8_1IaMYy_mo",
  };
  await page.route("https://playwright.free.beeceptor.com/mock-login", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(resBody),
    });
  });
};

const mockAuthorize = async (page: Page) => {
  const resBody = {
    status: 200,
    name: "Wayne Rooney",
    dob: "24.10.1985",
    age: 37,
  };
  await page.route("https://playwright.free.beeceptor.com/mock-authorize", (route) => {
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(resBody),
    });
  });
};

test.beforeEach(async ({ page }) => {
  await mockLogin(page);
  await mockAuthorize(page);
  await mockSetLocalStorage(page);
});

test("should render", async ({ mount, page }) => {
  await clearLocalStorage(page);
  const component = await mount(<Login />);
  await expect(component).toContainText("This a mock login page");
});

test.describe("should render errors when missing inputs", () => {
  test("should render error when missing ID", async ({ mount, page }) => {
    await clearLocalStorage(page);
    const component = await mount(<Login />);
    await component.getByLabel("Password").fill("somepassword");
    await component.getByRole("button", { name: "Sign in" }).click();
    await expect(component).toContainText("ID is missing");
  });

  test("should render error when missing password", async ({ mount, page }) => {
    await clearLocalStorage(page);
    const component = await mount(<Login />);
    await component.getByLabel("Your ID").fill("someid");
    await component.getByRole("button", { name: "Sign in" }).click();
    await expect(component).toContainText("Password is missing");
  });

  test("should render error when missing both inputs", async ({ mount, page }) => {
    await clearLocalStorage(page);
    const component = await mount(<Login />);
    await component.getByRole("button", { name: "Sign in" }).click();
    await expect(component).toContainText("ID is missing");
    await expect(component).toContainText("Password is missing");
  });
});

test("should show welcome box and save token after performing successful login", async ({
  mount,
  page,
}) => {
  await clearLocalStorage(page);
  const component = await mount(<Login />);
  await component.getByLabel("Your ID").fill("someid");
  await component.getByLabel("Password").fill("somepassword");
  await component.getByRole("button", { name: "Sign in" }).click();
  await page.waitForSelector("text=Login successful");
  expect(await page.isVisible("text=Login successful")).toBe(true);
  expect(component).toContainText("Herzlich Willkommen");
  const context = await page.context();
  const storage = await context.storageState();
  expect(storage.origins[0].localStorage[0].value).toBe(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkb2IiOiIyNC4xMC4xOTg1IiwibmFtZSI6IldheW5lIFJvb25leSIsImFnZSI6Mzd9.VPj0pf15R47kOgzqhj9qk4iYok5vIOiw8_1IaMYy_mo",
  );
});

test.describe("should check localStorage to decide for login or authorization", () => {
  test.describe.configure({ retries: 3 });
  test.setTimeout(10000);

  test("should directly show welcome box if a token was saved in localStorage", async ({
    mount,
    page,
  }) => {
    const component = await mount(<Login />);
    await page.waitForSelector("h4");
    expect(component).toContainText("Herzlich Willkommen");
    expect(component).toContainText("Wayne Rooney");
    expect(component).toContainText("24.10.1985");
    expect(component).toContainText("37");
  });
});
