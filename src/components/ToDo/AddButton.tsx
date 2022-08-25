import Fab from '@mui/material/Fab'
import AddIcon from '@mui/icons-material/Add';
import { Dialog,  DialogContent, DialogTitle } from '@mui/material';
import { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { TextField } from 'formik-mui';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import {useTasks} from './TaskContext'


export function AddButton(){
    const [openDialog, setOpenDialog] = useState(false);
    const handleClickOpen = () => {
      setOpenDialog(true);
    };
    const handleClose = () => {
      setOpenDialog(false);
    };
    const taskContext = useTasks()

    return (<>
        <Fab sx={{
            bottom:"0",
            position:"absolute",
            right:"0"
            }}
            color="primary"
            aria-label=""
            onClick={handleClickOpen}
          >
            <AddIcon />
          </Fab>
          <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"New task"}
          </DialogTitle>
          <DialogContent>
          <Formik
              initialValues={{
                taskName: ""
              }}
              onSubmit={async (values, { setSubmitting }) => {
                  // alert(JSON.stringify(values, null, 2));
                  taskContext?.addNewTask(values.taskName)
                  setOpenDialog(false)
              }}
              >
            <Box component={Form} noValidate sx={{ mt: 1 }}>
            <Field
                      margin="normal"
                      fullWidth
                      label="Task"
                      name="taskName"
                      autoFocus
                      component={TextField}
                  />
                <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                  >
                      Add new task
                  </Button>
            </Box>
          </Formik>
          </DialogContent>
        </Dialog>
        </>
    )
}