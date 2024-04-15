export default function formatMilliseconds(ms: number): string {
  // MILLISECONDS
  if (ms < 1000) {
    return `${ms.toFixed(3)} ms`;
  }

  // SECONDS
  else if (ms >= 1000 && ms < 60000) {
    return `${(ms / 1000).toFixed(2)} s`;
  }

  // HOURS
  else if (ms >= 3600000) {
    const hours = Math.floor(ms / 3600000);
    const remainingMs = ms % 3600000;
    const minutes = Math.floor(remainingMs / 60000);
    const remainingSeconds = remainingMs % 60000;
    const seconds = (remainingSeconds / 1000).toFixed(0);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds} h`;
  }

  // MINUTES
  else {
    const minutes = Math.floor(ms / 60000);
    const remainingMs = ms % 60000;
    const seconds = (remainingMs / 1000).toFixed(0);
    return `${minutes}:${seconds.toString().padStart(2, '0')} m`;
  }
}
