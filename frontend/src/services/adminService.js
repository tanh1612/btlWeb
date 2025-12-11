import { apiUrl } from "../config/api";

export const adminLogin = async (data) => {
  const response = await fetch(`${apiUrl}/admin/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
};
