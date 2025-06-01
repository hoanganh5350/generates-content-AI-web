export async function post<T>(url: string, body: any): Promise<T> {
  const res = await fetch(import.meta.env.VITE_API_URL + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function get<T>(url: string): Promise<T> {
  const res = await fetch(import.meta.env.VITE_API_URL + url);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}