import { Page, TestInfo } from "@playwright/test";

const baseScreenshotPath = "./__screenshots__";

const imageNameFromURL = (url: URL) => {
  const modpath = url.pathname.replace(/\//g, "_");
  const modpath2 = modpath.startsWith("_") ? modpath.replace("_", "") : modpath;
  return modpath2.endsWith("_") ? modpath2.slice(0, -1) : modpath2;
};

export const captureScreen = async (props: {
  page: Page;
  testInfo: TestInfo;
  // For usecase, URL is the same but UI change
  inceptPath?: string;
  fullPage?: boolean;
}) => {
  if (props.testInfo.project.name !== "MobileChrome") {
    return;
  }
  const url = new URL(props.page.url());
  const path = props.inceptPath
    ? `${baseScreenshotPath}/${imageNameFromURL(url)}.${props.inceptPath!}.png`
    : `${baseScreenshotPath}/${imageNameFromURL(url)}.png`;
  await props.page.screenshot({
    fullPage: props.fullPage ?? true,
    animations: "disabled",
    path: path,
  });
};
