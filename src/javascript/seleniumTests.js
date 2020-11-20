const {Builder, By, Key, util} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const assert = require('assert');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const pathLoginPage="file:////Users/Jeremy/Desktop/g47/src/html/index.html";

//Open google and search for Selenium
async function example() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(pathLoginPage);
    await driver.manage().window().maximize();
    await driver.sleep(1000);


    await driver.findElement(By.name("first")).sendKeys("manager");
    await driver.findElement(By.name("pass")).sendKeys("319sort");
    await (await driver.findElement(By.name("continue"))).click();


    await driver.sleep(3000);
    var check = (await driver.getCurrentUrl()).toString();
    console.log(check);
    assert.equal(check, 'file:///Users/Jeremy/Desktop/g47/src/html/inventoryManager.html'); 


}
example();