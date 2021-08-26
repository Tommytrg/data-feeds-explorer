require('dotenv/config')

import fs from 'fs'
import path from 'path'
// import Web3 from 'web3'
import { MongoManager } from './database'
import { FeedRepository } from './repository/Feed'
import { ResultRequestRepository } from './repository/ResultRequest'
import { createServer } from './server'
import { FeedInfo, FeedInfoConfig, Repositories } from './types'
// import { Web3Middleware } from './web3Middleware/index'

async function main () {
  console.log('main')
  const mongoManager = new MongoManager()
  const db = await mongoManager.start()
  const dataFeeds = readDataFeeds()
  console.log('a')

  const repositories: Repositories = {
    feedRepository: new FeedRepository(db, dataFeeds),
    resultRequestRepository: new ResultRequestRepository(db, dataFeeds)
  }
  const address ='0xF2712e7114A237625EFC8bBA6a6ed1Bb8b6029c9' 
  let timestamp = 1627385363902
  let requests = []
  let result = 2000000
  const feed = await repositories.feedRepository.insert({
    address,
    label: '$',
    name: 'btc/usd',
    network: 'mainnet',
    requests: [],
    lastResult: String(result),
  })
  console.log('1', feed)

  console.log('result', result)
  for (let i = 1; i< 50; i++) {
    let resultRequest = await repositories.resultRequestRepository.insert({
      address,
      drTxHash: `${i}`,
      feedId: feed.id,
      label: '$',
      requestId: `${i}`,
      result: String(result+=10000),
      timestamp: String(timestamp += 86400),
    })
    if (i<5) {
      console.log('resultRequest', resultRequest)
    }
    requests.push(resultRequest._id)
  }
  await repositories.feedRepository.collection.updateOne({ address, }, { $set: { requests } })
  // const web3Middleware = new Web3Middleware(
  //   { repositories, Web3: Web3 },
  //   dataFeeds
  // )
  // web3Middleware.listen()

  const server = await createServer(repositories, dataFeeds)

  server
    .listen({ host: '0.0.0.0', port: process.env.SERVER_PORT })
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`)
    })
}

function readDataFeeds (): Array<FeedInfo> {
  const dataFeeds: Array<FeedInfoConfig> = JSON.parse(
    fs.readFileSync(
      path.resolve(process.env.DATA_FEED_CONFIG_PATH || './dataFeeds.json'),
      'utf-8'
    )
  )
  // Throw and error if config file is not valid
  validateDataFeeds(dataFeeds)

  return dataFeeds.map(dataFeed => ({
    ...dataFeed,
    abi: JSON.parse(fs.readFileSync(path.resolve(dataFeed.abi), 'utf-8')),
    witnetRequestBoard: {
      ...dataFeed.witnetRequestBoard,
      abi: JSON.parse(
        fs.readFileSync(path.resolve(dataFeed.witnetRequestBoard.abi), 'utf-8')
      )
    }
  }))
}

// Throw an error if a field is missing in the data feed config file
function validateDataFeeds (dataFeeds: Array<FeedInfoConfig>) {
  const fields = [
    'abi',
    'address',
    'network',
    'name',
    'pollingPeriod',
    'witnetRequestBoard.address',
    'witnetRequestBoard.abi',
    'color',
    'blockExplorer'
  ]

  dataFeeds.forEach((feedInfoConfig, index) => {
    fields.forEach(field => {
      // Validate nested keys in a field
      field.split('.').reduce((acc, val) => {
        // Throw error if the key is not found or has a falsy value
        if (!(val in acc) || !acc[val]) {
          throw new Error(
            `Missing field ${field} in index ${index} in data feed config file`
          )
        } else {
          return acc[val]
        }
      }, feedInfoConfig)
    })
  })
}

main()
