import { Browser } from 'puppeteer';
const puppeteer = require('puppeteer');
import login from '../../utils/login';
import { Request, Response, NextFunction } from 'express';

class User {
    async getUser(req: Request, res: Response, next: NextFunction): Promise<void> {


        const browser: Browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            // headless: false
        });
        const page = await browser.newPage();

        const username = req.body.username;
        const password = req.body.password;

        await login(page, username, password);

        // Open Profile
        await page.waitForSelector('.toolbar > a[href="/krs/akademik/ta"');
        await page.click('.toolbar > a[href="/krs/akademik/ta"');

        // get Data 
        const userData = await page.evaluate(() => {

            const name = document.querySelector('#content > aside > div.bg-light.padder.padder-v > span.h4')?.textContent;
            const nim = document.querySelector('#content > aside > div.bg-light.padder.padder-v > span.block.m-t-mini')?.textContent;
            const nik = document.querySelector('#events > div.panel-body > form > div:nth-child(6) > div')?.textContent;
            const ipk = document.querySelector('#content > aside > div.bg-light.padder.padder-v > button > span.text')?.textContent;
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

            // replace "IPK" and any space, replace "," with "." and return new value as float
            const filterIpk = (value: any) => {
                return parseFloat(value.replace('IPK', '').replace(/\s/g, '').replace(',', '.'));
            }

            // Filter whatsapp link and return phone number
            const filterWhatsapp = (value: any) => {
                return value.replace('https://wa.me/', '');
            }

            return {
                name,
                nim,
                ipk: filterIpk(ipk),
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
                    phone: filterWhatsapp(dosenWali.phone)
                }
            }
        });
        await browser.close();

        try {
            res.status(200).json(userData);
        } catch (error) {
            next(error);
        }
    }
}

export default User;