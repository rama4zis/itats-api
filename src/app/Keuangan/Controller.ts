import { Request, Response, NextFunction } from "express";
import puppeteer, { Browser } from "puppeteer";
import login from "../../utils/login";

class Keuangan {

    async getTagihan(req: Request, res: Response, next: NextFunction): Promise<void> {

        const browser: Browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });

        const page = await browser.newPage();

        const username = req.body.username;
        const password = req.body.password;

        await login(page, username, password);

        // open tagihan page
        await page.waitForSelector('.toolbar > a[href="/krs/mahasiswa/keuangan"');
        await page.click('.toolbar > a[href="/krs/mahasiswa/keuangan"');

        await page.waitForSelector('#content');

        const spp = await page.$eval("#content > section > div.col-lg-4 > section > table > tbody > tr:nth-child(1) > td:nth-child(1) > ul > li:nth-child(1)", (el) => el?.innerHTML?.split("<br>").pop()?.trim()).catch(() => "Tidak ada tunggakan");
        const denda = await page.$eval("#content > section > div.col-lg-4 > section > table > tbody > tr:nth-child(1) > td:nth-child(1) > ul > li:nth-child(2)", (el) => el?.innerHTML?.split("<br>").pop()?.trim()).catch(() => "Tidak ada denda");

        // get tagihan data
        const tagihanData = {
            lunas: await page.$eval("#content > section > div.col-lg-4 > div:nth-child(2) > div:nth-child(1) > section > div > h5 > strong", (el) => el?.innerText),
            tunggakan: await page.$eval("#content > section > div.col-lg-4 > div:nth-child(2) > div:nth-child(2) > section > div > h5 > strong", (el) => el?.innerText),
            keterangan: {
                spp: spp,
                denda: denda
            }
        }

        await browser.close();

        try {
            res.status(200).json(tagihanData);
        } catch (error) {
            next (error);
        }


    }

}

export default Keuangan;