export interface UserRequest {
  user_name: string;
  user_age: number;
  pard_part: string;
}

export interface UserResponse {
  id: number;
  name: string;
  age: number;
  part: string;
}
