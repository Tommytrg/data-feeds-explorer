<template>
  <div class="footer-background">
    <div class="footer">
      <div class="top">
        <div v-for="section in footerLinks" :key="section.title" class="links">
          <p class="title">{{ $t(`footer.links.${section.title}.title`) }}</p>
          <a
            v-for="link in section.links"
            :key="link.text"
            class="link"
            :href="link.url"
            target="_blank"
          >
            {{ $t(link.text) }}
          </a>
        </div>
        <div class="alliance-text">
          <SvgIcon class="logo white" name="ado_member" />
          <i18n-t
            keypath="footer.ado_text"
            tag="p"
            class="small-description"
            scope="global"
          >
            <a class="link underline" :href="urls.ado" target="_blank">
              theado.org
            </a>
          </i18n-t>
        </div>
      </div>
      <div class="bottom">
        <SvgIcon class="logo white" name="witnet_dark" />
        <i18n-t
          keypath="footer.copyright.base"
          class="copyright"
          tag="p"
          scope="global"
        >
          <span>2018-{{ new Date().getFullYear() }}</span>
          <a class="link" href="https://witnet.foundation" target="_blank">{{
            $t('footer.copyright.witnet_foundation')
          }}</a>
          <a
            class="link"
            href="https://creativecommons.org/publicdomain/zero/1.0/"
            target="_blank"
            >{{ $t('footer.copyright.license') }}</a
          >
        </i18n-t>
        <LanguageSwitcher class="language-selector" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { urls, footerSections } from '../../constants'
import getFooterLinks from './getFooterLinks'

const footerLinks = computed(() => getFooterLinks(footerSections))
</script>

<style scoped lang="scss">
.footer-background {
  background: var(--footer-bg);
  color: var(--white-text);
  min-height: 20vh;
  display: flex;
  justify-content: center;
  margin-top: 24px;
}
.bottom {
  padding-top: 40px;
  display: grid;
  grid-template-columns: max-content 1fr max-content;
  row-gap: 16px;
  align-items: center;
  column-gap: 16px;
  .logo {
    width: 40px;
  }
  .white-paper {
    width: min-content;
  }
  .copyright {
    font-size: var(--text-size-small);
    line-height: 1.5;
    max-width: 350px;
    a {
      font-size: inherit;
      text-decoration: underline;
    }
  }
}
.link {
  font-size: var(--text-size-medium);
  color: var(--white-text);
  padding: 4px 0 4px 0;
  transition: all 0.3 ease-in-out;
  &:hover {
    opacity: 0.8;
  }
  &.underline {
    text-decoration: underline;
  }
}
.footer {
  width: 100vw;
  max-width: var(--desktop-margin);
  padding: 48px 32px;
  .top {
    border-bottom: 1px solid var(--white-text);
    display: grid;
    padding-bottom: 40px;
    column-gap: 40px;
    row-gap: 24px;
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    justify-content: space-between;
    .links {
      display: flex;
      flex-direction: column;
      .title {
        font-family: Almarai, sans-serif;
        font-size: var(--text-size);
        font-weight: bold;
        padding: 8px 0 8px 0;
      }
    }
    .alliance-text {
      grid-column: span 2;
      font-size: var(--text-size-medium);
      line-height: 1.5;
      .logo {
        width: 50px;
        margin-bottom: 8px;
      }
    }
  }
}
</style>
