import { useRouter } from "next/router";

import logoutUser from "@/utils/logoutUser";

const DeleteUserButton = ({ userId }) => {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (!userId) {
        console.error("userId is not provided.");
        return;
      }
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.ok) {
        router.push("/");
        logoutUser();
      } else {
        const result = await response.json();
        console.error("Failed to delete user:", result.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return <button onClick={handleDelete}>Ta bort användare</button>;
};

export default DeleteUserButton;
