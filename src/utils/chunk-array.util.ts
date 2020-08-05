export const chunkArray = <T>(arr, chunkSize): T[][] => {
  let index = 0
  let arrayLength = arr.length
  let tempArray: T[][] = []

  for (index = 0; index < arrayLength; index += chunkSize) {
    const myChunk = arr.slice(index, index + chunkSize)
    // Do something if you want with the group
    tempArray.push(myChunk)
  }

  return tempArray
}
