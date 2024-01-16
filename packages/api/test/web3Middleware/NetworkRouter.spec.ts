import { NetworkRouter } from '../../src/web3Middleware/NetworkRouter.js'


describe('NetworkRouter', () => {
  it('should read the state of each datafeed provided', async () => {
    const router = new NetworkRouter('0x9999999d139bdBFbF25923ba39F63bBFc7593400', 'https://rpc2.sepolia.org', 'ethereum.sepholia')

    const snapshot = await router.getSnapshot()

    expect(snapshot.feeds[0].caption).toBeTruthy()
    expect(snapshot.feeds[0].id).toBeTruthy()
    expect(snapshot.feeds[0].solver).toBeTruthy()
    expect(snapshot.feeds[0].status).toBeTruthy()
    expect(snapshot.feeds[0].tallyHash).toBeTruthy()
    expect(snapshot.feeds[0].timestamp).toBeTruthy()
    expect(snapshot.feeds[0].value).toBeTruthy()

    expect(snapshot.network).toBe('ethereum.sepholia')
  })
})
