import { useEffect, useContext } from "react";
import CareersContext from "contexts/CareersContext";
import getFromAPI from "services/getFromAPI";

function useCareer() {
  const { content, setContent } = useContext(CareersContext);

  useEffect(() => {
    getFromAPI("careers").then((res) => {
      setContent(res);
    });

    // eslint-disable-next-line
  }, []);

  return {
    careers: content,
    setCareers: setContent,
  };
}
export default useCareer;
