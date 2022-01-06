import { yupResolver } from '@hookform/resolvers';
import {
  Avatar, Button, Grid, Paper,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'app/components/elements';
import FormInput from 'app/components/molecules/dashboard/form-controls/input';
import Page from 'app/components/templates/dashboard-layout';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
// import { alertService, userService } from 'services';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  usernameV: yup.string().required('Username is Required'),
  passwordV: yup.string().required('Password is Required'),
});

const Login = () => {
  const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, errors } = methods;

  const onSubmit = (data) => {
    console.log(data); //eslint-disable-line
    router.push('/quick-start');
  };

  const paperStyle = {
    padding: 20, height: '70vh', width: '50vw', margin: '20px auto',
  };

  const avatarStyle = { backgroundColor: 'black' };
  return (
    <Page>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h2>Login</h2>
          </Grid>
          <FormProvider {...methods}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormInput
                    name="usernameV"
                    label="Username"
                    required
                    errorobj={errors}
                  />
                  <FormInput
                    name="passwordV"
                    label="Password"
                    required
                    errorobj={errors}
                  />
                </Grid>
              </Grid>
            </form>
          </FormProvider>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit(onSubmit)}
          >
            Login
          </Button>
          <Link href="/account/register">
            <Button
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </Link>
        </Paper>
      </Grid>
    </Page>
  );
};

export default Login;
