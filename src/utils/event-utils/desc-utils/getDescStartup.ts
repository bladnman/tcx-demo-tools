import TWEvent from '@classes/data/TWEvent.ts';

// @ts-expect-error : not using event, but keeping the pattern alive
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function getDescStartup(event: TWEvent) {
  const highlight = 'Vroom';

  return {
    highlight,
    message: undefined,
    color: `fg.main`,
  };
}
