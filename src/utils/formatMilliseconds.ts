export default function formatMilliseconds(ms: number): string {
  if (ms < 1000) {
    // If less than 999ms, display in milliseconds with 'ms' suffix
    return `${ms} ms`;
  } else if (ms >= 1000 && ms < 60000) {
    // If greater than 999ms but less than a minute, convert to seconds and display with 3 decimal places
    return `${(ms / 1000).toFixed(3)} s`;
  } else {
    // If greater than or equal to a minute, calculate minutes and remaining milliseconds
    const minutes = Math.floor(ms / 60000);
    const remainingMs = ms % 60000;
    const seconds = (remainingMs / 1000).toFixed(3); // Convert remaining milliseconds to seconds with 3 decimal places
    return `${minutes}:${seconds} m`;
  }
}
