import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { randomId } from '@mui/x-data-grid-generator';
import { ADD_TASK_LABEL } from '../lib/constants';
import { GridRowModes, GridRowModesModel, GridRowsProp, GridToolbarContainer } from '@mui/x-data-grid';

interface EditToolbarProps {
    setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
    setRowModesModel: (
      newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
    ) => void;
};
  
export default function EditToolbar(props: EditToolbarProps) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [...oldRows, { id, title: '', description: '', status: '', isNew: true }]);
        setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'title' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                {ADD_TASK_LABEL}
            </Button>
        </GridToolbarContainer>
    );
};
