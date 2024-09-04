import { ElementFor, ElementHandle } from 'puppeteer'

export async function transformToImage(path: string, element: ElementHandle<ElementFor<'svg'>>, index = 0) {
  await element?.screenshot({ path, type: 'jpeg' })
  console.log('complete transform image!' + ` Image index: ${index}`)
}