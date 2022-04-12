import { useEffect, useContext } from "react";
import UniversitiesContext from "contexts/UniversitiesContext";

import getFromAPI from "services/getFromAPI";

function useUniversities() {
  const { content, setContent, loaded } = useContext(UniversitiesContext);

  useEffect(() => {
    getFromAPI("universidades").then((res) => {
      setContent(res);
    });
    // eslint-disable-next-line
  }, []);

  return {
    universities: content,
    setUniversities: setContent,
    universitiesLoaded: loaded,
  };
}
export default useUniversities;
