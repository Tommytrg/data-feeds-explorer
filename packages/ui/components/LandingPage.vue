<template>
  <div class="landing-page">
    <div class="text">
      <h2 class="title">{{ $t('landing.supported_chains.title') }}</h2>
      <p class="subtitle">{{ $t('landing.supported_chains.subtitle') }}</p>
    </div>
    <SupportedChains :chains="supportedChains" />
    <DataFeedsCount
      :chains="supportedChains.length"
      :networks="networks.length"
      :feeds="totalFeeds"
    />
    <h2 class="title">{{ $t('landing.upcoming_chains.title') }}</h2>
    <UpcomingChains />
    <h2 class="title">{{ $t('landing.partners.title') }}</h2>
    <PartnersSection />
  </div>
</template>

<script setup lang="ts">
import { generateSelectOptions } from '../utils/generateSelectOptions'
const store = useStore()
const { data } = await useAsyncData('ecosystems', store.fetchEcosystems)
const totalFeeds = computed(() => store.totalFeeds)
const networks = computed(() => store.networks)
const supportedChains = computed(() => {
  return Object.values(generateSelectOptions(networks.value))
    .filter((network: any) => network && network[0])
    .map((network: any) => {
      const chain = network[0].chain
      return {
        name: chain,
        count:
          data.value?.feeds.filter((feed: any) => feed.chain === chain)
            .length || 0,
        detailsPath: {
          name: 'network',
          params: {
            network: chain.toLowerCase(),
          },
        },
        svg: network[0].logo,
      }
    })
    .sort((chainA, chainB) => chainA.name.localeCompare(chainB.name))
})

onMounted(() => {
  store.updateSelectedNetwork({ networks: [] })
})
</script>

<style lang="scss" scoped>
.landing-page {
  display: grid;
  row-gap: 32px;
  .text {
    display: grid;
    row-gap: 16px;
  }
  .title {
    font-weight: bold;
    font-size: var(--text-size-title);
  }
}
@media screen and (max-width: 1100px) {
  .landing-page {
    padding: 0 24px;
  }
}

@media (max-width: 600px) {
  .landing-page {
    padding: 0 24px;
  }
}
@media (max-width: 300px) {
  .landing-page {
    padding: 0 16px;
  }
}
</style>
