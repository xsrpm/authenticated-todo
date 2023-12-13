import { Avatar, Box, Button, Container, Typography } from '@mui/material';
import {useRef} from 'react'
import { useAuth } from '../components/Auth/AuthContext';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { Formik, Field } from 'formik';
import * as Yup from "yup";
import { TextField } from 'formik-mui';

export function UpdatePassword(){
    const auth = useAuth()
    const buttonRef = useRef(null)    
    return(
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
                <Typography component="h1" variant="h4">
                    Actualizar Password
                </Typography>
                <Typography component="h2" variant="h5">
                    Enter a new password
                </Typography>
                <Formik
                    initialValues={{
                        password: "",
                        confirmPassword: ""
                    }}
                    validationSchema={Yup.object({
                        password: Yup.string().required("Required"),
                        confirmPassword: Yup.string().required('Required')
                    })}
                    onSubmit={async (values, { setSubmitting }) => {
                        // alert(JSON.stringify(values, null, 2));
                        console.log(values.password)
                        await auth.updatePassword(values.password);
                        ((buttonRef.current as unknown) as HTMLInputElement).disabled = true;
                        alert("Password actualizado")
                    }}
                >
                    <>
                        <Box sx={{ display:'flex', flexDirection:"column", gap: "1rem",margin: "1rem" }}>
                            <Field
                                label="New password"
                                name="password"
                                type="password"
                                fullWidth
                                component={TextField}
                                />
                            <Field
                                label="Confirm password"
                                name="confirmPassword"
                                type="password"
                                fullWidth
                                component={TextField}
                                />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            ref={buttonRef}
                            >
                                Update password
                        </Button>
                    </>
                </Formik>
            </Box>
        </Container>
    )
}