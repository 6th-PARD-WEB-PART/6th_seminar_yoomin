import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

if (!API_URL) {
  throw new Error("🚨 API_URL이 정의되지 않았습니다! .env.local을 확인하세요.");
}

export const axiosInstance = axios.create({
    baseURL: API_URL,
    withCredentials: false,
    headers: {
    "Content-Type": "application/json",
  },
});