import { defineAnimation } from "../animation";

export function delay(delay: number) {
  return defineAnimation(async input => {
    await new Promise((resolve, reject) => {
      const anime = input.tag.animate([], {
        duration: delay * 1000
      })
      anime.addEventListener('finish', () => {
        resolve(null)
      })
    })
  })
}