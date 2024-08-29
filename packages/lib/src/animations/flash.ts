import { defineAnimation, Widget } from '@vue-motion/core';


export interface FlashConfig {
  x?: number,
  y?: number,
  lineLength?: number;
  numLines?: number;
  flashRadius?: number;
  lineStrokeWidth?: number;
  color?: string;
  lines?: SVGLineElement[];
}


// 变速曲线
const easeInOutQuad = (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

export const flash = defineAnimation<FlashConfig, Widget & FlashConfig>((context, progress) => {

  const x = context.x ?? 0;
  const y = context.y ?? 0;
  const lineLength = context.lineLength ?? 0.2;
  const numLines = context.numLines ?? 12;
  const flashRadius = context.flashRadius ?? 0;
  const lineStrokeWidth = context.lineStrokeWidth ?? 3;
  const color = context.color ?? 'yellow';

  // Initialization
  if (progress === 0) {
    context.lines = []
    for (let i = 0; i < numLines; i++) {
      const angle = (2 * Math.PI / numLines) * i;
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('x1', "0");
      line.setAttribute('y1', "0");
      line.setAttribute('x2', lineLength.toString());
      line.setAttribute('y2', "0");
      line.setAttribute('stroke', color);
      line.setAttribute('stroke-width', lineStrokeWidth.toString());
      line.setAttribute('transform', ` translate(${x}, ${y}) rotate(${(angle * 180) / Math.PI}, ${0}, ${0}) translate(${flashRadius}, 0)`);
      context.target.element?.appendChild(line);
      context.lines?.push(line);
    }
  }

  const step_1 = 0.7;
  if (progress >= 0 && progress <= step_1) {
    context.lines?.forEach((line) => {
      const scale = easeInOutQuad(progress / step_1);
      line.setAttribute('x2', ((scale * (lineLength + flashRadius))).toString());
      // line.setAttribute('y2', ((flashRadius + scale * lineLength)).toString());
    });
  }
  
  const step_2 = 0.2;
  if (progress > step_2 && progress <= 1) {
    context.lines?.forEach((line) => {
      const scale = easeInOutQuad((progress - step_2) / (1 - step_2));
      line.setAttribute('x1', ((scale * (lineLength + flashRadius))).toString());
      // line.setAttribute('y1', ((flashRadius + scale * lineLength)).toString());
    });
  }

  // Cleanup after animation ends
  if (progress === 1) {
    context.lines?.forEach((line) => {
      line.remove();
    });
  }
});
