export const randomString = (length = 5) => {
  let newString = Math.random().toString(36).substring(2)
  while (newString.length < length)
    newString += Math.random().toString(36).substring(2)
  return newString.substring(0, length)
}
