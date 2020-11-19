const {Builder, By, Key, util} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

//Open google and search for Selenium
async function example() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get("http://google.com");
    await driver.findElement(By.name("q")).sendKeys("Selenium",Key.RETURN);
}
example();