import SummaryRow from '@pages/telemetry-viewer-page/features/right-drawer/features/details-summary-viewer/common/SummaryRow.tsx';
import { StackProps, VStack } from '@common/mui-stacks.tsx';
import getObjectValue from '@pages/telemetry-viewer-page/utils/getObjectValue.ts';
import { TypographyStyleOptions } from '@mui/material/styles/createTypography';

export type SummaryTableRowDef = Partial<FieldDefinition> & {
  // from FIELD_DEF
  field: string;
  paths: string[];
  // for summary table
  alwaysShow?: boolean;
  isKeyField?: boolean;
  color?: string;
};
export default function SummaryTable({
  event,
  rowDefs,
  stackOptions,
}: {
  event: TVEvent;
  rowDefs: SummaryTableRowDef[];
  stackOptions?: Partial<StackProps>;
}) {
  return (
    <VStack hFill topLeft {...stackOptions}>
      {rowDefs.map((rowDef) => {
        const value = getObjectValue(event, rowDef.paths);
        const labelSx: TypographyStyleOptions = {};
        const valueSx: TypographyStyleOptions = {
          color: rowDef.color,
        };
        if (!value && !rowDef.alwaysShow) {
          return null;
        }
        return (
          <SummaryRow
            key={rowDef.field}
            label={rowDef.field}
            value={value}
            labelSx={labelSx}
            valueSx={valueSx}
            stackOptions={{
              hFill: true,
              topLeft: true,
              ...stackOptions,
            }}
          />
        );
      })}
    </VStack>
  );
}
