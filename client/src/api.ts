const API_URL = "http://localhost:4000/api";

export default async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const token = localStorage.getItem("accessToken");

  const res = await fetch(API_URL + path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("API error");
  }

  return res.json();
}
