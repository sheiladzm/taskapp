import { GridRowId, GridRowModes, GridRowModesModel } from "@mui/x-data-grid";
import { Status, Task } from "./types";
import { addTaskAPI, deleteTaskAPI, getTaskAPI, updateTaskAPI } from "../services/api/Task";

export const handleSaveClick = (id: GridRowId, rowModesModel: GridRowModesModel, setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
};

export const handleEditClick = (id: GridRowId, rowModesModel: GridRowModesModel, setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
};

export const processRowUpdate = async (
  originalRow: Task,
  statusOptions: Status[],
  rows: readonly Task[], 
  setRows: (value: React.SetStateAction<readonly Task[]>) => void,
  setIsSuccessAlertOn: React.Dispatch<React.SetStateAction<boolean>>,
  setIsErrorAlertOn: React.Dispatch<React.SetStateAction<boolean>>,
) => {    
  try {
  const statusName = originalRow.status;
  const statusObject = statusOptions.find((option) => option.name === statusName);

    if (statusObject === undefined) {
      console.error('Status object is undefined.');
      setRows(rows.filter((row) => row.id !== originalRow.id));
      setIsErrorAlertOn(true);
      return originalRow;
    }

    if (originalRow.isNew) {
      const newTask = { ...originalRow, isNew: false, status: statusObject };
      const newTaskData = await addTaskAPI(newTask);
      if (newTaskData) {
          setRows((prevRows) => [
              ...prevRows.filter((row) => row.id !== newTask.id),
              { ...newTaskData },
          ]);
          setIsSuccessAlertOn(true);
      }
      return newTask;
    } else {
      const updatedTask = { ...originalRow, status: statusObject }
      const updatedTaskData = await updateTaskAPI(updatedTask);
      if (updatedTaskData) {
       setRows((prevRows) =>
        prevRows.map((row) => (row.id === updatedTask.id ? updatedTaskData : row))
       );
       setIsSuccessAlertOn(true);
      }
      return updatedTask;
    }
  } catch (error) {
    console.error('An error occurred while adding or updating a task: ', error);
    setRows(rows.filter((row) => row.id !== originalRow.id));
    setIsErrorAlertOn(true);
    return originalRow;
  }
};

export const handleCancelClick = (
    id: GridRowId, 
    rows: readonly Task[], 
    setRows: (value: React.SetStateAction<readonly Task[]>) => void, 
    setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>, 
    rowModesModel: GridRowModesModel 
) => () => {
    const currentRow = rows.find((row) => row.id === id);
    if (!currentRow) {
        setRows(rows.filter((row) => row.id !== id));
        return; // No current row found, exit early
    }
    if (currentRow.isNew) {
        setRows(rows.filter((row) => row.id !== id));
    }
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
};

export const handleDeleteClick = (
    id: GridRowId,
    rows: readonly Task[],
    setRows: (value: React.SetStateAction<readonly Task[]>) => void,
    setIsSuccessAlertOn: React.Dispatch<React.SetStateAction<boolean>>,
    setIsErrorAlertOn: React.Dispatch<React.SetStateAction<boolean>>,
) => () => {
    deleteTaskAPI(id)
      .then(() => {
        setRows(rows.filter((row) => row.id !== id));
        setIsSuccessAlertOn(true);
      })
      .catch((error) => {
        console.error(error)
        setIsErrorAlertOn(true);
      });
};

export const handlePreviewClick = (
    id: GridRowId, 
    setTask: (value: React.SetStateAction<Task | undefined>) => void, 
    setIsModalOpen: (value: React.SetStateAction<boolean>) => void
) => async () => {
    try {
      const data = await getTaskAPI(id);
      setTask(data);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    }
};
