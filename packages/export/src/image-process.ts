import { Page } from 'puppeteer'

export async function transformToImage(path: string, page: Page, index = 0) {
  page.click('#motion')
  const element = await page.waitForSelector('#motion')
  await element?.screenshot({ path, type: 'jpeg' })
  console.log('complete transform image!' + ` Image index: ${index}`)
}