import { Browser } from 'puppeteer';
const puppeteer = require('puppeteer');
import login from '../src/utils/login';

// const baseUrl = 'https://sim.itats.ac.id/krs/';

(async () => {

    // const username = "13.2017.1.00612";
    // const password = "1999-10-01";

    const browser: Browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    // await page.goto(baseUrl);

    // await page.type('#inputUsername', username, { delay: 100 });
    // await page.type('#inputPassword', password, { delay: 100 });
    // await page.keyboard.press('Enter');

    await login(page);

    // Open Profile
    await page.waitForSelector('.toolbar > a[href="/krs/akademik/ta"');
    await page.click('.toolbar > a[href="/krs/akademik/ta"');

    // get Data 
    const userData = await page.evaluate(() => {

        const name = document.querySelector('#content > aside > div.bg-light.padder.padder-v > span.h4')?.textContent;
        const nim = document.querySelector('#content > aside > div.bg-light.padder.padder-v > span.block.m-t-mini')?.textContent;
        const nik = document.querySelector('#events > div.panel-body > form > div:nth-child(6) > div')?.textContent;
        const birth = document.querySelector('#events > div.panel-body > form > div:nth-child(7) > div')?.textContent;
        const gender = document.querySelector('#events > div.panel-body > form > div:nth-child(8) > div')?.textContent;
        const religion = document.querySelector('#events > div.panel-body > form > div:nth-child(9) > div')?.textContent;
        const motherName = document.querySelector('#events > div.panel-body > form > div:nth-child(10) > div')?.textContent;

        const address = {
            jalan: document.querySelector('#events > div.panel-body > form > div:nth-child(11) > div > div:nth-child(1) > div > div')?.textContent,
            rt: document.querySelector('#events > div.panel-body > form > div:nth-child(11) > div > div:nth-child(2) > div > div > div > div:nth-child(3)')?.textContent,
            rw: document.querySelector('#events > div.panel-body > form > div:nth-child(11) > div > div:nth-child(2) > div > div > div > div:nth-child(5)')?.textContent,
            kelurahan: document.querySelector('#events > div.panel-body > form > div:nth-child(11) > div > div:nth-child(3) > div > div')?.textContent,
            kecamatan: document.querySelector('#events > div.panel-body > form > div:nth-child(11) > div > div:nth-child(4) > div > div')?.textContent,
        }

        const phone = document.querySelector('#events > div.panel-body > form > div:nth-child(13) > div > input')?.getAttribute('value');
        const email = document.querySelector('#events > div.panel-body > form > div:nth-child(14) > div > input')?.getAttribute('value');

        const dosenWali = {
            name: document.querySelector('#events > div.panel-body > form > div:nth-child(2) > div')?.textContent,
            nip: document.querySelector('#events > div.panel-body > form > div:nth-child(3) > div')?.textContent,
            phone: document.querySelector('#events > div.panel-body > form > div:nth-child(4) > div > a.btn.btn-xs.btn-circle.btn-success')?.getAttribute('href')
        }

        // filter "\n" and return new value
        const filterEnter = (value: any) => {
            return value.replace(/\n/g, '');
        }

        return {
            name,
            nim,
            nik: filterEnter(nik),
            birth: filterEnter(birth),
            gender: filterEnter(gender),
            religion: filterEnter(religion),
            motherName: filterEnter(motherName),
            address: {
                jalan: address.jalan,
                rt: address.rt,
                rw: address.rw,
                kelurahan: address.kelurahan,
                kecamatan: filterEnter(address.kecamatan)
            },
            phone,
            email,
            dosenWali: {
                name: filterEnter(dosenWali.name),
                nip: filterEnter(dosenWali.nip),
                phone: dosenWali.phone
            }
        }
    });

    await browser.close();
})();