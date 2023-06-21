import { AxiosError } from "axios";

export const isError = (err: unknown): err is Error => err instanceof Error;

export const isAxiosError = (err: unknown): err is AxiosError =>
  err instanceof AxiosError;
