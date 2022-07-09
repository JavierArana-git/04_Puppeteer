/*
 * INICIA SESIÓN EN TWITTER
 *
 *
 */

const puppeteer = require("puppeteer");
const prompt = require("prompt-sync")();
const urlLogin = "https://twitter.com/i/flow/login";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 10,
    executablePath:"/usr/bin/google-chrome",
  });
  const page = await browser.newPage();
  console.log("\n***************************** INICIO  TEST *****************************");
  await page.goto(urlLogin);

})();
