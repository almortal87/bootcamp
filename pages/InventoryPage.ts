import { Page, expect } from '@playwright/test';

export class InventoryPage{
    private page: Page;

    constructor (page: Page){
        this.page = page;
    }

    async isInventoryPageVisible(){

        //verify the url contains '/inventory'
        await expect(this.page).toHaveURL(/.*\/inventory/);

        //verify the shopping cart link is visible
        await expect.soft(this.page.locator('.shopping_cart_link')).toBeVisible();

        //await at least one inventory item is visible
        await expect.soft(this.page.locator('.inventory_item').first()).toBeVisible();
    }

}