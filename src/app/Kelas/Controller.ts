import { Request, Response, NextFunction } from "express";
import login from "../../utils/login";
import { Browser } from "puppeteer";
const puppeteer = require("puppeteer");

class Kelas {

    async getKelas(req: Request, res: Response, next: NextFunction): Promise<void> {

        const browser: Browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        const username = req.body.username;
        const password = req.body.password;

        await login(page, username, password);

        // open kelas page
        await page.waitForSelector('.toolbar > a[href="/krs/kelastawar/read"');
        await page.click('.toolbar > a[href="/krs/kelastawar/read"');

        await page.waitForSelector('table');

        // get kelas data
        const kelasData = await page.evaluate(() => {

            let tabelKelas = Array.from(document.querySelectorAll('#content > section > div.row > div > section > div > table > tbody > tr')); // Kelas 
            // if th dos'nt have total 6 child, then delete it
            if (tabelKelas[0].querySelectorAll('th').length !== 6) {
                tabelKelas.shift();
            }

            const dataKelas = tabelKelas.map((item: any) => ({
                index: item.querySelector('td:nth-child(1)')?.innerText,
                mataKuliah: item.querySelector('td:nth-child(2)')?.innerText,
                kelas: item.querySelector('td:nth-child(3)')?.innerText,
                jadwal: item.querySelector('td:nth-child(4) > strong')?.innerText,
                dosen: item.querySelector('td:nth-child(4) > small')?.innerText,
                kapasitas: item.querySelector('td:nth-child(5)')?.innerText,
                semester: item.querySelector('td:nth-child(6)')?.innerText,
            }));

            return {
                kelas: dataKelas,
            }

        });

        await browser.close();

        try {
            res.status(200).json(kelasData);
        } catch (error) {
            next (error);
        }

    }

    async getMyKelas(req: Request, res: Response, next: NextFunction): Promise<void> {
        const browser: Browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        const username = req.body.username;
        const password = req.body.password;

        await login(page, username, password);

        try {
            res.status(200).json({message: "getMyKelas"});
        } catch (error) {
            next (error);
        }
    }

}

export default Kelas;