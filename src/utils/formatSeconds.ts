export default function formatSeconds(sec: number): string {
  // SECONDS
  if (sec < 60) {
    return `${sec.toFixed(2)} s`;
  }

  // HOURS
  else if (sec >= 3600) {
    const hours = Math.floor(sec / 3600);
    const remainingMs = sec % 3600;
    const minutes = Math.floor(remainingMs / 60);
    const remainingSeconds = remainingMs % 60;
    const seconds = remainingSeconds.toFixed(0);
    return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds} h`;
  }

  // MINUTES
  else {
    const minutes = Math.floor(sec / 60);
    const remainingMs = sec % 60;
    const seconds = remainingMs.toFixed(0);
    return `${minutes}:${seconds.toString().padStart(2, '0')} m`;
  }
}
