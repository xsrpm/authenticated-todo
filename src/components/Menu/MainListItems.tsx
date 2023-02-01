import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TaskIcon from '@mui/icons-material/Task';
import { useNavigate} from "react-router-dom";

export const MainListItems = ()=>{
  const navigate = useNavigate()
  return(
  <React.Fragment>
    <ListItemButton onClick={()=>navigate("/")}>
      <ListItemIcon>
        <TaskIcon />
      </ListItemIcon>
      <ListItemText primary="TO-DO"  />
    </ListItemButton>
  </React.Fragment>
)
}