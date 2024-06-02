const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('menu_check_values', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('menu_check_values', async function() {
    await driver.get("http://localhost:4200/")
    await driver.manage().window().setRect({ width: 1090, height: 705 })
    await driver.findElement(By.linkText("Menu")).click()
    await driver.sleep(1000)
    assert(await driver.findElement(By.css(".col-sm-6:nth-child(2) p:nth-child(6)")).getText() == "Cena: 7.99")
    assert(await driver.findElement(By.css(".col-sm-6:nth-child(7) .ng-star-inserted:nth-child(4)")).getText() == "Nazwa: Marinara")
  })
})