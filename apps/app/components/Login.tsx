import React, {useCallback} from 'react';
import {
  createStyles,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';
import Image from 'next/image';
import Divider from "./divider";
import Asterisk from "./asterisk";
import {Form, Formik, Field, useFormik} from 'formik';
import * as Yup from 'yup';

const SigninSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Too short!')
    .max(100, 'Too long!')
    .required('Required!'),
  password: Yup.string()
    .min(2, 'Too short!')
    .max(100, 'Too long!')
    .required('Required!'),
})

export function LoginComponent() {
  const {classes} = useStyles();

  const initialValues = {
    username: '',
    password: '',
  }

  const handleGoogleLoginSubmit = () => {

  }

  const handleLoginSubmit = (values) => {

  }

  const UsernameLabel = () => {
    return (
      <div className={classes.flex}>
        Username <Asterisk/>
      </div>
    );
  };

  const PasswordLabel = () => {
    return (
      <div className={classes.flex}>
        Password <Asterisk/>
      </div>
    );
  };

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: SigninSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <div className={classes.logoContainer}>
              <Image src="/LogoFPTU.svg" height={150} width={200}/>
            </div>

            <TextInput
              onChange={formik.handleChange}
              error={formik.touched.username && Boolean(formik.errors.username)}
              value={formik.values.username}
              label={<UsernameLabel/>}
              placeholder="Your username"
              name="username"
              size="md"/>
            {formik.touched.username && Boolean(formik.errors.username)
              ? <div style={{color: 'red'}}>{formik.errors.username}</div>
              : null}

            <PasswordInput
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              value={formik.values.password}
              label={<PasswordLabel/>}
              placeholder="Your password"
              mt="md"
              name="password"
              size="md"/>
            {formik.touched.password && Boolean(formik.errors.password)
              ? <div style={{color: 'red'}}>{formik.errors.password}</div>
              : null}

            <Button type="submit" className={classes.loginButton} fullWidth mt="xl" size="md">
              Login
            </Button>

            <div className={classes.dFlexCenter}>
              <Divider num={20}/>
              <div className={classes.dividerText}>Or continue with</div>
              <Divider num={20}/>
            </div>

            <div className={classes.googleLoginButtonContainer}>
              <Button type="button" className={classes.googleLoginButton}>
                <Image src="/google-icon.svg" height={24} width={24}/>
                <div className={classes.googleLoginButtonText}>Google</div>
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    backgroundColor: 'rgb(248, 249, 250)',
    borderRadius: 8,
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    width: 550
  },

  form: {
    margin: 20,
    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    height: '100vh'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(/background.svg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flex: {
    display: 'flex',
  },
  loginButton: {
    backgroundColor: "#f06e28",
    borderRadius: 50,
    height: 50,
    fontSize: 20
  },
  dividerText: {
    fontSize: 16,
    color: 'rgb(134, 142, 150)',
    marginTop: 10,
    marginLeft: 6,
    marginRight: 6,
  },
  dFlexCenter: {
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    marginRight: 6,
    marginTop: 2
  },
  googleLoginButtonContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 6
  },
  googleLoginButton: {
    backgroundColor: '#fff',
    borderRadius: 50,
    width: 150,
    height: 50,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    border: '1px solid rgb(206, 212, 218)'
  },
  googleLoginButtonText: {
    marginLeft: 6,
    color: '#000',
    fontSize: 18
  }
}));
