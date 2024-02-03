"use server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

const createCookie = async (name: string, value: string): Promise<void> => {
  cookies().set(name, value);
};

//add returned type
const getCookie = async (name: string): Promise<RequestCookie | undefined> => {
  const cookieStore = cookies();
  const data = cookieStore.get(name);
  return data;
};

const getAllCookies = async (): Promise<RequestCookie[] | undefined> => {
  const cookieStore = cookies();

  return cookieStore.getAll();
};

const deleteCookie = async (name: string): Promise<void> => {
  cookies().delete(name);
};

export { createCookie, getCookie, deleteCookie, getAllCookies };
