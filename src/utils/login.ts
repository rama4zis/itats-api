import { Page } from 'puppeteer';
import { baseUrl } from './baseUrl';
// import fs from 'fs';

const login = async (page: Page, username: string, password: string) => {

    await page.goto(baseUrl);

    await page.type('#inputUsername', username, { delay: 10 });
    await page.type('#inputPassword', password, { delay: 10 });
    await page.keyboard.press('Enter');

}

export default login;