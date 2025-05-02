// api.ts

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL as string;

if (!API_URL) {
  throw new Error("🚨 API_URL이 정의되지 않았습니다! .env.local을 확인하세요.");
}

interface User {
  id: number;
  name: string;
  age: number;
  part: string;
}

// 사용자 목록 가져오기
export const fetchUsers = async () => {};

// 새 사용자 추가하기
export const addUser = async () => {};

// 사용자 삭제하기
export const deleteUser = async () => {};

// 사용자 수정하기
export const updateUser = async () => {};
