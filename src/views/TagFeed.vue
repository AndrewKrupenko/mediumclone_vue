<template>
  <div class='home-page'>
    <mcv-banner />

    <div class='container page'>
      <div class='row'>
        <div class='col-md-9'>
          <mcv-feed-toggler
            :tag-name='tagName'
          />
          <mcv-feed :api-url='apiUrl' />
        </div>
        <div class='col-md-3'>
          <mcv-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvFeed from '@/components/Feed'
import McvPopularTags from '@/components/PopularTags'
import McvBanner from '@/components/Banner'
import McvFeedToggler from '@/components/FeedToggler'
import {parseUrl, stringify} from 'query-string'
import {limit} from '@/helpers/variables'
import {actionTypes} from '@/store/modules/feed'

export default {
  name: 'McvTagFeed',
  components: {
    McvFeedToggler,
    McvBanner,
    McvFeed,
    McvPopularTags
  },
  computed: {
    tagName() {
      return this.$route.params.slug
    },
    apiUrl() {
      return `/articles?tag=${this.tagName}`
    }
  },
  watch: { // mutable
    tagName() {
      this.fetchFeed()
    }
  },
  methods: {
    fetchFeed() {
      const parsedUrl = parseUrl(this.apiUrl)
      const stringifiedParams = stringify({
        limit,
        offset: this.offset,
        ...parsedUrl.query
      })
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`
      this.$store.dispatch(actionTypes.getFeed, {apiUrl: apiUrlWithParams})
    }
  }
}
</script>
