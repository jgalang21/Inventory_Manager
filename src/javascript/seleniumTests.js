const {Builder, By, Key, util} = require("selenium-webdriver");
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');
const assert = require('assert');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const pathLoginPage="file:///R:/rthomaHDD/Documents/ComS319/VSCworkspace/g47/src/html/index.html"; //change based on path

//note that multiple instances of chrome will be opened (and probably eat your RAM too), so comment out once function at a time if you want

//Open google and search for Selenium 

//should pass because its the right login
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
    try {
        assert.equal(check, 'file:///R:/rthomaHDD/Documents/ComS319/VSCworkspace/g47/src/html/inventoryManager.html'); 
        console.log("\n\nLogin successful!\n\n");
    } catch(error) {
        console.log("\n\nError: ", error);
    }
    
}

//this test should not login since we have the wrong login, checks the right page we're on
async function login_test2() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(pathLoginPage);
    await driver.manage().window().maximize();
    await driver.sleep(4000);

    await driver.findElement(By.name("first")).sendKeys("wrong username");
    await driver.findElement(By.name("pass")).sendKeys("oops");
    await (await driver.findElement(By.name("continue"))).click();
    await (await driver.switchTo().alert()).accept();

    await driver.sleep(3000); 
    var check = (await driver.getCurrentUrl()).toString();
    console.log(check);
    try {
        assert.equal(check, 'file:///R:/rthomaHDD/Documents/ComS319/VSCworkspace/g47/src/html/inventoryManager.html'); 
        console.log("\n\nLogin successful!\n\n");
    } catch(error) {
        console.log("\n\nError: ", error);
    }
}

//add a product to the database
async function add_product() {
    let driver = await new Builder().forBrowser("chrome").build();
    await driver.get(pathLoginPage);
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    await driver.findElement(By.name("first")).sendKeys("manager");
    await driver.findElement(By.name("pass")).sendKeys("319sort");
    await (await driver.findElement(By.name("continue"))).click();

    await driver.sleep(4000);

    await (await driver.findElement(By.id("addProductBtn"))).click(); //click on the add products button (notice the "By.id" part)
    await driver.findElement(By.id("addPopPrdName")).sendKeys("Mouse"); //you base it off the naming conventions of the html fields here
    await driver.findElement(By.id("popupQuantity")).sendKeys(50);
    await driver.findElement(By.id("popupCostPerItem")).sendKeys(5); //be sure to specify integers vs strings and stuff here
    await driver.findElement(By.id("popupWeightPerItem")).sendKeys(1);
    await driver.findElement(By.id("popupProductType")).sendKeys("Hardware");
    await driver.findElement(By.id("popupBrand")).sendKeys("Dell");
    await driver.findElement(By.id("popupProductID")).sendKeys(25565); //if you know you know :)
    await driver.findElement(By.id("popupLocation")).sendKeys("Electronics"); 

    await (await driver.findElement(By.id("addProdPopupBtn"))).click(); //add the product

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
    //it seems kinda odd to me to grab just one little element and do an assert equals when you can already see it there.
}

//remove a product from the database (use after the adding test)
async function remove_product() {
    let driver = await new Builder().forBrowser("chrome").build();
    //open app and login
    await driver.get(pathLoginPage);
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    await driver.findElement(By.name("first")).sendKeys("manager");
    await driver.findElement(By.name("pass")).sendKeys("319sort");
    await (await driver.findElement(By.name("continue"))).click();

    await driver.sleep(4000);

    //Try to remove keys -> fail
    await (await driver.findElement(By.id("removeProductBtn"))).click();
    await driver.findElement(By.id("rmvPopPrdName")).sendKeys("keys");
    await (await driver.findElement(By.id("rmvProdPopupBtn"))).click();

    await driver.sleep(500);
    await (await driver.switchTo().alert()).accept();
    //await driver.switchTo().window();
    await driver.sleep(1000);

    //Try to remove Keyboard -> success
    await (await driver.findElement(By.id("rmvPopPrdName"))).clear();
    await driver.sleep(500);
    await driver.findElement(By.id("rmvPopPrdName")).sendKeys("Keyboard");
    await (await driver.findElement(By.id("rmvProdPopupBtn"))).click();

    await (await driver.findElement(By.id("removeProductBtn"))).click();
    await driver.findElement(By.id("rmvPopPrdName")).sendKeys("Mouse");
    await (await driver.findElement(By.id("rmvProdPopupBtn"))).click();
}

//Go to warehouse and place an order
async function place_order() {
    let driver = await new Builder().forBrowser("chrome").build();
    //open app and login
    await driver.get(pathLoginPage);
    await driver.manage().window().maximize();
    await driver.sleep(1000);

    await driver.findElement(By.name("first")).sendKeys("manager");
    await driver.findElement(By.name("pass")).sendKeys("319sort");
    await (await driver.findElement(By.name("continue"))).click();

    await driver.sleep(4000);

    //Go to warehouse
    await (await driver.findElement(By.id('sideNavSpan'))).click();
    await driver.sleep(1000);
    await (await driver.findElement(By.id("warehouseNav"))).click();

    //Place order
    await (await driver.findElement(By.id("placeOrderFunction"))).click();
    await driver.findElement(By.id("popPrdName")).sendKeys("Monitor");
    await driver.findElement(By.id("popQuant")).sendKeys(2);
    await driver.findElement(By.id("popFirst")).sendKeys("Riley");
    await driver.findElement(By.id("popLast")).sendKeys("Thoma");
    await driver.findElement(By.id("popEmail")).sendKeys("fakeEmail@mail.com");
    await driver.findElement(By.id("popPhone")).sendKeys(1234561010);
    await driver.findElement(By.id("popComments")).sendKeys("This is a test");
    await driver.sleep(2000);
    await (await driver.findElement(By.id("placeOrderBtn"))).click();

    await driver.sleep(1000);

    //View order
    await (await driver.findElement(By.id("viewOrderFunction"))).click();
}

login_test1();
//login_test2();
//add_product();
//remove_product();
//place_order();
