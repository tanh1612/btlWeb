export const apiUrl = "http://localhost:8000/api";

export const adminToken = () => {
  const json = localStorage.getItem("adminInfo");
  const data = json ? JSON.parse(json) : null;
  return data?.token;
};

export const userToken = () => {
  const json = localStorage.getItem("userInfo");
  const data = json ? JSON.parse(json) : null;
  return data?.token;
};

const STRIPE_PUBLIC_KEY =
  "pk_test_51SgqokG59DEZGVhxu8JYSamoM8SQaczUCEieOC9msVxguG9dlsxpzc9zyICplK7qxbQEmPbbgzZLynVg70rPaztk00EdoP8i9l";
