import {
  Box,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import {
  EqualIcon,
  EqualNotIcon,
  SimilarIcon,
  SimilarNotIcon,
} from '@assets/icons/AppIcons';
import { tableCellClasses } from '@mui/material/TableCell';
import { HStack, VStack } from '@common/mui-stacks.tsx';
type Props = {
  rule: TagMatchRule;
};
export default function TagRuleRow({ rule }: Props) {
  const tableNoLinesSx = {
    [`& .${tableCellClasses.root}`]: {
      // borderBottom: 'none',
      borderBottomStyle: 'solid',
      borderBottomColor: '#3f3f3f',
      borderBottomSize: '1px',
      padding: 0.4,
    },
  };
  return (
    <HStack hFill left>
      <VStack hFill spacing={1}>
        <HStack hFill left spacing={1}>
          <Table sx={tableNoLinesSx} size={'small'}>
            <TableBody>
              {rule.map((clause, idx) => {
                return (
                  <TableRow key={idx}>
                    {rule.length > 1 && (
                      <TableCell>
                        <Typography
                          variant={'caption'}
                          sx={{
                            color: 'fg35.main',
                            fontStyle: 'italic',
                            pr: 2,
                            whiteSpace: 'nowrap',
                          }}
                        >
                          clause {idx + 1}
                        </Typography>
                      </TableCell>
                    )}

                    <TableCell style={{ width: '25%' }}>
                      <Typography variant={'caption'}>{clause.path}</Typography>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ opacity: 0.5 }}>
                        <ModeIcon mode={clause.mode} />
                      </Box>
                    </TableCell>
                    <TableCell style={{ width: '70%' }}>
                      <Typography variant={'caption'}>{clause.value}</Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </HStack>
      </VStack>
    </HStack>
  );
}
function ModeIcon({ mode, sx }: { mode: TagMatchMode; sx?: SxProps }) {
  switch (mode) {
    case 'EQUALS':
      return <EqualIcon sx={sx} />;
    case 'NOT_EQUALS':
      return <EqualNotIcon sx={sx} />;
    case 'CONTAINS':
      return <SimilarIcon sx={sx} />;
    case 'NOT_CONTAINS':
      return <SimilarNotIcon sx={sx} />;
    default:
      return <EqualIcon sx={sx} />;
  }
}
