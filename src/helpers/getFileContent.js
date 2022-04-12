import ReadExcel from "read-excel-file";

async function getFileContent(file) {
  return ReadExcel(file).then(function (f) {
    const h = f.shift();

    let objs = [];
    f.forEach((el) => {
      let obj = {};
      el.forEach((el2, i) => {
        obj[h[i]] = el2;
      });
      objs.push(obj);
    });
    return objs;
  });
}
export default getFileContent;
