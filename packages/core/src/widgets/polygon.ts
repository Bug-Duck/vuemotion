import { defineWidget } from "../utils/define-widget";
import { Figure, FigureOptions } from "./figure";

export interface PolygonOptions extends FigureOptions {
  points: Array<[number, number]>
}

export class Polygon extends Figure {
  points: Array<[number, number]>;
  path: SVGPathElement
  pathData: string

  constructor(options: PolygonOptions) {
    super(options);
    this.points = options.points;
  }

  render(): SVGElement {
    const root = super.render();

    this.path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.path.id = 'graph';

    // Convert the points to a path `d` attribute
    this.pathData = this.points.reduce((acc, [x, y], index) => {
      return acc + (index === 0 ? `M${x},${y}` : ` L${x},${y}`);
    }, '');

    // Optionally close the path to form a closed shape (if you want it similar to a polygon)
    // pathData += ' Z';

    this.path.setAttribute("d", this.pathData);
    root.appendChild(this.path);

    return root;

  }
}

export const createPolygon = defineWidget<PolygonOptions, Polygon>(Polygon)
