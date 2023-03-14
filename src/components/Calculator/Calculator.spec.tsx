import { test, expect } from "@playwright/experimental-ct-react";
import Calculator from "./Calculator";

test("should renders", async ({ mount }) => {
  const component = await mount(<Calculator />);
  await expect(component).toContainText("0");
});

test("should have all buttons", async ({ mount }) => {
  const component = await mount(<Calculator />);
  await expect(component).toContainText("0");
  await expect(component).toContainText("1");
  await expect(component).toContainText("2");
  await expect(component).toContainText("3");
  await expect(component).toContainText("4");
  await expect(component).toContainText("5");
  await expect(component).toContainText("6");
  await expect(component).toContainText("7");
  await expect(component).toContainText("8");
  await expect(component).toContainText("9");
  await expect(component).toContainText("0");
  await expect(component).toContainText("MR");
  await expect(component).toContainText("MC");
  await expect(component).toContainText("M+");
  await expect(component).toContainText("M-");
  await expect(component).toContainText("÷");
  await expect(component).toContainText("×");
  await expect(component).toContainText("-");
  await expect(component).toContainText("+");
  await expect(component).toContainText("=");
  await expect(component).toContainText(".");
});

test("should work when inputing numbers", async ({ mount }) => {
  const component = await mount(<Calculator />);
  await expect(component).toContainText("0");

  await component.getByRole("button", { name: "1" }).click();
  await component.getByRole("button", { name: "2" }).click();
  await component.getByRole("button", { name: "3" }).click();

  await component.getByRole("button", { name: "+", exact: true }).click();

  await component.getByRole("button", { name: "4" }).click();
  await component.getByRole("button", { name: "5" }).click();
  await component.getByRole("button", { name: "6" }).click();

  await component.getByRole("button", { name: "=" }).click();

  await expect(component).toContainText("579");

  await component.getByRole("button", { name: "AC" }).click();
});
