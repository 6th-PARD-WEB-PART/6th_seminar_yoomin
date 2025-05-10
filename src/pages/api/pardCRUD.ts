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
export const fetchUsers = async (selectedPart: "web" | "ios" | "server") => {
  try {
    const res = await axios.get(`${API_URL}?part=${selectedPart}`);
    if (Array.isArray(res.data)) {
      return res.data;
    } else {
      console.error("API 배열이 아님", res.data);
      return [];
    }
  } catch (error) {
    console.error("데이터 불러오기 실패", error);
    return [];
  }
};

// 새 사용자 추가하기
export const addUser = async (newUser: {
  name: string;
  age: number;
  part: string;
}) => {
  try {
    const res = await axios.post(API_URL, newUser);
    console.log("서버 응답", res);
  } catch (error) {
    console.error("사용자 추가 실패", error);
  }
};

// 사용자 삭제하기
export const deleteUser = async (id: number) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    console.log("사용자 삭제 완료");
  } catch (error) {
    console.error("사용자 삭제 실패", error);
  }
};

// 사용자 수정하기 (PATCH 사용)
export const updateUser = async (updatedUser: {
  id: number;
  name: string;
  age: number;
  part: string;
}) => {
  try {
    await axios.patch(`${API_URL}/${updatedUser.id}`, updatedUser);
    console.log("사용자 수정 완료");
  } catch (error) {
    console.error("사용자 수정 실패", error);
  }
};