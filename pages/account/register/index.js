import { yupResolver } from '@hookform/resolvers';
import {
  Avatar, Button, Grid, Paper,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'app/components/elements';
import FormDatePicker from 'app/components/molecules/dashboard/form-controls/datepicker';
import FormInput from 'app/components/molecules/dashboard/form-controls/input';
import Page from 'app/components/templates/dashboard-layout';
import { useRouter } from 'next/router';
import { FormProvider, useForm } from 'react-hook-form';
// import { alertService, userService } from 'services';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  firstname: yup.string().required('Username is Required'),
  lastname: yup.string().required('Password is Required'),
  dateOfBirth: yup
    .date()
    .typeError('Mui Date field must be a date')
    .required('Mui Date field is required'),
  username: yup.string().required('Username is Required'),
  password: yup.string().required('Password is Required'),
});

const Register = () => {
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

  const avatarStyle = { backgroundColor: '#1bbd7e' };

  return (
    <Page>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h2>Registration</h2>
          </Grid>
          <FormProvider {...methods}>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormInput
                    name="firstname"
                    label="First Name"
                    required
                    errorobj={errors}
                  />
                  <FormInput
                    name="lastname"
                    label="Last Name"
                    required
                    errorobj={errors}
                  />
                  <Grid item xs={6}>
                    <FormDatePicker name="dateOfBirth" label="Date of Birth" />
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    name="username"
                    label="Username"
                    required
                    errorobj={errors}
                  />
                  <FormInput
                    name="password"
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
            Register
          </Button>
          <Link href="/account/login">
            <Button
              color="primary"
            >
              Cancel
            </Button>
          </Link>
        </Paper>
      </Grid>
    </Page>
  );
};

export default Register;
