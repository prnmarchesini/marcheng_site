import type { paths } from "./api-types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

type ContactRequest =
  paths["/api/contact"]["post"]["requestBody"]["content"]["application/json"];
type ContactResponse =
  paths["/api/contact"]["post"]["responses"]["202"]["content"]["application/json"];

export async function submitContact(payload: ContactRequest): Promise<ContactResponse> {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Contact failed: ${res.status}`);
  return res.json();
}
