export function html_substr(str, len) {
  let temp = str.substr(0, len - 3) + "...";
  if (temp.lastIndexOf('<') > temp.lastIndexOf('>')) {
    temp = str.substr(0, 1 + str.indexOf('>', temp.lastIndexOf('<')));
  }
  return temp;
}
