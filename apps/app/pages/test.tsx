import {GetServerSideProps} from "next";

function Test() {
  return (<>asss</>);
}

export default Test;

export async function getServerSideProps (context) {
  throw new Error();
}
