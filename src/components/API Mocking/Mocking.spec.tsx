import { test, expect } from "@playwright/experimental-ct-react";

test.describe("should call APIs and receive responses", () => {
  test("request countries by language with keyword german", async ({ request, baseURL }) => {
    const keyword = "german";
    const response = await request.get(`${baseURL}/lang/${keyword}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  });

  test("request countries by capital with keyword berlin", async ({ request, baseURL }) => {
    const keyword = "berlin";
    const response = await request.get(`${baseURL}/capital/${keyword}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  });

  test("request countries by currency with keyword dollar", async ({ request, baseURL }) => {
    const keyword = "dollar";
    const response = await request.get(`${baseURL}/currency/${keyword}`);
    expect(response.status()).toBe(200);
    expect(response.ok()).toBeTruthy();
  });
});

test.describe("should call APIs and fail because no results found", () => {
  test("request countries by language with keyword germannnnnnnnnnnnn", async ({
    request,
    baseURL,
  }) => {
    const keyword = "germannnnnnnnnnnnn";
    const response = await request.get(`${baseURL}/lang/${keyword}`);
    expect(response.status()).toBe(404);
  });

  test("request countries by capital with keyword berlinnnnnnnn", async ({ request, baseURL }) => {
    const keyword = "berlinnnnnnnn";
    const response = await request.get(`${baseURL}/capital/${keyword}`);
    expect(response.status()).toBe(404);
  });

  test("request countries by currency with keyword dollarrrrrrrrr", async ({
    request,
    baseURL,
  }) => {
    const keyword = "dollarrrrrrrrr";
    const response = await request.get(`${baseURL}/currency/${keyword}`);
    expect(response.status()).toBe(404);
  });
});
