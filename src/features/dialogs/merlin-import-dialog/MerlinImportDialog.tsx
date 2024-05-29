import CollapsableContainer from '@common/CollapsableContainer.tsx';
import { HStack, VStack } from '@common/mui-stacks.tsx';
import IMPLY_TABLES, { IMPLY_TABLES_COMMON } from '@const/IMPLY_TABLES.ts';
import { mdiDatabaseExport } from '@mdi/js';

import Icon from '@mdi/react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import fetchMerlinData from '@pages/welcome/utils/fetchMerlinData.ts';
import actionAddUnMappedEvents from '@store/event-store/actions/actionAddUnMappedEvents.ts';
import actionSetIsMerlinImportDialogOpen from '@store/settings-store/actions/actionSetIsMerlinImportDialogOpen.ts';
import useSettingsStore from '@store/settings-store/useSettingsStore.ts';
import { useState } from 'react';

export default function MerlinImportDialog() {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isExportDialogOpen = useSettingsStore((state) => state.isMerlinImportDialogOpen);

  const [field, setField] = useState('openPsid');
  const [dataKeyValue, setDataKeyDataKeyValue] = useState(
    'bce8f8ee840cefa8402b30f5a7948c2639ef19327210eae711b2434cac1bfe16',
  );
  const [duration, setDuration] = useState<string>('5 hour');
  const [environment, setEnvironment] = useState<string>('p1');
  const isLoading = false;

  const [tables, setTables] = useState<Set<string>>(
    new Set([
      'np_telemetry_client_navigation',
      'np_telemetry_client_interaction',
      'np_telemetry_client_applicationerror',
      'np_telemetry_client_networkerror',
      // 'np_telemetry_client_viewableimpression',
    ]),
  );
  const handleTableChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedTable = event.target.name;
    if (tables.has(selectedTable)) {
      tables.delete(selectedTable);
    } else {
      tables.add(selectedTable);
    }
    setTables(new Set(tables));
  };
  const handleDurationChange = (value: string) => {
    setDuration(value);
  };
  const handleClose = () => {
    actionSetIsMerlinImportDialogOpen(false);
  };
  const buildAllSqlQueries = () => {
    const sqlQueries: string[] = [];
    const [count, period] = duration.split(' ');
    const durationCount = parseInt(count, 10);
    const durationPeriod = period;
    tables.forEach((table) => {
      const sql = getTableDataQuery(
        `${environment}${table}`,
        field,
        dataKeyValue,
        durationCount,
        durationPeriod,
      );
      sqlQueries.push(sql);
    });
    return sqlQueries;
  };
  const handleImportClick = () => {
    const sqlQueries = buildAllSqlQueries();
    sqlQueries.forEach((sql) => {
      // fetch here
      fetchMerlinData(sql, (data) => {
        console.log(`[🐽](MerlinImportDialog) data`, data);
        actionAddUnMappedEvents(data);
      }).catch(console.error);
    });
  };
  const getTableLabel = (table: string) => {
    const name = table.replace(
      /(np_telemetry_client|np_telemetry_native|np_legacy|np_legacy|np)_/,
      '',
    );
    const type = table.includes('native')
      ? 'Native'
      : table.includes('client')
        ? 'Client'
        : table.includes('tooling')
          ? 'Tooling'
          : table.includes('legacy')
            ? 'Legacy'
            : table.includes('uim')
              ? 'UIM'
              : '';

    return (
      <HStack left>
        <Typography variant="caption" color={'fg.dark'} sx={{ width: '4em' }}>
          {type}
        </Typography>
        <Typography variant="body1" color={'fg.main'}>
          {name}
        </Typography>
      </HStack>
    );
  };
  const renderTableCheckbox = (table: string) => {
    return (
      <FormControlLabel
        control={
          <Checkbox
            checked={tables.has(table)}
            onChange={handleTableChange}
            name={table}
            sx={{ paddingY: 0 }}
          />
        }
        label={getTableLabel(table)}
        key={table}
        sx={{ width: '100%' }}
      />
    );
  };

  const commonTableList = IMPLY_TABLES_COMMON.filter((t) => !t.includes('_aggregate'));
  const otherTableList = IMPLY_TABLES.filter((t) => {
    return !IMPLY_TABLES_COMMON.includes(t) && !t.includes('_aggregate');
  });

  return (
    <Dialog
      onClose={handleClose}
      open={isExportDialogOpen}
      maxWidth={'md'}
      fullScreen={fullScreen}
    >
      <DialogTitle>Merlin Import</DialogTitle>
      <DialogContent>
        <VStack hFill left spacing={2}>
          <Typography variant="subtitle1" color={'fg.dark'} sx={{ maxWidth: '30em' }}>
            To import data from Merlin (Imply), please fill in the form below. This will
            import data from the selected tables for the specified duration.
          </Typography>

          {/* KEY */}
          <HStack hFill left spacing={2}>
            <VStack left spacing={0}>
              <Typography variant="subtitle1" color={'fg.dark'}>
                Data Key
              </Typography>
              <HStack bottomLeft spacing={2}>
                <Select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  variant="standard"
                  sx={{ minWidth: '10em' }}
                >
                  <MenuItem value="openPsid">openPsId</MenuItem>
                  <MenuItem value="psnId">psnId</MenuItem>
                </Select>

                <TextField
                  label="Value"
                  value={dataKeyValue}
                  onChange={(e) => setDataKeyDataKeyValue(e.target.value)}
                  fullWidth
                  variant="standard"
                  sx={{ minWidth: '20em' }}
                />
              </HStack>
            </VStack>
          </HStack>

          {/* ENVIRONMENT */}
          <HStack hFill topLeft spacing={2}>
            <VStack left spacing={0}>
              <Typography variant="subtitle1" color={'fg.dark'}>
                Environment
              </Typography>
              <RadioGroup
                row
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
              >
                <FormControlLabel value="p1" control={<Radio />} label="Prod" />
                <FormControlLabel value="e1" control={<Radio />} label="E1" />
              </RadioGroup>
            </VStack>

            <VStack left spacing={0}>
              <Typography variant="subtitle1" color={'fg.dark'}>
                Duration
              </Typography>
              <Select
                value={duration}
                onChange={(e) => handleDurationChange(e.target.value)}
                variant="standard"
                sx={{ minWidth: '10em' }}
              >
                <MenuItem value="1 hour">1 hour</MenuItem>
                <MenuItem value="2 hour">2 hours</MenuItem>
                <MenuItem value="5 hour">5 hours</MenuItem>
                <MenuItem value="12 hour">12 hours</MenuItem>
                <MenuItem value="1 day">1 day</MenuItem>
                <MenuItem value="2 day">2 days</MenuItem>
                <MenuItem value="5 day">5 days</MenuItem>
              </Select>

              {duration.includes('day') && (
                <Typography
                  variant="subtitle1"
                  color={'appOrange.main'}
                  sx={{ maxWidth: '20em' }}
                >
                  Note that not all tables support querying for more than 1 day. The
                  retention period for some data is different than others. YMMV.
                </Typography>
              )}
            </VStack>
          </HStack>

          {/* TABLES */}
          <VStack left spacing={0}>
            <Typography variant="subtitle1" color={'fg.dark'}>
              Tables
            </Typography>
            <CollapsableContainer
              title={
                <Typography variant={'subtitle1'} fontWeight={'bolder'}>
                  Common Tables
                </Typography>
              }
            >
              <VStack spacing={0.25} topLeft sx={{ overflowY: 'auto' }}>
                <VStack hFill sx={{ px: 2 }}>
                  {commonTableList.map(renderTableCheckbox)}
                </VStack>
              </VStack>
            </CollapsableContainer>

            <CollapsableContainer
              title={
                <Typography variant={'subtitle1'} fontWeight={'bolder'}>
                  Other Tables
                </Typography>
              }
              collapsed={true}
            >
              <VStack spacing={0.25} topLeft sx={{ overflowY: 'auto' }}>
                <VStack hFill sx={{ px: 2 }}>
                  {otherTableList.map(renderTableCheckbox)}
                </VStack>
              </VStack>
            </CollapsableContainer>
          </VStack>
        </VStack>
      </DialogContent>

      <DialogActions>
        {/*@ts-expect-error : using my own colors*/}
        <Button onClick={handleClose} color={'cancel'}>
          Cancel
        </Button>
        <Button onClick={handleImportClick} disabled={isLoading}>
          <HStack spacing={0.5}>
            <Icon path={mdiDatabaseExport} size={1} />
            Import
          </HStack>
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function getTableDataQuery(
  table: string,
  field: string,
  value: string,
  durationCount: number,
  durationPeriod: string,
) {
  return `
    SELECT
        __time "timestamp",
        * 
    FROM ${table}
    WHERE
      "__time" >= CURRENT_TIMESTAMP - INTERVAL '${durationCount ?? 1}' ${durationPeriod}
      and ${field} = '${value}' 
  `;
}
