<template>
  <client-only>
    <a :href="link" :title="title" :style="customizable" target="_blank">
      <SvgIcon class="logo" :name="name" />
    </a>
  </client-only>
</template>

<script>
export default {
  props: {
    link: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      required: true,
    },
    brightness: {
      type: Number,
      default: 1,
    },
    scale: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    customizable() {
      return {
        '--brightness': this.brightness,
        '--scale': this.scale,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
a {
  display: grid;
  align-items: center;
  justify-items: center;
  transition: all 0.2s ease;
  opacity: 0.7;
  padding: 20px 0;
  height: max-content;
  width: max-content;
  .logo {
    display: flex;
    width: max-content;
    height: 30px;
    max-width: 200px;
    justify-content: center;
    align-items: center;
    transform: scale(var(--scale));
    filter: brightness(calc(#{var(--brightness-theme)} + #{var(--brightness)}))
      grayscale(100%);
    transition: all 0.2s ease;
  }
  &:hover {
    opacity: 1;
    filter: brightness(1);
    .logo {
      filter: brightness(1) grayscale(0%);
    }
  }
}
</style>
