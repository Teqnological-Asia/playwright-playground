import { test, expect } from "@playwright/experimental-ct-react";
import Form from "./Form";

test("should renders", async ({ mount }) => {
  const component = await mount(<Form />);
  await expect(component).toContainText("REST Countries");
});

test("should render correct texts", async ({ mount }) => {
  const component = await mount(<Form />);
  await expect(component).toContainText("REST Countries");
  await expect(component.locator("input")).toHaveAttribute("placeholder", "Country's name");
  await expect(component.getByRole("button")).toContainText("Search");
});

test.describe("should render correct outputs", () => {
  test("output for keyword germany", async ({ mount }) => {
    const component = await mount(<Form />);
    await component.locator("input").fill("germany");
    await component.getByRole("button").click();
  });

  test("output for keyword sweden", async ({ mount }) => {
    const component = await mount(<Form />);
    await component.locator("input").fill("sweden");
    await component.getByRole("button").click();
  });
});

test.describe("should render error message when nothing received from API", () => {
  test("error for keyword germanyyyyyyyyy", async ({ mount }) => {
    const component = await mount(<Form />);
    await component.locator("input").fill("germany");
    await component.getByRole("button").click();
  });

  test("output for keyword swedennnnnnnnnnn", async ({ mount }) => {
    const component = await mount(<Form />);
    await component.locator("input").fill("sweden");
    await component.getByRole("button").click();
  });
});
