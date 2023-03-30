import { test, expect } from "@playwright/experimental-ct-react";
import ImageCard from "./ImageCard";
import HorizontalImageCard from "./HorinzontalImageCard";

test.describe("ImageCard", () => {
  test("should render ImageCard", async ({ mount }) => {
    const component = await mount(<ImageCard />);
    await expect(component).toContainText("Card title");
    await component.screenshot({ path: "directory_contains_actual_images/ImageCard.png" });
  });

  test("should render HorizontalImageCard", async ({ mount }) => {
    const component = await mount(<HorizontalImageCard />);
    await expect(component).toContainText("Card title");
    await component.screenshot({
      path: "directory_contains_actual_images/HorizontalImageCard.png",
    });
  });
});
