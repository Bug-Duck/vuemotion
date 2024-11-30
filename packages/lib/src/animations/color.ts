import { defineAnimation } from "@vue-motion/core";
import { findColor, colorTable } from "@vue-motion/utils";

export interface Colorable {
  fillColor?: string;
  borderColor?: string;
  color?: string;
}

export interface ColorableMixin {
  discolorate: (offset: string) => void;
  discolorateTo: (to: string) => void;
  discolorateBorder: (offset: string) => void;
  discolorateBorderTo: (to: string) => void;
  discolorateFill: (offset: string) => void;
  discolorateFillTo: (to: string) => void;
}

export interface RGB {
  r: number;
  g: number;
  b: number;
  a?: number;
}

function hexToRgb(color: string): RGB {
  if (!/^[#rgb]/.test(color)) {
    const namedColor = findColor(color as keyof typeof colorTable);
    if (namedColor) {
      color = namedColor;
    }
  }

  if (color.startsWith("rgb")) {
    const values = color.match(/\d+(\.\d+)?/g);
    if (!values) return { r: 0, g: 0, b: 0 };
    return {
      r: parseInt(values[0]),
      g: parseInt(values[1]),
      b: parseInt(values[2]),
      ...(values[3] ? { a: parseFloat(values[3]) } : {}),
    };
  }

  const hex = color.replace(/^#/, "");
  const bigint = parseInt(hex, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToString(rgb: RGB): string {
  if (typeof rgb.a !== "undefined") {
    return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
  }

  return (
    "#" +
    [rgb.r, rgb.g, rgb.b]
      .map((x) => Math.round(x).toString(16).padStart(2, "0"))
      .join("")
  );
}

function interpolateColor(from: string, to: string, progress: number): string {
  const fromRgb = hexToRgb(from);
  const toRgb = hexToRgb(to);

  const result: RGB = {
    r: Math.round(fromRgb.r + (toRgb.r - fromRgb.r) * progress),
    g: Math.round(fromRgb.g + (toRgb.g - fromRgb.g) * progress),
    b: Math.round(fromRgb.b + (toRgb.b - fromRgb.b) * progress),
  };

  if (typeof fromRgb.a !== "undefined" || typeof toRgb.a !== "undefined") {
    const fromAlpha = fromRgb.a ?? 1;
    const toAlpha = toRgb.a ?? 1;
    result.a = fromAlpha + (toAlpha - fromAlpha) * progress;
  }

  return rgbToString(result);
}

function shiftColor(color: string, offset: string): string {
  const rgb = hexToRgb(color);
  const offsetRgb = hexToRgb(offset);

  const result: RGB = {
    r: Math.min(255, Math.max(0, rgb.r + offsetRgb.r)),
    g: Math.min(255, Math.max(0, rgb.g + offsetRgb.g)),
    b: Math.min(255, Math.max(0, rgb.b + offsetRgb.b)),
  };

  if (typeof rgb.a !== "undefined") {
    result.a = rgb.a;
  }

  return rgbToString(result);
}

export const discolorate = defineAnimation<
  Colorable,
  {
    from?: string;
    offset?: string;
  }
>((target, context) => {
  const currentColor = target.color;
  const fromColor = context.from || currentColor || "#000000";
  const toColor = context.offset
    ? shiftColor(fromColor, context.offset)
    : currentColor || "#000000";

  return (progress) => {
    target.color = interpolateColor(fromColor, toColor, progress);
  };
});

export const discolorateTo = defineAnimation<
  Colorable,
  {
    to: string;
  }
>((target, context) => {
  const currentColor = target.color;
  const fromColor = currentColor
    ? findColor(currentColor as keyof typeof colorTable) || currentColor
    : "#000000";
  const toColor =
    findColor(context.to as keyof typeof colorTable) || context.to;

  return (progress) => {
    target.color = interpolateColor(fromColor, toColor, progress);
  };
});

export const discolorateBorder = defineAnimation<
  Colorable,
  {
    from?: string;
    offset?: string;
  }
>((target, context) => {
  const currentColor = target.borderColor;
  const fromColor = context.from || currentColor || "#000000";
  const toColor = context.offset
    ? shiftColor(fromColor, context.offset)
    : currentColor || "#000000";

  return (progress) => {
    target.borderColor = interpolateColor(fromColor, toColor, progress);
  };
});

export const discolorateBorderTo = defineAnimation<
  Colorable,
  {
    to: string;
  }
>((target, context) => {
  const currentColor = target.borderColor;
  const fromColor = currentColor
    ? findColor(currentColor as keyof typeof colorTable) || currentColor
    : "#000000";
  const toColor =
    findColor(context.to as keyof typeof colorTable) || context.to;

  return (progress) => {
    target.borderColor = interpolateColor(fromColor, toColor, progress);
  };
});

export const discolorateFill = defineAnimation<
  Colorable,
  {
    from?: string;
    offset?: string;
  }
>((target, context) => {
  const currentColor = target.fillColor;
  const fromColor = context.from || currentColor || "#000000";
  const toColor = context.offset
    ? shiftColor(fromColor, context.offset)
    : currentColor || "#000000";

  return (progress) => {
    target.fillColor = interpolateColor(fromColor, toColor, progress);
  };
});

export const discolorateFillTo = defineAnimation<
  Colorable,
  {
    to: string;
  }
>((target, context) => {
  const currentColor = target.fillColor;
  const fromColor = currentColor
    ? findColor(currentColor as keyof typeof colorTable) || currentColor
    : "#000000";
  const toColor =
    findColor(context.to as keyof typeof colorTable) || context.to;

  return (progress) => {
    target.fillColor = interpolateColor(fromColor, toColor, progress);
  };
});
