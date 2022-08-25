import Stack from '@mui/material/Stack';
import { TaskProvider} from './TaskContext'
import { TaskList } from './TaskList';
import { AddButton } from './AddButton';

export function TodoComponent() {
  return (
    <TaskProvider>
      <Stack
        sx={{
          mt: 4,
          mb: 4,
          ml: 2,
          mr: 2,
          position: "relative",
        }}
      >
        <TaskList />
        <AddButton />
      </Stack>
    </TaskProvider>
  );
}