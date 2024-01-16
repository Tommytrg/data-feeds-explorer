import { Web3 }  from "web3"
import WitnetPriceFeedsABI from './../abi/WitnetPriceFeeds.json' assert { type: "json" }

enum ResultStatus {
  Void = 0,
  Awaiting = 1,
  Ready = 2,
  Error = 3,
  AwaitingReady = 4,
  AwaitingError = 5
}


type SupportedFeed = {
  id: string,
  caption: string
  solver: string
}

type LatestPrice = {
    value: string,
    timestamp: string,
    tallyHash: string,
    status: ResultStatus
}

export type NetworkSnapshot = {
  network: string,
  feeds: Array<SupportedFeed & LatestPrice>
}

export class NetworkRouter {
  // public contract: Contract<typeof WitnetPriceFeedsABI>
  public contract: any
  public network: string

  constructor(address: string, provider: string, networkName: string) {
    const web3 = new Web3(provider);

    this.contract = new web3.eth.Contract(
      WitnetPriceFeedsABI,
      address
    )

    this.network = networkName
  }

  async getSnapshot(): Promise<NetworkSnapshot> {
    const supportedFeeds = await this.getSupportedFeeds()
    const feedIds = supportedFeeds.map(feed => feed.id)
    const latestPrices = await this.latestPrices(feedIds)

    return {
      network: this.network,
      feeds: supportedFeeds.map((supportedFeed, index) => ({
        ...supportedFeed,
        ...latestPrices[index]
      }))
    }
  }

  // Wrap supportedFeeds contract method
  private async getSupportedFeeds (): Promise<Array<SupportedFeed>> {
    const supportedFeeds = await this.contract.methods.supportedFeeds().call()

    return supportedFeeds._ids.map((_, index) => ({
      id: supportedFeeds._ids[index],
      caption: supportedFeeds._captions[index],
      solver: supportedFeeds._solvers[index],
    }))
  }

  // Wrap latestPrices contract method
  private async latestPrices (ids: Array<string>): Promise<Array<LatestPrice>> {
    const latestPrices = await this.contract.methods.latestPrices(ids).call()
    return latestPrices.map(latestPrice => ({
      value: latestPrice.value.toString(),
      timestamp: latestPrice.timestamp.toString(),
      tallyHash: latestPrice.tallyHash,
      status: Number(latestPrice.status)
    }))
  }
}
