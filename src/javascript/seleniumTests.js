const {Builder, By, Key, util} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const pathLoginPage="file:///R:/rthomaHDD/Documents/ComS319/VSCworkspace/g47/src/html/index.html";

//Open google and search for Selenium
async function example() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(pathLoginPage);
    await driver.findElement(By.name("first")).sendKeys("Test");
    await driver.findElement(By.name("pass")).sendKeys("319sort");
    await (await driver.findElement(By.name("continue"))).click();
}
example();