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
    await expect(component).toContainText("Germany");
    await expect(component).toContainText("Federal Republic of Germany");
    await expect(component).toContainText("Berlin");
    await expect(component).toContainText("Europe");
    await expect(component).toContainText("Western Europe");
  });

  test("output for keyword sweden", async ({ mount }) => {
    const component = await mount(<Form />);
    await component.locator("input").fill("sweden");
    await component.getByRole("button").click();
    await expect(component).toContainText("Sweden");
    await expect(component).toContainText("Kingdom of Sweden");
    await expect(component).toContainText("Stockholm");
    await expect(component).toContainText("Europe");
    await expect(component).toContainText("Northern Europe");
  });
});

test.describe("should render error message when nothing received from API", () => {
  test("error for keyword germanyyyyyyyyy", async ({ mount }) => {
    const component = await mount(<Form />);
    await component.locator("input").fill("germanyyyyyyyyy");
    await component.getByRole("button").click();
    await expect(component).toContainText("Country not found");
  });

  test("output for keyword swedennnnnnnnnnn", async ({ mount }) => {
    const component = await mount(<Form />);
    await component.locator("input").fill("swedennnnnnnnnnn");
    await component.getByRole("button").click();
    await expect(component).toContainText("Country not found");
  });
});

test("should render without issues in multiple consecutive attemps", async ({ mount }) => {
  const component = await mount(<Form />);

  await component.locator("input").fill("sweden");
  await component.getByRole("button").click();
  await expect(component).toContainText("Sweden");
  await expect(component).toContainText("Kingdom of Sweden");
  await expect(component).toContainText("Stockholm");
  await expect(component).toContainText("Europe");
  await expect(component).toContainText("Northern Europe");

  await component.locator("input").fill("");

  await component.locator("input").fill("germany");
  await component.getByRole("button").click();
  await expect(component).toContainText("Germany");
  await expect(component).toContainText("Federal Republic of Germany");
  await expect(component).toContainText("Berlin");
  await expect(component).toContainText("Europe");
  await expect(component).toContainText("Western Europe");

  await component.locator("input").fill("");
  await component.getByRole("button").click();
  await expect(component).toContainText("Country not found");
});
