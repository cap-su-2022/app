import {
  Button,
  createStyles,
  PasswordInput,
  Text,
  TextInput,
} from '@mantine/core';
import { useFormik } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import { Check, X } from 'tabler-icons-react';
import { useAppDispatch } from '../../redux/hooks';
import { showNotification } from '@mantine/notifications';
import { changePassword } from '../../redux/features/account/thunk/change-password.thunk';
=======
  TextInput
} from "@mantine/core";
import { useFormik } from "formik";
import * as React from "react";
import * as Yup from "yup";
import { Check, X } from "tabler-icons-react";
import { useAppDispatch } from "../../redux/hooks";
import { showNotification } from "@mantine/notifications";
import { changePassword } from "../../redux/features/account/thunk/change-password.thunk";
>>>>>>> origin/develop

export default function ChangePassword({ username }) {
  const { classes } = useStyles();
  const initialFormValues = {
    newPass: '',
    confirmPass: '',
  };

  const dispatch = useAppDispatch();

  const ChangePassSchema = Yup.object().shape({
    newPass: Yup.string()
      .min(5, 'Password must be between 5-50 characters')
      .max(50, 'Password must be between 5-50 characters')
      .required('Password is required'),
    confirmPass: Yup.string().oneOf(
      [Yup.ref('newPass'), null],
      'Passwords must match'
    ),
  });

  const handleChangePassSubmit = async (value) => {
    dispatch(
      changePassword({
<<<<<<< HEAD
        password: value.newPass,
=======
        password: value.newPass
>>>>>>> origin/develop
      })
    )
      .unwrap()
      .then(() =>
        showNotification({
<<<<<<< HEAD
          id: 'load-data',
          color: 'teal',
          title: 'Data was updated',
          message: 'Your profile was updated successfully',
          icon: <Check />,
          autoClose: 3000,
=======
          id: "load-data",
          color: "teal",
          title: "Data was updated",
          message: "Your profile was updated successfully",
          icon: <Check />,
          autoClose: 3000
>>>>>>> origin/develop
        })
      )
      .catch((e) => {
        showNotification({
<<<<<<< HEAD
          id: 'load-data',
          color: 'red',
          title: 'Have error',
          message: `${e.message}`,
          icon: <X />,
          autoClose: 3000,
=======
          id: "load-data",
          color: "red",
          title: "Have error",
          message: `${e.message}`,
          icon: <X />,
          autoClose: 3000
>>>>>>> origin/develop
        });
      });
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    enableReinitialize: true,
    validationSchema: ChangePassSchema,
<<<<<<< HEAD
    onSubmit: (values) => handleChangePassSubmit(values),
=======
    onSubmit: (values) => handleChangePassSubmit(values)
>>>>>>> origin/develop
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className={classes.header}>
        <Text
          size="lg"
<<<<<<< HEAD
          sx={{ textTransform: 'uppercase' }}
=======
          sx={{ textTransform: "uppercase" }}
>>>>>>> origin/develop
          weight={500}
          color="blue"
        >
          Change password for {username}
        </Text>
      </div>

      <PasswordInput
        id="newPass"
        description="Input your new password"
<<<<<<< HEAD
        onChange={formik.handleChange('newPass')}
=======
        onChange={formik.handleChange("newPass")}
>>>>>>> origin/develop
        error={
          formik.touched.newPass && Boolean(formik.errors.newPass)
            ? formik.errors.newPass
            : null
        }
        value={formik.values.newPass}
<<<<<<< HEAD
        label={'New Password'}
=======
        label={"New Password"}
>>>>>>> origin/develop
        required
        name="newPass"
        className={classes.inputText}
        placeholder="New Password"
      />

      <PasswordInput
        id="confirmPass"
        description="Confirm your new password"
<<<<<<< HEAD
        onChange={formik.handleChange('confirmPass')}
=======
        onChange={formik.handleChange("confirmPass")}
>>>>>>> origin/develop
        error={
          formik.touched.confirmPass && Boolean(formik.errors.confirmPass)
            ? formik.errors.confirmPass
            : null
        }
        value={formik.values.confirmPass}
<<<<<<< HEAD
        label={'Confirm Password'}
=======
        label={"Confirm Password"}
>>>>>>> origin/develop
        required
        name="confirmPass"
        className={classes.inputText}
        placeholder="Confirm Password"
      />

      <div
        style={{
<<<<<<< HEAD
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: '50px',
          width: '100%',
=======
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "50px",
          width: "100%"
>>>>>>> origin/develop
        }}
      >
        <Button color="green" type="submit" name="change">
          Save Changes
        </Button>
      </div>
    </form>
  );
}
const useStyles = createStyles(() => {
  return {
    header: {
<<<<<<< HEAD
      display: 'flex',
      justifyContent: 'center',
      marginTop: 20,
    },
    inputText: {
      marginTop: 10,
    },
=======
      display: "flex",
      justifyContent: "center",
      marginTop: 20
    },
    inputText: {
      marginTop: 10
    }
>>>>>>> origin/develop
  };
});
