import type {
  Animation,
  AnimationInstance,
  AnimationManager,
  AnimationParams,
  TimingFunction,
  Widget,
} from "@vue-motion/core";
import { registerAnimation } from "@vue-motion/core";
import { inject } from "vue";
import {
  destory,
  fadeIn,
  fadeOut,
  fadeTo,
  grow,
  Growable,
  GrowableIns,
  type HasOpacity,
  type HasOpacityIns,
  type HasScale,
  type HasScaleIns,
  move,
  moveOnFunction,
  moveOnPath,
  moveTo,
  type Positional,
  type PositionalIns,
  type Rotatable,
  type RotatableIns,
  rotate,
  rotateTo,
  type Scalable,
  scale,
  scaleTo,
  Strokable,
  type StrokableIns,
  trace,
  traceFill,
  zoomIn,
  zoomOut,
  zoomTo,
} from "../animations";
import type { Colorable, ColorableIns } from "../animations/color";
import {
  discolorate,
  discolorateBorder,
  discolorateBorderTo,
  discolorateFill,
  discolorateFillTo,
  discolorateTo,
} from "../animations/color";

export type WidgetOptions = Widget &
  Positional &
  Scalable &
  Rotatable &
  HasOpacity &
  Colorable &
  Growable & {
    manager?: AnimationManager<any>;
  };
export type WidgetIns = WidgetOptions &
  PositionalIns &
  RotatableIns &
  HasScaleIns &
  StrokableIns &
  HasOpacityIns &
  ColorableIns &
  GrowableIns & {
    parallel: (
      ...animations: ((
        widget: WidgetIns & { manager?: AnimationManager<any> },
      ) => void)[]
    ) => void;
    animate: <A>(
      animation: Animation<Widget, A>,
      context: {
        duration?: AnimationInstance<Widget, A>["duration"];
        by?: TimingFunction;
      } & A,
    ) => void;
    once: (animation: (target: Widget) => void) => void;
    delay: (duration: number) => void;
    exec: (fn: () => void) => void;
  };
export interface Animatable {
  animate: <A>(
    animation: Animation<Widget, A>,
    context: {
      duration?: number;
      by?: TimingFunction;
    } & A,
  ) => void;
  once: (animation: (target: Widget) => void) => void;
  delay: (duration: number) => void;
  parallel: (...animations: ((widget: WidgetIns) => void)[]) => void;
}

export function widget(options: WidgetOptions) {
  const props = {} as {
    transform?: string;
    style?: string;
  } & WidgetIns;

  const transform: string[] = [];
  if (options.x || options.y)
    transform.push(`translate(${options.x ?? 0},${options.y ?? 0})`);
  if (options.scaleX || options.scaleY)
    transform.push(`scale(${options.scaleX ?? 1}, ${options.scaleY ?? 1})`);
  if (options.rotation) transform.push(`rotate(${options.rotation})`);
  if (transform.length > 0) props.transform = transform.join(" ");
  if (options.opacity !== 1) props.style = `opacity: ${options.opacity}`;

  const defaultDuration = 1;

  registerAnimation<Growable>(
    "grow",
    (offsetX: number, offsetY: number, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(grow, {
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Positional>(
    "move",
    (offsetX: number, offsetY: number, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(move, {
          offsetX,
          offsetY,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Positional>(
    "moveTo",
    (toX: number, toY: number, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(moveTo, {
          toX,
          toY,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Scalable>(
    "scale",
    (offsetX: number, offsetY: number, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(scale, {
          offsetX,
          offsetY,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Scalable>(
    "scaleTo",
    (toX: number, toY: number, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(scaleTo, {
          toX,
          toY,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Rotatable>(
    "rotate",
    (offset: number, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(rotate, {
          offset,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Rotatable>(
    "rotateTo",
    (to: number, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(rotateTo, {
          to,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<HasOpacity>(
    "fadeTo",
    (to: number, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(fadeTo, {
          to,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<HasOpacity>(
    "fadeIn",
    (params?: AnimationParams) => {
      return (manager) =>
        manager.animate(fadeIn, {
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<HasOpacity>(
    "fadeOut",
    (params?: AnimationParams) => {
      return (manager) =>
        manager.animate(fadeOut, {
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<HasScale>(
    "zoomTo",
    (toX: number, toY: number, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(zoomTo, {
          toX,
          toY,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<HasScale>(
    "zoomIn",
    (params?: AnimationParams) => {
      return (manager) =>
        manager.animate(zoomIn, {
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<HasScale>(
    "zoomOut",
    (params?: AnimationParams) => {
      return (manager) =>
        manager.animate(zoomOut, {
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Positional>(
    "moveOnPath",
    (path: string, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(moveOnPath, {
          path,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Positional>(
    "moveOnFunction",
    (
      path: (progress: number) => { x: number; y: number },
      params?: AnimationParams,
    ) => {
      return (manager) =>
        manager.animate(moveOnFunction, {
          path,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Colorable>(
    "discolorate",
    (offset: string, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(discolorate, {
          offset,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Colorable>(
    "discolorateTo",
    (to: string, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(discolorateTo, {
          to,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Colorable>(
    "discolorateBorder",
    (offset: string, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(discolorateBorder, {
          offset,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Colorable>(
    "discolorateBorderTo",
    (to: string, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(discolorateBorderTo, {
          to,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Colorable>(
    "discolorateFill",
    (offset: string, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(discolorateFill, {
          offset,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Colorable>(
    "discolorateFillTo",
    (to: string, params?: AnimationParams) => {
      return (manager) =>
        manager.animate(discolorateFillTo, {
          to,
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Growable>(
    "grow",
    (params?: AnimationParams) => {
      return (manager) =>
        manager.animate(grow, {
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Growable>(
    "destory",
    (params?: AnimationParams) => {
      return (manager) =>
        manager.animate(destory, {
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Strokable>(
    "trace",
    (params?: AnimationParams) => {
      return (manager) =>
        manager.animate(trace, {
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Strokable>(
    "traceFill",
    (params?: AnimationParams) => {
      return (manager) =>
        manager.animate(traceFill, {
          duration: params?.duration ?? defaultDuration,
          by: params?.by ?? ((x) => x),
        });
    },
    options,
  );
  registerAnimation<Widget>(
    "animate",
    <A>(
      animation: Animation<Widget, A>,
      context: {
        duration?: AnimationInstance<Widget, A>["duration"];
        by?: TimingFunction;
      } & A,
    ) => {
      return (manager) => manager.animate(animation, context);
    },
    options,
  );
  registerAnimation<Widget>(
    "once",
    (animation: (target: Widget) => void) => {
      return (manager) => manager.once(animation);
    },
    options,
  );
  registerAnimation<Widget>(
    "delay",
    (duration: number) => {
      return (manager) => manager.delay(duration);
    },
    options,
  );
  registerAnimation<WidgetIns>(
    "parallel",
    (
      ...animations: ((
        widget: WidgetIns & { manager: AnimationManager<any> },
      ) => void)[]
    ) => {
      return (manager: AnimationManager<WidgetIns>) => {
        return manager.parallel(...animations);
      };
    },
    options,
  );
  registerAnimation<WidgetIns>(
    "exec",
    (fn: () => void) => {
      return (manager: AnimationManager<WidgetIns>) => {
        return manager.exec(fn);
      };
    },
    options,
  );
  const animations = inject<(() => Animation<Widget, any>)[]>(
    "ADDITION_ANIMATIONS",
  );
  animations?.forEach((animation) => animation());

  return props as {
    transform?: string;
    style?: string;
  };
}
