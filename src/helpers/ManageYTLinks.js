export function isYTLink(s = "") {
  return (
    typeof s === "string" &&
    (s.indexOf("www.youtube.com") > -1 || s.indexOf("youtu.be") > -1)
  );
}

export function getYTCode(url = "") {
  const urlSplitted = url.split("/");
  const end = urlSplitted.slice(-1)[0];

  if (url.indexOf("youtu.be") > -1) return end;

  const variablesString = end.split("?")[1];
  const variables = variablesString.split("&");
  for (let i = 0; i < variables.length; i++) {
    const val = variables[i];
    const [key, value] = val.split("=");
    if (key === "v") return value;
  }
}
