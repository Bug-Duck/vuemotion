import { Page } from 'puppeteer'

export async function transformToImage(path: string, page: Page, index = 0) {
  const element = await page.$('#motion')
  await element?.screenshot({ path, type: 'png' })
  console.log('complete transform image!' + ` Image index: ${index}`)
}