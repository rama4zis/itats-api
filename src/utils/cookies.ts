import { Browser } from 'puppeteer';
const puppeteer = require('puppeteer');
import fs from 'fs';

const baseUrl = 'https://sim.itats.ac.id/krs/';

async function cookies () {

    const username = "13.2017.1.00612";
    const password = "1999-10-01";
    
    const browser: Browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(baseUrl);
    await page.type('#inputUsername', username);
    await page.type('#inputPassword', password);
    await page.keyboard.press('Enter');

    console.log('Login Success');

    const cookies = await page.cookies();
    // save cookies to file to be used in other profile pages
    fs.writeFile('cookies.json', JSON.stringify(cookies, null, 2), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

    await browser.close();
}

// running getUser function
cookies();