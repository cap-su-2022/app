import {createGetInitialProps} from "@mantine/next";
import Document from "next/document";
import {wrapper} from "../redux/store";

const getInitialProps = createGetInitialProps();

export default class _Document extends Document {
  static getInitialProps = getInitialProps;
}
