import { useTasks } from './TaskContext'
import { useEffect } from "react";
import { TaskCard } from "./TaskCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

export function TaskList() {
  const { tasks, getTasks } = useTasks();
  useEffect(() => {
    getTasks();
  }, []);
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