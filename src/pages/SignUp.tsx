
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { Link as RouterLink} from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {  Field, Form, Formik } from "formik";
import { TextField} from "formik-mui";
import * as Yup from "yup";
import { useAuth } from '../components/Auth/AuthContext';
import {  useNavigate} from "react-router-dom";

  export function SignUp() {
    const auth = useAuth()
    const navigate = useNavigate()
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: ""
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
              lastName: Yup.string().max(15, "Must be 15 characters or less").required("Required"),
              email: Yup.string().email("Invalid email address").required("Required"),
              password: Yup.string().required("Required")
            })}
            onSubmit={async (values, { setSubmitting }) => {
                // alert(JSON.stringify(values, null, 2));
                await auth.signUp(values,()=>{
                  navigate("/")
                  // setSubmitting(false);
                })
            }}
          >
            <Box component={Form} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="firstName"
                    label="First Name"
                    type="text"
                    fullWidth
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    label="Last Name"
                    name="lastName"
                    type="text"
                    fullWidth
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12} >
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    fullWidth
                    component={TextField}
                  />
                </Grid>
                <Grid item xs={12} >
                  <Field
                    name="password"
                    label="Password"
                    type="password"
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
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link to="/signin" variant="body2" component={RouterLink}>
                      Already have an account? Sign in
                    </Link>
                </Grid>
              </Grid>
            </Box>
          </Formik>
          </Box>
        </Container>
    );
  }
