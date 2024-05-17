import TWEvent from '@classes/data/TWEvent.ts';
import cleanForExport from '@dialogs/export-dialog/utils/cleanForExport.ts';
import getDownloadStringCsv from '@dialogs/export-dialog/utils/getDownloadStringCsv.ts';
import getDownloadStringJson from '@dialogs/export-dialog/utils/getDownloadStringJson.ts';

export default function downloadEvents(
  events: TWEvent[],
  format: 'json' | 'csv',
  structure: 'twiz' | 'raw',
  fileName: string,
) {
  // CREATE LINK TO DOWNLOAD
  const href = URL.createObjectURL(getDownloadableBlob(events, format, structure));
  const link = document.createElement('a');
  const extension = format === 'json' ? 'json' : 'csv';
  link.href = href;
  link.download = fileName.endsWith(`.${extension}`)
    ? fileName
    : `${fileName}.${extension}`;
  document.body.appendChild(link);

  // TRIGGER DOWNLOAD
  link.click();

  // CLEAN UP
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
}
function getDownloadableBlob(
  events: TWEvent[],
  format: 'json' | 'csv',
  structure: 'twiz' | 'raw',
) {
  // GET DOWNLOADABLE DATA
  const cleanEvents = cleanForExport(events);
  const extension = format === 'json' ? 'json' : 'csv';
  const data =
    format === 'json'
      ? getDownloadStringJson(cleanEvents as TWEvent[], structure)
      : getDownloadStringCsv(cleanEvents as TWEvent[], structure);
  return new Blob([data], { type: `application/${extension}` });
}
