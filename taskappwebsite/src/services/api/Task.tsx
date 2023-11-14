import { GridRowId } from "@mui/x-data-grid";
import { Task } from "../../scenes/TaskDashboard";
import { BASE_TASK_URL } from "./apiConstants";

export async function getAllTasksAPI() {
    try {
      const response = await fetch(`${BASE_TASK_URL}/list`);

      if (!response.ok) {
        throw new Error('Failed to fetch list of tasks from the API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
        console.error('Error processing request to fetch list of tasks.', error);
    }
}

export async function getTaskAPI(id: GridRowId) {
    try {
      const response = await fetch(`${BASE_TASK_URL}/${id}`);

      if (response.status === 302) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch the task from the API.');
      }
    } catch (error) {
        console.error('Error processing request to fetch the task data.', error);
    }
}

export async function addTaskAPI(task: Task) {
    const { title, description, dueDateTime, status } = task;
    try {
        const response = await fetch(`${BASE_TASK_URL}/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title,
            description,
            dueDateTime,
            status
          }),
        });
    
        if (response.status === 201) {
            const data = await response.json();
            return data;
        } else {
          throw new Error('Failed to create new task from the API.');
        }
      } catch (error) {
        console.error('Error processing request to add and retrieve task.', error);
        throw error;
      }
}

export async function deleteTaskAPI(id: GridRowId) {
    try {
        const response = await fetch(`${BASE_TASK_URL}/delete/${id}`, {
          method: 'DELETE',
        });

        if (response.status === 204) {
            return response.status;
         } else {
            throw new Error('Failed to delete task from the API.');        }
      } catch (error) {
        console.error('Error processing request to delete task.', error);
        throw error;
      }
}

export async function updateTaskAPI(task: Task) {
    const { title, description, dueDateTime, status } = task;
    try {
      const response = await fetch(`${BASE_TASK_URL}/${task.id}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          dueDateTime,
          status
        }),
      });
      
      if (response.status === 302) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to get updated task from the API');
      }
    } catch (error) {
        console.error('Error processing request to update data', error);
    }
}
