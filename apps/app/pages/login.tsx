import React, {useEffect} from 'react';
import {
  createStyles,
  TextInput,
  PasswordInput,
  Button,
} from '@mantine/core';
import Image from 'next/image';

import {useFormik} from 'formik';
import * as Yup from 'yup';
import {BLACK, FPT_ORANGE_COLOR, WHITE} from "../constants/color";
import {dFlexCenter} from "../constants/css";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {toggleSpinnerOff, toggleSpinnerOn} from "../redux/features/spinner";
import {useRouter} from "next/router";
import {GetServerSideProps} from "next";
import Divider from "../components/divider";
import {doLogin} from "../redux/features/user/auth.thunk";
import LoginFailedModal from "../components/login-fail.modal";

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

interface LoginInitialState {
  isLoginFailedModalShown: boolean,
  isLoginFailed: boolean,
  loginErrorMsg: string;
}

function Login() {
  const {classes} = useStyles();

  const router = useRouter();

  const dispatch = useAppDispatch();
  const isLoginLoading = useAppSelector((state) => state.auth.isLoading);
  const userLoginSuccessResponse = useAppSelector((state) => state.auth.userLoginResponse);

  useEffect(() => {
    if (isLoginLoading) {
      dispatch(toggleSpinnerOn());
    } else {
      dispatch(toggleSpinnerOff());
    }
  }, [isLoginLoading]);

  useEffect(() => {
    router.replace('rooms');
  }, [userLoginSuccessResponse.access_token]);


  const handleGoogleLoginSubmit = () => {
    return;
  }

  const handleLoginSubmit = async (values) => {
      dispatch(doLogin({
        username: values.username,
        password: values.password,
      }));
  }

  const initialFormValues = {
    username: '',
    password: '',
  }

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: SigninSchema,
    onSubmit: (values) => handleLoginSubmit(values)
  });

  return (
    <>
      <div className={classes.header}>
        <div className={classes.container}>
          <div className={classes.wrapper}>
            <form onSubmit={formik.handleSubmit} className={classes.form}>
              <div className={classes.logoContainer}>
                <Image alt="FPTU Logo" src="/LogoFPTU.svg"
                       height={150}
                       width={200}/>
              </div>

              <TextInput
                id="username"
                onChange={formik.handleChange}
                error={formik.touched.username && Boolean(formik.errors.username)}
                value={formik.values.username}
                label={"Username"}
                required
                placeholder="Your username or email address"
                name="username"
                size="md"/>
              {formik.touched.username && Boolean(formik.errors.username)
                ? <div style={{color: 'red'}}>{formik.errors.username}</div>
                : null}

              <PasswordInput
                id="password"
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                value={formik.values.password}
                label="Password"
                placeholder="Your password"
                mt="md"
                required
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
                  <Image alt="Google-icon" src="/google-icon.svg" height={24} width={24}/>
                  <div className={classes.googleLoginButtonText}>Google</div>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <LoginFailedModal/>
    </>
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
    ...dFlexCenter
  },
  container: {
    height: '100%',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundImage: 'url(/background.svg)',
    ...dFlexCenter
  },
  flex: {
    display: 'flex',
  },
  loginButton: {
    backgroundColor: FPT_ORANGE_COLOR,
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
    ...dFlexCenter
  },
  googleIcon: {
    marginRight: 6,
    marginTop: 2
  },
  googleLoginButtonContainer: {
    ...dFlexCenter,
    marginTop: 6
  },
  googleLoginButton: {
    backgroundColor: WHITE,
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
    color: BLACK,
    fontSize: 18
  }
}));

export default Login;

export const getServerSideProps: GetServerSideProps = async () => {

  return {

    props: {
      users: null,
    }
  }
}
