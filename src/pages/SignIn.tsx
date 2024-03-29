import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { Link as RouterLink, useNavigate} from "react-router-dom";
import {  Field, Form, Formik } from "formik";
import { TextField} from "formik-mui";
import * as Yup from "yup";
import { useAuth } from '../components/Auth/AuthContext';


export function SignIn(){
    const navigate = useNavigate()
    const auth = useAuth()
    return(
        <Grid container  sx={{ height: '100vh' }}>
            <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
                backgroundImage: 'url(https://source.unsplash.com/random)',
                backgroundRepeat: 'no-repeat',
                backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>

                <Formik
            initialValues={{
              email: "",
              password: ""
            }}
            validationSchema={Yup.object({
              email: Yup.string().email("Invalid email address").required("Required"),
              password: Yup.string().required("Required")
            })}
            onSubmit={async (values, { setSubmitting }) => {
                // alert(JSON.stringify(values, null, 2));
                const { data, messageError } = await auth.signIn(values);
                if (data) navigate("/");
                else {
                  console.error(messageError);
                  alert(messageError);
                } 
            }}
          >
                <Box component={Form} noValidate sx={{ mt: 1 }}>
                <Field
                    margin="normal"
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoFocus
                    component={TextField}
                />
                <Field
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    component={TextField}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                        <Link to="/reset-password" variant="body2" component={RouterLink}>
                        {"Forgot password?"}
                        </Link>
                    </Grid>
                    <Grid item>
                    <Link to="/signup" variant="body2" component={RouterLink}>
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </Box>
            </Formik>
            </Box>
            </Grid>
        </Grid>
    )
}