import { Typography } from '@mui/material';
import messages from './data/welcome.json';
import getRandomItem from '@utils/array-utils/getRandomItem.ts';
export default function StatusMessage() {
  const message = getRandomItem<string>(messages);
  return (
    <Typography
      sx={{
        opacity: 0.5,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '100%',
      }}
    >
      {message}
    </Typography>
  );
}
