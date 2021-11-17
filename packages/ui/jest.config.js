
module.exports = {
  "testEnvironment": "jsdom",
  "moduleFileExtensions": [
    "js",
    "json",
    "vue",
    "gql"
  ],
  "transform": {
    "\\.(gql|graphql)$": "jest-transform-graphql",
    ".*\\.(js)$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  "moduleNameMapper": {
    "^@/(.*)$": "<rootDir>/$1"
  }
}
