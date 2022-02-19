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
  [index: string]: {
    fn: (fieldName: string) => FilterCondition,
    arg: string
  }
}
export const defaultKeyMap = {
  "x": { fn: stringInclude, arg: "raw_text" },
  "t": { fn: stringExactMatch, arg: "type" },
  "sup": { fn: stringExactMatch, arg: "supertype" },
  "s": { fn: stringExactMatch, arg: "subtype" },
  "f": { fn: stringExactMatch, arg: "faction" },
  "a": { fn: numericEqual, arg: "attack" },
  "d": { fn: numericEqual, arg: "defense" },
  "dur": { fn: numericEqual, arg: "durability" },
  "c": { fn: numericEqual, arg: "cost" },
  "p": { fn: numericEqual, arg: "power" },
  "art": { fn: stringInclude, arg: "artist" },
  "e": { fn: stringInclude, arg: "expansion" }
}
export const useFilter = (keyMap: KeyMap = defaultKeyMap): (queryString: string) => (c: Card) => boolean => {

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
    //Step 1: extract all expressions with quoted inputs
    const getQuotedExpressionsRegex = /(\S*:"[^"]*")/g
    // Pull out expressions of the form something:"with spaces", then drop the quotes
    const quotedExpressions = (queryString.match(getQuotedExpressionsRegex) || []).map(s => s.replace(/"/g, ""))

    // Step 2: remove the quoted expressions, then just split on spaces
    const queryWithoutQuoted = queryString.replace(getQuotedExpressionsRegex, "").trim()
    const expressions = queryWithoutQuoted.split(" ").filter(s => s.length > 0)

    // Step 3: Build a composite boolean function to match all conditions in query string
    return (expressions.concat(quotedExpressions)).map(e => {
      const [key, input] = e.split(":").map(s => s.trim())

      return (card: Card) => (
        filterMap(key)(card, input || key)
      )
    }).reduce(
      (memo, fn) => (card: Card) => memo(card) && fn(card), // AND all conditions
      (_card: Card) => true // By default, let everything through
    )
  }

  return parseQuery

}

