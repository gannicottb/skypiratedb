export const stringExactMatch = (fieldName: string) => (
  (c: Card, input: string) => (String(c[fieldName]) || "").toLowerCase() === input.toLowerCase()
)
export const stringInclude = (fieldName: string) => (
  (c: Card, input: string) => (String(c[fieldName]) || "").toLowerCase().includes(input.toLowerCase())
)
export const numericEqual = (fieldName: string) => {
  return (c: Card, input: string) => {
    if (c[fieldName]) {
      return Number(c[fieldName]) === Number(input)
    } else {
      return false
    }
  }
}

type FilterCondition = (c: Card, input: string) => boolean
interface KeyMap {
  [index: string]: FilterCondition
}
interface KeyMap2 {
  [index: string]: {
    fn: (fieldName: string) => FilterCondition,
    arg: string
  }
}
// interface FilterEntry {
//   keyword: string,
//   fn: FilterCondition,
//   desc: string
// }
// type KeyMap3 = FilterEntry[]

export const useFilter = (keyMap: KeyMap2): [(queryString: string) => (c: Card) => boolean, string] => {

  // make case insensitive, and default to string include on `name`
  const filterMap = (filterKey: string) => {
    if (keyMap[filterKey.toLowerCase()]) {
      const { fn, arg } = keyMap[filterKey.toLowerCase()]
      return fn(arg)
    } else {
      return stringInclude("name")
    }
  }

  const parseQuery = (queryString: string): (c: Card) => boolean => {
    // how to use quotes to separate tokens

    // raw string can contain multiple expressions, delimited by a space
    const expressions = queryString.split(" ").filter(s => s.length > 0)

    // Build a composite boolean function to match all conditions in query string
    return expressions.map(e => {
      const [key, input] = e.split(":").map(s => s.trim())

      return (card: Card) => (
        filterMap(key)(card, input || key)
      )
    }).reduce(
      (memo, fn) => (card: Card) => memo(card) && fn(card), // AND all conditions
      (_card: Card) => true // By default, let everything through
    )
  }

  const helpText: string = Object.keys(keyMap).map((k) => `${k}:${keyMap[k].arg}`).join(" ")

  return [parseQuery, helpText]

}

