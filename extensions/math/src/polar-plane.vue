<script setup lang="ts">
import { defineWidget } from "@vue-motion/core";
import { Arc, Line } from "@vue-motion/lib";
import { type WidgetOptions, widget } from "@vue-motion/lib";
import tex from "./tex.vue";

export interface PolarPlaneOptions extends WidgetOptions {
  azimuthUnits?: "PI radians" | "TAU radians" | "degrees" | "gradians";
  radius: number;
  interval?: number;
  intervalR?: number;
  trend?: (count: number) => string;
  baseUnit?: "radian" | "degree";
  divide?: number;
  fontSize?: number;
  fontColor?: string;
}

const props = defineProps<PolarPlaneOptions>();
const options = defineWidget<typeof props>(props);

const divide = props.divide ?? 20;

function buildRadians(numerator: number, denominator: number) {
  if (numerator === denominator) return "\\pi";
  if (numerator === 0) return "0";
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const _gcd = gcd(numerator, denominator);
  return `\\frac{${numerator / _gcd}}{${denominator / _gcd}}\\pi`;
}

function fixAngle(at: number): number {
  return at % divide;
}
</script>

<template>
  <g v-bind="widget(options)">
    <!-- Axes -->
    <Line :from="[-radius, 0]" :to="[radius, 0]" border-color="white" />
    <Line :from="[0, -radius]" :to="[0, radius]" border-color="white" />

    <!-- Circular Arcs -->
    <g v-for="r in Math.floor(360 / (options.interval ?? 100))" :key="r">
      <Arc
        :radius="r * (options.interval ?? 100)"
        :border-width="1"
        fill-color="none"
      />
    </g>

    <!-- Radial Lines -->
    <g v-for="a in divide" :key="a">
      <Line
        :from="[0, 0]"
        :to="[radius, 0]"
        :rotation="a * (360 / divide)"
        border-color="white"
        :border-width="1"
      />
    </g>

    <!-- Labels at each radial line -->
    <g v-for="at in divide" :key="at">
      <!-- Convert degrees to radians by multiplying by Math.PI / 180 -->
      <tex
        :x="
          Math.cos(at * (360 / divide) * (Math.PI / 180)) * (radius + 25) -
          160 / 2 -
          20
        "
        :y="
          -Math.sin(at * (360 / divide) * (Math.PI / 180)) * (radius + 25) -
          160 / 2 -
          20
        "
        text-anchor="middle"
        :font-size="options.fontSize ?? 22"
        :auto-center="true"
      >
        {{
          options.azimuthUnits === "degrees"
            ? `${options.trend ? options.trend(at) : fixAngle(at) * (360 / divide)}\\degree`
            : options.azimuthUnits === "gradians"
              ? `${options.trend ? options.trend(at) : fixAngle(at) * (400 / divide)}\\text{g}`
              : buildRadians(fixAngle(at) * 2, divide)
        }}
      </tex>
    </g>
  </g>
</template>
