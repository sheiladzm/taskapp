import * as React from 'react';
import { OVERDUE_LABEL } from "./constants";
import { Typography } from "@mui/material";
import { 
    GridActionsCellItem,
    GridRenderCellParams,
    GridRowId,
    GridRowModes,
    GridRowModesModel,
    GridTreeNodeWithRender
} from '@mui/x-data-grid';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import PreviewOutlinedIcon from '@mui/icons-material/PreviewOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { handleCancelClick, handleDeleteClick, handleEditClick, handlePreviewClick, handleSaveClick } from './actionUtils';
import { Task } from './types';

export const getStatusName = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const statusObject = params.row.status;
    if (statusObject && statusObject.name) {
        return statusObject.name;
    }
    return '';
};

export const getActionsContent = (
  id: GridRowId,
  rowModesModel: GridRowModesModel,
  setRowModesModel: React.Dispatch<React.SetStateAction<GridRowModesModel>>,
  rows: readonly Task[],
  setRows: (value: React.SetStateAction<readonly Task[]>) => void,
  setTask: (value: React.SetStateAction<Task | undefined>) => void, 
  setIsModalOpen: (value: React.SetStateAction<boolean>) => void,
  setIsSuccessAlertOn: React.Dispatch<React.SetStateAction<boolean>>,
  setIsErrorAlertOn: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

  if (isInEditMode) {
    return [
      <GridActionsCellItem
        icon={<SaveIcon />}
        label="Save"
        sx={{
          color: 'primary.main',
        }}
        onClick={handleSaveClick(id, rowModesModel, setRowModesModel)}
      />,
      <GridActionsCellItem
        icon={<CancelIcon />}
        label="Cancel"
        className="textPrimary"
        onClick={handleCancelClick(id, rows, setRows, setRowModesModel, rowModesModel)}
        color="inherit"
      />,
    ];
  }

  return [
    <GridActionsCellItem
      icon={<EditIcon />}
      label="Edit"
      className="textPrimary"
      onClick={handleEditClick(id, rowModesModel, setRowModesModel)}
      color="inherit"
    />,
    <GridActionsCellItem
      icon={<PreviewOutlinedIcon />}
      label="Preview"
      onClick={handlePreviewClick(id, setTask, setIsModalOpen)}
      color="inherit"
    />,
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={handleDeleteClick(id, rows, setRows, setIsSuccessAlertOn, setIsErrorAlertOn)}
      color="inherit"
    />,
  ];
};

export const renderOverdueContent = (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => {
    const isOverdue = params.row.status.name !== 'Done' && params.value < new Date().getTime();
    if (isOverdue) {
      return <Typography color="error">{OVERDUE_LABEL}</Typography>;
    }
    return null;
};
