import { Figure, FigureOptions } from "./figure"

export interface ArcOptions extends FigureOptions {
  radius: number;
  from: number;
  to: number;
}

export class Arc extends Figure {
  radius: number
  from: number
  to: number
  path: SVGPathElement
  pathData: string

  constructor(options: ArcOptions) {
    super(options);
    this.radius = options.radius;
    this.from = options.from;
    this.to = options.to;
  }

  private polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number): { x: number; y: number } {
    const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  }

  private describeArc(centerX: number, centerY: number, radius: number, startAngle: number, endAngle: number): string {
    const start = this.polarToCartesian(centerX, centerY, radius, endAngle);
    const end = this.polarToCartesian(centerX, centerY, radius, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
  }

  render(): SVGElement {
    const root = super.render()
    this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.pathData = this.describeArc(-this.radius, -this.radius, this.radius, this.from, this.to * this.progress)
    this.path.setAttribute("d", this.pathData);
    this.path.id = 'graph'
    if (this.fill) {
      this.path.setAttribute('fill', this.fillColor);
    }
    if (this.border) {
      this.path.setAttribute('stroke', this.borderColor);
      this.path.setAttribute('stroke-width', this.borderWidth.toString())
    }

    root.appendChild(this.path);

    return root
  }

  watch(key: string, newValue: unknown): void {
    if (key === 'progress') {
      console.log(this.progress)
      this.path.setAttribute("d", this.describeArc(-this.radius, -this.radius, this.radius, this.from, this.to * this.progress));
    }
  }
}
