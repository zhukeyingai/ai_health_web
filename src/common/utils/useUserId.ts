import { useEffect, useState } from "react";
import { USER_ID_KEY } from "../../constant/localStorageKey";

export function useUserId() {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const curUserId = localStorage.getItem(USER_ID_KEY);
    if (curUserId) {
      setUserId(curUserId);
    }
  }, []);

  return { userId };
}
