export const trim = (string: string, delimiter: string): string => {
  let l = 0
  let r = string.length - 1
  while (delimiter.indexOf(string[l]) >= 0 && l < r) l++
  while (delimiter.indexOf(string[r]) >= 0 && r >= l) r--
  return string.substring(l, r + 1)
}

export const removeNewLines = (string: string): string => {
  return string.replace(/[\n\r]/g, '')
}
