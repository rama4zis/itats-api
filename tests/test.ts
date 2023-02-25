import { Browser } from 'puppeteer';
const puppeteer = require('puppeteer');
import login from '../src/utils/login';

(async () => {

    const username = "13.2017.1.00612";
    const password = "1999-10-01";

    const browser: Browser = await puppeteer.launch({
        // args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: false
    });
    const page = await browser.newPage();

    await login(page, username, password);

    // Open Riwayat Study
    await page.waitForSelector('.toolbar > a[href="/krs/nilai/riwayat"');
    await page.click('.toolbar > a[href="/krs/nilai/riwayat"');

    // get Data
    const riwayatStudy = await page.evaluate(() => {
        // got all tbody as array
        const table = Array.from( document.querySelectorAll('td') );
        const data = table.map( (item: any) => {
            
        }

    });

    console.log(riwayatStudy);
})();