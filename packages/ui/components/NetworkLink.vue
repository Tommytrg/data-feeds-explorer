<template>
  <nuxt-link
    class="nav-link"
    :to="
      localeRoute({
        name: 'network',
        params: {
          network: name.toLowerCase(),
        },
      })
    "
  >
    <SvgIcon :svg="svg" />
    {{ name }}
  </nuxt-link>
</template>

<script setup lang="ts">
const localeRoute = useLocaleRoute()
defineProps({
  name: {
    type: String,
    required: true,
  },
  svg: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.nav-link {
  font-size: 14px;
  padding: 8px 0;
  height: 100%;
  border-radius: 4px;
  margin: 4px 0;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-gap: 4px;
  justify-content: center;
  align-items: center;
  align-items: flex-end stretch;
  z-index: 1;
  color: var(--network-color);
  border: var(--network-border);
  background: var(--network-background);

  &:hover {
    opacity: 0.8;
  }
  &.nuxt-link-active {
    color: var(--network-selected-color);
    border: var(--network-selected-border);
    background: var(--network-selected-background);
    transition: all 0.3s;
    &:hover {
      opacity: 1;
    }
  }
}
</style>
