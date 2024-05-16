import TWEvent from '@classes/data/TWEvent.ts';
import eventMapper from '@classes/telemetry-receiver/eventMapper.ts';
import cleanForImport from '@dialogs/import-dialog/utils/cleanForImport.ts';
import getNewUpdateExistingEvents from '@utils/event-utils/getNewUpdateExistingEvents.ts';

export async function loadEventsFromFiles(
  files: FileList,
): Promise<{ events: TWEvent[]; sequences: Sequences }> {
  let sequences = {};
  let allEvents: TWEvent[] = [];

  for (const file of files) {
    const { events, sequences: updatedSequences } = await processFile(file, sequences);
    allEvents = allEvents.concat(events);
    sequences = updatedSequences;
  }

  return { events: allEvents, sequences };
}

//
// HELPER FUNCTIONS
async function processFile(
  file: File,
  sequences: Sequences,
): Promise<{ events: TWEvent[]; sequences: Sequences }> {
  return new Promise<{ events: TWEvent[]; sequences: Sequences }>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const contents = e.target?.result as string;
        const rawEvents = cleanForImport(contents);
        const { events, sequences: processedSequences } = eventMapper(
          rawEvents,
          sequences,
        );

        // will de-dupe (or update) the events
        const { newEvents } = getNewUpdateExistingEvents(events, []);

        newEvents.sort((a, b) => a.twEventTimeMs - b.twEventTimeMs);

        console.log(`[🐽](loadEventsFromFiles) newEvents`, newEvents);

        resolve({
          events: newEvents,
          sequences: processedSequences !== sequences ? processedSequences : sequences,
        });
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = (e) => {
      console.error('File reading error', e);
      reject(e);
    };

    reader.readAsText(file);
  });
}
