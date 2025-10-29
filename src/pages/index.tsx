// HomePage.tsx

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { addUser, deleteUser, fetchAllUsers, updateUser } from "./api/pardApi";
import { UserResponse } from "@/types/user";

export default function HomePage() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [newUser, setNewUser] = useState({ name: "", age: 0, part: "" });
  const [selectedPart, setSelectedPart] = useState<"web" | "ios" | "server">(
    "web" // 디폴트 값을 web으로 설정
  );
  const [editingUser, setEditingUser] = useState<UserResponse | null>(null);

  const fetchUser = useCallback(() => {
    fetchAllUsers(selectedPart).then((usersData) => {
      setUsers(usersData);
    });
  }, [selectedPart]);

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.age || !newUser.part) return;
    await addUser(newUser);
    fetchUser();
    setNewUser({ name: "", age: 0, part: "" });
  };

  const handleDeleteUser = async (id: number) => {
    await deleteUser(id);
    fetchUser();
  };
  // 클백 세미나

  const handleUpdateUser = async () => {
    if (!editingUser) return;
    await updateUser(editingUser);
    setEditingUser(null);
    fetchUser();
  };
  // 클백 세미나
  

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="bg-[#343434] min-h-screen flex flex-col items-center justify-center text-white p-6">
      {/* 헤더 */}
      <h1 className="font-extrabold text-2xl mb-4">
        PARD - 5th Seminar CRUD
      </h1>

      {/* 로고 */}
      <Image
        src="/PARD.png"
        alt="Pard Logo"
        width={200}
        height={200}
        priority
        className="mb-6 w-auto h-auto"
      />

      {/* Part 선택 버튼 */}
      <div className="mb-4 flex space-x-3">
        {["web", "ios", "server"].map((part) => (
          <button
            key={part}
            className={`px-4 py-2 rounded transition ${
              selectedPart === part
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setSelectedPart(part as "web" | "ios" | "server")}
          >
            {part.toUpperCase()}
          </button>
        ))}
      </div>

      {/* 유저 테이블 */}
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">User Table</h2>

        <table className="w-full border-collapse border border-gray-600">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="border p-3">Name</th>
              <th className="border p-3">Age</th>
              <th className="border p-3">Part</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.length ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="border p-3">{user.name}</td>
                  <td className="border p-3">{user.age}</td>
                  <td className="border p-3">{user.part}</td>
                  <td className="border p-3 text-center">
                    <button onClick={() => handleDeleteUser(user.id)}>
                      ❎
                    </button>
                    <button
                      className="px-6 "
                      onClick={() => setEditingUser(user)}>
                      ✏️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-3">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* 유저 추가 & 수정 폼 */}
        <div className="mt-6 flex space-x-3">
          <input
            className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black"
            placeholder="Name"
            value={editingUser ? editingUser.name : newUser.name}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, name: e.target.value })
                : setNewUser({ ...newUser, name: e.target.value })
            }
          />
          <input
            type="number"
            className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black"
            placeholder="Age"
            value={editingUser ? editingUser.age : newUser.age}
            onChange={(e) =>
              editingUser
                ? setEditingUser({
                    ...editingUser,
                    age: Number(e.target.value),
                  })
                : setNewUser({ ...newUser, age: Number(e.target.value)})
            }
          />
          <input
            className="w-full p-2 border border-gray-400 rounded bg-gray-100 text-black"
            placeholder="Part"
            value={editingUser ? editingUser.part : newUser.part}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, part: e.target.value })
                : setNewUser({ ...newUser, part: e.target.value })
            }
          />
            {editingUser ? (
            <button
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
            onClick={handleUpdateUser}>
              Update
            </button>
            ) : (
            <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            onClick={handleAddUser}>
              Add
            </button>
            )}
        </div>
      </div>
    </div>
  );
}
