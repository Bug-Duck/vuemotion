import { defineAnimation } from "@vue-motion/core";

export interface Growable {
  progress?: number;
}

export interface GrowableIns extends Growable {
  grow: () => void;
}

export const grow = defineAnimation<Growable, object>(
  (target) => (progress) => {
    target.progress = progress;
  },
);

export const destory = defineAnimation<Growable, object>(
  (target) => (progress) => {
    target.progress = 1 - progress;
  },
);
