import * as React from 'react';
import { Modal, Box } from '@mui/material';
import { Task } from '../lib/types';
import { modalStyle } from '../lib/styles';
import TaskInfo from './TaskInfo';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | undefined;
}

export default function TaskModal({ isOpen, onClose, task }: TaskModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <TaskInfo task={task} />
      </Box>
    </Modal>
  );
}
