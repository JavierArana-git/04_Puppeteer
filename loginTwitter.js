/*
 * VERIFICACIÓN DE SEGURIDAD DE TWITTER ANTE UN ATAQUE
 *              DE FUERZA CONTRA EL LOGIN
 * Se accede a la pantalla de login.
 * Se introduce usuario y contraseña.
 * Se verifica que da error y se repite el proceso hasta el bloqueo.
 */

const puppeteer = require("puppeteer");
const prompt = require("prompt-sync")();
const urlLogin = "https://twitter.com/i/flow/login";
const user = "ejemplo@gmail.com";
const password = "123456";

(async () => {
  const browser = await puppeteer.launch({
    args : [
      '--window-size=1920,1080',
    ],
    headless: false,
    slowMo: 10,
    executablePath: "/usr/bin/google-chrome",
  });
  const page = await browser.newPage();
  await page.setViewport({
    //Definir resolución de pantalla
    width: 1920,
    height: 1080,
    deviceScaleFactor: 1,
  });
  console.log("\n***************************** INICIO  TEST *****************************");
  await page.goto(urlLogin);
  await writeInput("#layers > div:nth-child(2) > div > div > div > div > div > div.css-1dbjc4n.r-1awozwy.r-18u37iz.r-1pi2tsx.r-1777fci.r-1xcajam.r-ipm5af.r-g6jmlv > div.css-1dbjc4n.r-1867qdf.r-1wbh5a2.r-kwpbio.r-rsyp9y.r-1pjcn9w.r-1279nm1.r-htvplk.r-1udh08x > div > div > div.css-1dbjc4n.r-14lw9ot.r-6koalj.r-16y2uox.r-1wbh5a2 > div.css-1dbjc4n.r-16y2uox.r-1wbh5a2.r-1jgb5lz.r-1ye8kvj.r-13qz1uu > div > div > div > div.css-1dbjc4n.r-mk0yit.r-1f1sjgu.r-13qz1uu > label > div > div.css-1dbjc4n.r-18u37iz.r-16y2uox.r-1wbh5a2.r-1wzrnnt.r-1udh08x.r-xd6kpl.r-1pn2ns4.r-ttdzmv > div > input",user,page,"",user,"Texto Usuario");

})();
async function writeInput(selector, valueToWrite, page, checkLastValue, checkNewValue, alias="") {
  try {
    element = await page.waitForSelector(selector, {
      timeout: 1500,
    });
    const lastValue = await page.$eval(selector, (input) => {
      return input.value;
    });
    if (valueToWrite == "Backspace") {
      await page.keyboard.down("Control");
      await page.keyboard.press("A");
      await page.keyboard.up("Control");
      await page.keyboard.press("Backspace");
    } else {
      await page.type(selector, valueToWrite);
    }
    const writtenValue = await page.$eval(selector, (input) => {
      return input.value;
    });
    //Result Report
    if (alias){
      msg = `Cambio de valor en "${alias}": "${lastValue}" -> "${writtenValue}"`;
    }else{
      msg = `Cambio de valor en "${selector}": "${lastValue}" -> "${writtenValue}"`;
    }
    //Check written value
    if (lastValue === checkLastValue && writtenValue == checkNewValue) {
      msgLog(msg, true);
    } else {
      msgLog(msg, false);
    }
  } catch (err) {
    if (alias){
      msg = `Selector "${alias}" no encontrado`;
    }else{
      msg = `Selector "${selector}" no encontrado`;
    }
    msgLog(msg, false);
  }
}
