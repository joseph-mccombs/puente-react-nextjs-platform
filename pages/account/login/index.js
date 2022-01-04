import { yupResolver } from '@hookform/resolvers';
import {
  Avatar, Button, Grid, Paper, TextField, Typography,
} from '@material-ui/core';
// import FormRadio from "app/components/molecules/dashboard/form-controls/radio";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Link } from 'app/components/elements';
import FormCheckbox from 'app/components/molecules/dashboard/form-controls/checkbox';
// import FormSelect from "app/components/molecules/dashboard/form-controls/select";
// import FormSelectAutoComplete from "app/components/molecules/dashboard/form-controls/select-autocomplete";
import FormDatePicker from 'app/components/molecules/dashboard/form-controls/datepicker';
import FormInput from 'app/components/molecules/dashboard/form-controls/input';
import Page from 'app/components/templates/dashboard-layout';
import { FormProvider, useForm } from 'react-hook-form';
// import { useRouter } from 'next/router';
// import { alertService, userService } from 'services';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
  nameV: yup.string().required('Name Validation Field is Required'),
  selV: yup.string().required('Select Validation Field is Required'),
  selAutoV: yup.array().required('Multi Select Validation Field required'),
  txtDateV: yup
    .date()
    .typeError('Mui Date field must be a date')
    .required('Mui Date field is required'),
});

const Login = () => {
  // const router = useRouter();
  const methods = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { handleSubmit, errors } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  const paperStyle = {
    padding: 20, height: '70vh', width: '50vw', margin: '20px auto',
  };
  const avatarStyle = { backgroundColor: '#1bbd7e' };
  const btnstyle = { margin: '8px 0' };

  return (
    <Page>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}><LockOutlinedIcon /></Avatar>
            <h2>Login</h2>
          </Grid>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FormInput name="name" label="Name" />
                </Grid>
                <Grid item xs={6}>
                  <FormInput
                    name="nameV"
                    label="Name with Validation"
                    required
                    errorobj={errors}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormDatePicker name="txtDate" label="Mui Date" />
                </Grid>
                {/* <Grid item xs={6}>
                                <FormDatePicker
                                name="txtDateV"
                                label="Mui Date Validation"
                                required={true}
                                errorobj={errors}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormCheckbox name="chk" label="Mui Checkbox" />
                            </Grid> */}
              </Grid>
              <button disabled={false}>
                Login
              </button>
              <Link href="/account/register">Register</Link>
            </form>
          </FormProvider>
        </Paper>
      </Grid>
    </Page>
  );
};

export default Login;
