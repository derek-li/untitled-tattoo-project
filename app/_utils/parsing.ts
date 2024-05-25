export const parseApiResponse = (object: any): any => {
  if (Array.isArray(object)) {
    return object.map((arrayValue) => parseApiResponse(arrayValue))
  }

  if (object === null) {
    return undefined
  }

  if (object.constructor === Object) {
    const camelizedObject:Record<string, any> = {}
    const objectKeys = Object.keys(object)
    objectKeys.forEach((key) => {
      const newKey = snakeToCamelCase(key)
      camelizedObject[newKey] = parseApiResponse(object[key])
    })
    return camelizedObject
  }

  return object
}

export const snakeToCamelCase = (snakeCase: string): string => {
  if (!snakeCase.includes('_')) {
    return snakeCase
  }
  let splitString = snakeCase.split(/(_)+/).filter((string) => string !== '_')
  splitString = splitString.map((string) => string[0].toUpperCase() + string.substr(1))
  const joinedString = splitString.join('')
  return joinedString[0].toLowerCase() + joinedString.substring(1)
}