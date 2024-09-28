export const require = (path: string) => {
  return new URL(`../../${path}`, import.meta.url).href
}
export default require