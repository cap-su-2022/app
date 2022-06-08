import { Request } from "express";

export const getAccessTokenViaCookie = (request: Request) => request.headers["cookie"]?.split(";")
  .map(k => k.trim()).find(k => k.startsWith("accessToken="))?.split("=")[1] ?? "";
