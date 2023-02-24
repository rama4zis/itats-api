import { Browser } from 'puppeteer';
const puppeteer = require('puppeteer');
const fs = require('fs').promises;

const baseUrl = 'https://sim.itats.ac.id/krs/akademik/ta';

async function getUser () {

    const browser: Browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    const cookiesString = await fs.readFile('./cookies.json', 'utf8');
    const cookies = JSON.parse(cookiesString);
    
    await page.setCookie(...cookies);
    
    await page.goto(baseUrl);

    console.log('goto: ' + baseUrl);
    
    await page.waitForTimeout(5000);

    await browser.close();
}

// running getUser function
getUser();