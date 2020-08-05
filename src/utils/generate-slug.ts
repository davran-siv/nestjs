export const generateSlug = (str: string) => {
  return str.replace(/\s/g, '-')
}
