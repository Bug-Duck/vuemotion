import { BaseAnimation, defineAttributesAnimation } from "../animation";

export function create(options: BaseAnimation) {
  return defineAttributesAnimation(context => {
    return {
      ...options,
      ...context,
      target: context.widget,
      key: 'progress'
    }
  })
}