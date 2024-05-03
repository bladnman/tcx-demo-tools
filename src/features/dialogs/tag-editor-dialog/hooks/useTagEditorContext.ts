import * as React from 'react';
import { TagEditorContext } from '../parts/TagEditorProvider.tsx';

function useTagEditorContext() {
  const context = React.useContext(TagEditorContext);
  if (context === undefined) {
    throw new Error('useCount must be used within a TagEditorProvider');
  }
  return context;
}

export { useTagEditorContext };
