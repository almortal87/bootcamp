/*
import { test, expect } from '@playwright/test';

async function navigateToLoginPage(page) {
    await page.goto('https://www.saucedemo.com/'
        );

async function PositiveLogin(page, username: string, password: string){
   await page.locator('Username').fill('standard_user', {timeout: 80000});
    await page.locator('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

}

test('Login with various assertion type', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/', {timeout: 80000});

   
    await navigateToLoginPage(page);
    await PositiveLogin(page, 'standard_user', 'secret_sauce' );
    // 1. auto retry assertion
    await expect(page.getByRole('button', {name: 'Login'})).toBeVisible();
    
    // fill credentials
    await page.locator('Username').fill('standard_user', {timeout: 80000});
    await page.locator('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    //2. auto retry assertion: URL should contain 'inventory'

    await expect(page).toHaveURL(/inventory/);

    //3. non-retry assertion: check page title inmediately after navigation
    const title = await page.title();
    expect(title).toBe('Swag Labs');

    //4. soft assertion: check the presence of the shopping cart icon
    await expect.soft(page.locator('.shopping_cart_link')).toBeVisible();

    //5. soft assertion: check the first product visible
    await expect.soft(page.locator('.inventory_item').first()).toBeVisible();


});

*/


import { test, expect } from '@playwright/test';
import { LoginPage} from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';



test ('Login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);

    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.isInventoryPageVisible();


});
