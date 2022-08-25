import { Task } from "./TaskContext";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Typography,
  Unstable_Grid2,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {
  task: Task;
};

export function TaskCard({ task }: Props) {
  const [checked, setChecked] = useState(task.done);
  const handleChangeCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <Unstable_Grid2 container component="article" sx={{ width: "100%" }}>
      <Unstable_Grid2 xs={11}>
        <FormControlLabel
          label={task.name}
          control={<Checkbox checked={checked} onChange={handleChangeCheck} />}
        />
      </Unstable_Grid2>
      <Unstable_Grid2 xs={1}>
        <Button>
          <DeleteIcon color="secondary" />
        </Button>
      </Unstable_Grid2>
    </Unstable_Grid2>
  );
}
