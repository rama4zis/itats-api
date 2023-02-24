import { Request, Response, NextFunction } from "express";
import { Browser } from "puppeteer";

const puppeteer = require('puppeteer');

const baseUrl = 'https://sim.itats.ac.id/krs/'

class User {

    async getUser (req: Request, res: Response, next: NextFunction) {

        const username: any = process.env.USERNAME;
        const password: any = process.env.PASSWORD;
        
        const browser: Browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.goto(baseUrl);
        await page.type('#inputUsername', username);
        await page.type('#inputPassword', password);
        await page.click('#login');

        console.log('Login Success');
        
        await page.waitForTimeout(10000);

        await browser.close();
    }

}

export default User;