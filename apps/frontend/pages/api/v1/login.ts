import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

interface Credential {
  username: string;
  password: string;
}

const NextLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" || !req.body) {
    res.writeHead(400);
    res.end();
    return;
  }
  const credentials = req.body as Credential;

  try {
    const response = await axios.post("http://localhost:5000/api/v1/auth/signin", {
      username: credentials.username,
      password: credentials.password
    });
    const body = await response.data;
    console.log(body);
    res.setHeader("Set-Cookie", [
      `accessToken=${response.headers["set-cookie"]}; Max-Age=99999; path=/`
    ]);
    res.json(body);
  } catch (e) {
    console.log(e.response.data);
    res.statusCode = 401;

    res.json(e.response.data);
  } finally {
    res.end();

  }
};

export default NextLogin;