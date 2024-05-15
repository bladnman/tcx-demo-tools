import DropMessage from '@dialogs/app-drop-dialog/features/drop-message/DropMessage.tsx';
import { loadEventsFromFiles } from '@dialogs/app-drop-dialog/utils/loadEventsFromFiles.ts';
import { Backdrop } from '@mui/material';
import actionSetImportingEvents from '@store/settings-store/actions/actionSetImportingEvents.ts';
import actionSetImportingSequences from '@store/settings-store/actions/actionSetImportingSequences.ts';
import actionSetIsSettingsDialogOpen from '@store/settings-store/actions/actionSetIsSettingsDialogOpen.ts';
import { useEffect, useState } from 'react';

export default function AppDropDialog() {
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDragEnter = (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(true);
    };

    const handleDragLeave = (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
    };

    const handleDrop = async (event: DragEvent) => {
      event.preventDefault();
      setIsDragging(false);
      actionSetIsSettingsDialogOpen(false);

      // Check if any files were dropped
      if (event.dataTransfer?.files) {
        try {
          const { events, sequences } = await loadEventsFromFiles(
            event.dataTransfer.files,
          );
          actionSetImportingEvents(events);
          actionSetImportingSequences(sequences);
        } catch (error) {
          console.error('Error reading files', error);
        }
      }
    };

    // Add event listeners for the window
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragenter', handleDragEnter);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      // Clean up the event listeners
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragenter', handleDragEnter);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  if (!isDragging) return null;

  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        flexDirection: 'column',
      }}
      open={isDragging}
    >
      <DropMessage />
    </Backdrop>
  );
}
