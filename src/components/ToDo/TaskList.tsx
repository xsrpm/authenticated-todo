import { useEffect } from "react";
import { TaskCard } from "./TaskCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useTasks } from "./TaskContext";
import { Typography } from "@mui/material";

export function TaskList() {
  const { tasks, getTasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, []);
  if (tasks.length === 0) return <Typography>No Tasks found</Typography>;
  return (
    <List sx={{ display: "flex", flexDirection: "column" }}>
      {tasks.map((task) => {
        return (
          <ListItem key={task.id}>
            <TaskCard task={task} />
          </ListItem>
        );
      })}
    </List>
  );
}
