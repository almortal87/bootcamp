import { Page, expect } from '@playwright/test';

export class LoginPage{
    login(arg0: string, arg1: string) {
        throw new Error('Method not implemented.');
    }
    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com')
        async function PositiveLogin(page, username: string, password: string){
   await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();
  
    }
}
};