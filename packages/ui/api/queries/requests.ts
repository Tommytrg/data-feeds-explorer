import { gql } from 'graphql-request'

export default gql`
  query requests($feedFullName: String!, $page: Int!, $size: Int!) {
    requests(feedFullName: $feedFullName, page: $page, size: $size) {
      feedFullName
      result
      drTxHash
      timestamp
    }
  }
`
