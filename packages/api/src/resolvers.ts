import { Context, Network } from './types'

async function logTimeNeeded(log, fn) {
  const before = Date.now()
  const result = await fn()
  const after= Date.now()

  console.log(`${log} ${after - before}ms`)

  return result

}

const resolvers = {
  Query: {
    feeds: async (_parent, args, { feedRepository }: Context) => {
      return logTimeNeeded('Query.feeds', async () => {
        return await feedRepository.getPaginatedFeeds(args.network)
      })
    },

    networks: async (_parent, _args) => {
      return logTimeNeeded('Query.networks', async () => {
        return Object.keys(Network).map(key => ({ label: Network[key] }))
      })
    },

    requests: async (_parent, args, { resultRequestRepository }: Context) => {
      return logTimeNeeded('Query.requests', async () => {
        return await resultRequestRepository.getFeedRequestsPage(
          args.feedFullName,
          args.page,
          args.size
        )
      })
    },

    feed: async (_parent, args, { feedRepository }: Context) => {
      return logTimeNeeded('Query.feed', async () => {
        return await feedRepository.get(args.feedFullName)
      })
    }
  },
  Feed: {
    requests: async (parent, args, { resultRequestRepository }: Context) => {
      return logTimeNeeded('Feed,requests', async () => {
        return await resultRequestRepository.getFeedRequests(
          parent.feedFullName,
          args.timestamp
        )
      })
    },
    lastResult: async (parent, _args, { resultRequestRepository }: Context) => {
      return logTimeNeeded('Feed.lastResult', async () => {
        // FIXME: add dataloader library to avoid overfetching
        return (await resultRequestRepository.getLastResult(parent.feedFullName))?.result
      })
    },
    lastResultTimestamp: async (
      parent,
      _args,
      { resultRequestRepository }: Context
    ) => {
      return logTimeNeeded('Feed.lastResultTimestamp', async () => {
        // FIXME: add dataloader library to avoid overfetching
        return (await resultRequestRepository.getLastResult(parent.feedFullName))?.timestamp
      })
    },
    color: async (parent, _args, { config }: Context) => {
      return logTimeNeeded('Feed.color', async () => {
        return config[parent.feedFullName]?.color || ''
      })
    },
    blockExplorer: async (parent, _args, { config }: Context) => {
      return logTimeNeeded('Feed.blockExplorer', async () => {
        return config[parent.feedFullName]?.blockExplorer || ''
      })
    },
    proxyAddress: async (parent, _args, { config }: Context) => {
      return logTimeNeeded('Feed.proxyAddress', async () => {
        return config[parent.feedFullName]?.routerAddress || ''
      })
    },
    deviation: async (parent, _args, { config }: Context) => {
      return logTimeNeeded('Feed.deviation', async () => {
        return config[parent.feedFullName]?.deviation || ''
      })
    },
    heartbeat: async (parent, _args, { config }: Context) => {
      return logTimeNeeded('Feed.heartbeat', async () => {
        // Heartbeat plus aproximate time in milliseconds that takes to resolve the witnet dr
        return config[parent.feedFullName]?.heartbeat || ''
      })
    },
    finality: async (parent, _args, { config }: Context) => {
      return logTimeNeeded('Feed.finality', async () => {
        // Heartbeat plus aproximate time in milliseconds that takes to resolve the witnet dr
        return config[parent.feedFullName]?.finality || ''
      })
    }
  }
}

export default resolvers
