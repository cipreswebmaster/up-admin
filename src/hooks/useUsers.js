import { useContext, useEffect } from "react";
import UsersContext from "contexts/UsersContext";

import getFromAPI from "services/getFromAPI";

function useUsers() {
  const { content, setContent, loaded } = useContext(UsersContext);

  useEffect(() => {
    getFromAPI("user").then((res) => {
      setContent(res);
    });
    // eslint-disable-next-line
  }, []);

  return {
    users: content,
    setUsers: setContent,
    usersLoaded: loaded,
  };
}
export default useUsers;
