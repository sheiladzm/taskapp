import React from 'react';
import Typography from '@mui/material/Typography';
import { formatDateTime } from '../lib/utils';
import { Task } from '../lib/types';
import { TASK_LABEL, DESCRIPTION_LABEL, CREATED_LABEL, DUE_LABEL, STATUS_LABEL } from '../lib/constants';

interface TaskInfoProps {
  task: Task | undefined;
}

export default function TaskInfo({ task }: TaskInfoProps) {
  const taskInfoList = [
    { label: TASK_LABEL, value: task?.title || '' },
    { label: DESCRIPTION_LABEL, value: task?.description || '' },
    { label: CREATED_LABEL, value: task?.createdDateTime ? formatDateTime(task?.createdDateTime) : '' },
    { label: DUE_LABEL, value: task?.dueDateTime ? formatDateTime(task.dueDateTime) : '' },
    { label: STATUS_LABEL, value: typeof task?.status === 'object' ? task?.status?.name : '' },
  ];

  return (
    <div>
      {taskInfoList.map((taskInfo, index) => (
        <Typography key={index} sx={{ mt: index > 0 ? 2 : 0 }}>
          {taskInfo.label} {taskInfo.value}
        </Typography>
      ))}
    </div>
  );
}
