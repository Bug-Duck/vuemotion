import { WebviewOptions } from "@vuemotion/vue-lib";

export interface MDocumentOptions extends WebviewOptions {
  h1: HTMLHeadingElement['style']
  h2: HTMLHeadingElement['style']
  h3: HTMLHeadingElement['style']
  h4: HTMLHeadingElement['style']
  h5: HTMLHeadingElement['style']
  h6: HTMLHeadingElement['style']
  link: HTMLLinkElement['style']
  text: HTMLSpanElement['style']
}