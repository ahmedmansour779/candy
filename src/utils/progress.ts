import NProgress from "nprogress";

NProgress.configure({ speed: 400, trickle: false });
let intervalId: null | number = null;

export function startProgress() {
  if (intervalId) return;
  NProgress.start();
  intervalId = window.setInterval(() => NProgress.inc(), 500);
}

export function removeProgress() {
  if (intervalId) {
    NProgress.done();
    window.clearInterval(intervalId);
    intervalId = null;
  }
}
