function addFileListToFD(fd = new FormData(), files = FileList, title = "") {
  for (const file of files) {
    fd.append(`${title}[]`, file);
  }
}
export default addFileListToFD;
