/*
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});
*/

import { test, expect } from '@playwright/test';

test('Login with first accepted username on saucedemo.com', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // 1️⃣ Extract usernames (robustly)
  const usernameList = await page.evaluate(() => {
    const container = document.querySelector('.login_credentials');
    if (!container) return [];

    // Use innerText for human-readable newlines
    const lines = (container as HTMLElement).innerText
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean);

    // Remove the header
    if (lines[0].toLowerCase().startsWith('accepted usernames')) {
      lines.shift();
    }

    return lines;
  });

  console.log('Usernames found:', usernameList);

  if (!usernameList.length) throw new Error('No usernames found!');

  // ✅ Prefer standard_user if present
  let username: string | undefined = usernameList.find(u => u === 'standard_user');
  if (!username) username = usernameList[0];

  console.log('Selected username:', username);

  // 2️⃣ Extract the password
  const passwordText = await page.locator('.login_password').textContent();
  if (!passwordText) throw new Error('No password hint found.');

  const password = passwordText
    .replace('Password for all users:', '')
    .trim();

  console.log('Password found:', password);

  if (!username || !password) {
    throw new Error('Could not extract username or password from the page.');
  }

  // 3️⃣ Login
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();

  // ✅ Verify login
  await expect(page).toHaveURL(/inventory/);
  console.log(`✅ Login successful with ${username}/${password}`);
});
