/**
 * @description Concatenate the html string into a specified length and add three periods at the 
 * end. It will do nothing if the string is already less than the specified length.  
 * @param {String} str The string to concatenate
 * @param {Number} len The maximum length of the string we want to concatenate to
 * @returns The comcatenated html element string
 */
export function html_substr(str, len) {
  let temp = str.substr(0, len);
  if (str.length > len) { temp = str.substr(0, len - 3) + "..."; }
  if (temp.lastIndexOf('<') > temp.lastIndexOf('>')) {
    temp = str.substr(0, 1 + str.indexOf('>', temp.lastIndexOf('<')));
  }
  return temp;
}

