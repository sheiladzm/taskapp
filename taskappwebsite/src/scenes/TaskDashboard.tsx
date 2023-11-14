import * as React from 'react';
import Box from '@mui/material/Box';
import {
  GridRowsProp,
  GridRowModesModel,
  DataGrid,
  GridEventListener,
  GridRowEditStartReasons,
} from '@mui/x-data-grid';
import { getAllTasksAPI } from '../services/api/Task';
import { getStatusesFromAPI } from '../services/api/Status';
import { Alert, AlertTitle, Typography } from '@mui/material';
import { 
    ERROR_ALERT_DESCRIPTION,
    ERROR_ALERT_TITLE,
    RETRIEVING_LIST_MESSAGE,
    SUCCESS_ALERT_DESCRIPTION,
    SUCCESS_ALERT_TITLE,
} from '../lib/constants';
import { Status, Task } from '../lib/types';
import EditToolbar from '../components/EditToolbar';
import TaskModal from '../components/TaskModal';
import { dashboardBoxStyle } from '../lib/styles';
import { processRowUpdate } from '../lib/actionUtils';
import { createGridColumns } from '../lib/gridColumns';

export default function TaskDashboard() {
  const [rows, setRows] = React.useState<GridRowsProp<Task>>([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});
  const [statusOptions, setStatusOptions] = React.useState<Status[]>([]);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [task, setTask] = React.useState<Task>();
  const [isSuccessAlertOn, setIsSuccessAlertOn] = React.useState(false);
  const [isErrorAlertOn, setIsErrorAlertOn] = React.useState(false);

  React.useEffect(() => {
    getAllTasksAPI()
      .then((data) => setRows(data.content))
      .catch((error) => console.error(error));
    getStatusesFromAPI()
        .then((data) => setStatusOptions(data))
      .catch((error) => console.error(error));
  }, []);

  const handleRowEditStart: GridEventListener<'rowEditStart'> = (params, event) => {
    if (params.reason === GridRowEditStartReasons.cellDoubleClick) {
      event.defaultMuiPrevented = true; //Prevent entering edit mode when double clicking any cell
    }
  };

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    event.defaultMuiPrevented = true; //Prevent exiting edit mode, so only way is clicking Cancel button
  };

  const processRowUpdateWrapper = async (originalRow: Task): Promise<Task> => {
    const newRow = await processRowUpdate(originalRow, statusOptions, rows, setRows, setIsSuccessAlertOn, setIsErrorAlertOn);
    return newRow;
  };

  const columns = React.useMemo(
    () => createGridColumns(
        statusOptions, 
        rowModesModel, 
        setRowModesModel, 
        rows, 
        setRows, 
        setTask, 
        setIsModalOpen, 
        setIsSuccessAlertOn, 
        setIsErrorAlertOn
    ), [
     statusOptions, 
     rowModesModel, 
     setRowModesModel, 
     rows, 
     setRows, 
     setTask, 
     setIsModalOpen, 
     setIsSuccessAlertOn, 
     setIsErrorAlertOn
    ]
  );

  columns.splice(2, 1); // Remove the "Created Date and Time" column
  
  return (
    <Box sx={dashboardBoxStyle}>
    {rows.length === 0 ? (
      <Typography>{RETRIEVING_LIST_MESSAGE}</Typography>
    ) : (
      [
      <DataGrid
        key="task-data-grid"
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowEditStop={handleRowEditStop}
        onRowEditStart={handleRowEditStart}
        processRowUpdate={processRowUpdateWrapper}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />,
      <TaskModal
        key="task-modal"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={task}
      />
    ]
    )}
    {isSuccessAlertOn === true && (
        <Alert severity="success" onClose={() => setIsSuccessAlertOn(false)}>
            <AlertTitle>{SUCCESS_ALERT_TITLE}</AlertTitle>
            {SUCCESS_ALERT_DESCRIPTION}
        </Alert>
    )}
    {isErrorAlertOn === true && (
        <Alert severity="error" onClose={() => setIsErrorAlertOn(false)}>
            <AlertTitle>{ERROR_ALERT_TITLE }</AlertTitle>
            {ERROR_ALERT_DESCRIPTION}
        </Alert>
    )}
    </Box>
  );
}
