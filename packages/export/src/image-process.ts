import { Page } from 'puppeteer'

export async function transformToImage(path: string, page: Page) {
  const element = await page.$('#motion')
  await element?.screenshot({ path, type: 'png' })
  console.log('complete transform image!')
}