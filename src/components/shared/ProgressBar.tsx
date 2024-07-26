import { useEffect } from "react";
import { removeProgress, startProgress } from "../../utils/progress";

export default function ProgressBar() {
  useEffect(() => {
    startProgress();
    // remove progress on unmount
    return removeProgress;
  }, []);
  return null;
}
