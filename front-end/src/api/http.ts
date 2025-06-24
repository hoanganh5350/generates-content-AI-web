import api from "./axiosClient";

export async function post<T>(url: string, body?: Record<string, unknown>): Promise<T> {
  const res = await api.post(url, body);

  if (!res.data) throw new Error(await res.statusText);
  return res.data;
}

export async function get<T>(url: string): Promise<T> {
  const res = await api.get(url);
  if (!res.data) throw new Error(await res.statusText);
  return res.data;
}