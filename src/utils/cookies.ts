import dayjs from "dayjs";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const setCookie = (name: string, value: string, expires?: number) => {
  const expiresDate = dayjs().add(expires ?? 1, 'day').toDate();
  cookies.set(name, value, { expires: expiresDate });
}

export const getCookie = (name: string) => {
  return cookies.get(name);
}

export const removeCookie = (name: string) => {
  cookies.remove(name);
}
