import words from '@assets/words.json'

export const generateUsername = () => {
  const predicateOne = words.predicates[Math.floor(Math.random() * words.predicates.length)]
  const predicateTwo = words.predicates[Math.floor(Math.random() * words.predicates.length)]
  const object = words.objects[Math.floor(Math.random() * words.objects.length)]

  return predicateOne + predicateTwo + object
}