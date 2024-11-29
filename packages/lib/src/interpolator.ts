export function interpolator(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}
