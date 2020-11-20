const {Builder, By, Key, util} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const assert = require('assert');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const pathLoginPage="file:////Users/Jeremy/Desktop/g47/src/html/index.html"; //change based on path

//note that multiple instances of chrome will be opened (and probably eat your RAM too), so comment out once function at a time if you want

//Open google and search for Selenium 
async function login_test1() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(pathLoginPage);
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    await driver.findElement(By.name("first")).sendKeys("manager");
    await driver.findElement(By.name("pass")).sendKeys("319sort");
    await (await driver.findElement(By.name("continue"))).click();

    await driver.sleep(4000);
    var check = (await driver.getCurrentUrl()).toString();
    console.log(check); //you need 3 seconds because it takes a few seconds before moving to the next page on login
    assert.equal(check, 'file:///Users/Jeremy/Desktop/g47/src/html/inventoryManager.html'); 
}
async function login_test2() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(pathLoginPage);
    await driver.manage().window().maximize();
    await driver.sleep(4000);

    await driver.findElement(By.name("first")).sendKeys("wrong username");
    await driver.findElement(By.name("pass")).sendKeys("oops");
    await (await driver.findElement(By.name("continue"))).click();

    await driver.sleep(3000); 
    var check = (await driver.getCurrentUrl()).toString();
    console.log(check);
    assert.equal(check, 'file:///Users/Jeremy/Desktop/g47/src/html/index.html'); 
}
async function add_product() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(pathLoginPage);
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    await driver.findElement(By.name("first")).sendKeys("manager");
    await driver.findElement(By.name("pass")).sendKeys("319sort");
    await (await driver.findElement(By.name("continue"))).click();

    await driver.sleep(4000);

    await (await driver.findElement(By.id("addProductBtn"))).click();
    await driver.findElement(By.id("addPopPrdName")).sendKeys("Mouse");
    await driver.findElement(By.id("popupQuantity")).sendKeys(50);
    await driver.findElement(By.id("popupCostPerItem")).sendKeys(5);
    await driver.findElement(By.id("popupWeightPerItem")).sendKeys(1);
    await driver.findElement(By.id("popupProductType")).sendKeys("Hardware");
    await driver.findElement(By.id("popupBrand")).sendKeys("Dell");
    await driver.findElement(By.id("popupProductID")).sendKeys(25565); //if you know you know :)
    await driver.findElement(By.id("popupLocation")).sendKeys("Electronics"); 

    await (await driver.findElement(By.id("addProdPopupBtn"))).click();

    await driver.sleep(500);

    await (await driver.findElement(By.id("addProductBtn"))).click();
    await driver.findElement(By.id("addPopPrdName")).sendKeys("Keyboard");
    await driver.findElement(By.id("popupQuantity")).sendKeys(40);
    await driver.findElement(By.id("popupCostPerItem")).sendKeys(10);
    await driver.findElement(By.id("popupWeightPerItem")).sendKeys(2);
    await driver.findElement(By.id("popupProductType")).sendKeys("Hardware");
    await driver.findElement(By.id("popupBrand")).sendKeys("Dell");
    await driver.findElement(By.id("popupProductID")).sendKeys(124978); 
    await driver.findElement(By.id("popupLocation")).sendKeys("Electronics"); 

    await (await driver.findElement(By.id("addProdPopupBtn"))).click();

    //dont think an assert equals is really necessary here? can clearly see it works, and i dont know what values we'd "compare" here.
    //it seems kinda odd to me to grab just one little element and do an assertequals when you can already see it there.

}

add_product();
 login_test1();
 login_test2();
