// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('register_with_too_short_password', function() {
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
  it('register_with_too_short_password', async function() {
    await driver.get("http://localhost:4200/zarejestruj/")
    await driver.manage().window().setRect({ width: 989, height: 666 })
    await driver.findElement(By.id("exampleInputEmail1")).sendKeys("alamakota@ala.com")
    await driver.findElement(By.id("exampleInputPassword1")).sendKeys("ala")
    await driver.findElement(By.css(".btn")).click()
    await driver.wait(until.elementLocated(By.css("p:nth-child(1)")), 3000)
    await driver.sleep(1000)
    assert(await driver.findElement(By.css("p:nth-child(1)")).getText() == "Hasło musi zawierać co najmniej 6 liter.")
  })
})