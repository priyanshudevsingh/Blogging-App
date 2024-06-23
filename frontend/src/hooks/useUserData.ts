import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface User {
  name: string;
  email: string;
  id: string;
}

export const useUserData = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/user`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data);
        setLoading(false);
      });
  }, []);

  return { loading, user };
};
