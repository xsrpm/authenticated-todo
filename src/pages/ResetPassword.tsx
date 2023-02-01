import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Link, Typography } from '@mui/material';
import { useAuth } from '../components/Auth/AuthContext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Field, Form, Formik } from 'formik';
import * as Yup from "yup";
import { TextField } from 'formik-mui';
import { Link as RouterLink} from "react-router-dom";
import {useState} from 'react'

export function ResetPassword(){
    const [open, setOpen] = useState(false);
    const auth = useAuth()
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    return (
        <Container maxWidth="xs">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <RestartAltIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Forgot your password?
            </Typography>
            <Typography component="h2" variant="h6">
            You can reset your password here.
            </Typography>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email address").required("Required")
            })}
            onSubmit={async (values, { setSubmitting }) => {
                // alert(JSON.stringify(values, null, 2));
                await auth.resetPasswordForEmail(values.email)
                handleClickOpen()
            }}
          >
            <Box component={Form} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} >
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    fullWidth
                    component={TextField}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Send password reset email
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Reset Password"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    The email was sended.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
              <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to="/signin" variant="body2" component={RouterLink}>
                      Back to Sign in
                    </Link>
                </Grid>
              </Grid>
            </Box>
          </Formik>
          </Box>
        </Container>
    )
}