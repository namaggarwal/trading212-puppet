import puppeteer, { Browser } from 'puppeteer';

class Trading212 {
  username: string
  password: string

  constructor(username:string, password: string) {
    this.username = username
    this.password = password
  }

  openBrowser = async () => {
    return await puppeteer.launch({ headless: false });
  }

  openLoginPage = async (browser: Browser) => {
    const page = await browser.newPage();
    await page.goto("https://www.trading212.com/en/login", {
      waitUntil: 'networkidle2',
    });
    return page
  }

  doLogin = async (page: puppeteer.Page, username: string, password: string) => {
    await page.click("#username-real");
    await page.keyboard.type(username);

    await page.click("#pass-real");
    await page.keyboard.type(password);

    await Promise.all([
      page.click(".button-login"),
      page.waitForNavigation({waitUntil: 'networkidle0'})
    ]);
  }

  searchForStock = async (page: puppeteer.Page, ticker: string) => {
    await page.click(".search-icon");
    await page.waitForSelector("input.search-input", {visible: true});
    await page.click("input.search-input");
    await page.keyboard.type(ticker);
    await page.waitForResponse("https://live.trading212.com/charting/prices");
    await page.click(".search-results-instrument");
    await page.waitForSelector(".invest-instrument-advanced", {visible: true});
  }

  buyStock = async (page: puppeteer.Page, quantity: string) => {
    await page.click(".trading-button")
    await page.waitForSelector(".order-dialog", {visible: true});
    await page.click(".formatted-number-input input");
    await page.keyboard.type(quantity);
    await page.click(".order-dialog .accent-button");
    await page.waitForSelector(".review-order", {visible: true});
  }

  trade = async ({}) => {
    const browser = await this.openBrowser();
    const page = await this.openLoginPage(browser);
    await this.doLogin(page, this.username, this.password);
    await this.searchForStock(page, "TSLA");
    await this.buyStock(page, ".1");
    await browser.close();
  }
}

export const TradeType = {
  BUY: 1,
  SELL: 2
}

export default Trading212;