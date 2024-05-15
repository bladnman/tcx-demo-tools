import actionSetIsImportDialogOpen from '@store/settings-store/actions/actionSetIsImportDialogOpen.ts';
import KeyboardEventHandler from 'react-keyboard-event-handler';

export default function KeyboardProvider() {
  return (
    <>
      <KeyboardEventHandler
        handleKeys={['command+i']}
        onKeyEvent={() => {
          actionSetIsImportDialogOpen(true);
        }}
      />
    </>
  );
}
