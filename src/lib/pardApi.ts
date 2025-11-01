import { UserRequest, UserResponse } from "@/types/user";
import { http } from "./http";
import { ENDPOINT } from "./endPoint";

// 사용자 목록 가져오기
export const fetchAllUsers = async (selectedPart: "web" | "ios" | "server") => {
  try {
    const res = await http.get<UserResponse[]>(`${ENDPOINT.USER}?part=${selectedPart}`);
    if (Array.isArray(res)) {
      return res;
    } else {
      console.error("API 배열이 아님", res);
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
    const data: UserRequest = {
      user_name: newUser.name,
      user_age: newUser.age,
      pard_part: newUser.part,
    };

    const res = await http.post<UserRequest>(`${ENDPOINT.USER}`, data);
    console.log("서버 응답", res);
  } catch (error) {
    console.error("사용자 추가 실패", error);
  }
};

// 사용자 삭제하기
export const deleteUser = async (id: number) => {
  try {
    await http.delete(`${ENDPOINT.USER}/${id}`);
    console.log("사용자 삭제 완료");
  } catch (error) {
    console.error("사용자 삭제 실패", error);
  }
};

// 사용자 수정하기 (PATCH 사용)
export const updateUser = async () => {
  try {
    
    console.log("사용자 수정 완료");
  } catch (error) {
    console.error("사용자 수정 실패", error);
  }
};
