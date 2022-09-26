export const containsStringFromArray = <T>(
  parentArray: T[],
  subArray: T[]
): boolean => {
  let isIncluded = false

  subArray.forEach((element) => {
    if (!isIncluded) {
      if (parentArray.includes(element)) {
        isIncluded = true
      }
    }
  })

  return isIncluded
}
