import {LoginComponent} from "../components/Login";
import styles from "./login.module.scss";
import {useEffect} from "react";
function Login(props) {
  useEffect(() => {
    console.log(props.users);
  })
  return (
      <LoginComponent/>
  );
}

export default Login;


export const getServerSideProps = async () => {
  const resp = await fetch("http://localhost:5000/api/v1/users");
  const data = await resp.json();
  console.log(data);
  return {

    props: {
      users: data,
    }
  }
}
