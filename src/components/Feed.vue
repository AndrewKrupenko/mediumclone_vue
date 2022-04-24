<template>
  <div>
    <div v-if='isLoading'>Loading...</div>

    <div v-if='error'>Something bad happened</div>

    <div v-if='feed'>
      <div
        v-for='(article, index) in feed.articles'
        :key='index'
        class='article-preview'
      >
        <div class='article-meta'>
          <router-link
            :to="{name: 'userProfile', params: {slug: article.author.username}}"
          >
            <img :src='article.author.image'>
          </router-link>
          <div class='info'>
            <router-link
              :to="{name: 'userProfile', params: {slug: article.author.username}}"
            >
              {{ article.author.username }}
            </router-link>
            <span class='date'>{{ article.createdAt }}</span>
          </div>

          <div class='pull-xs-right'>
            ADD TO FAVORITES
          </div>
        </div>
        <router-link
          :to="{name: 'article', params: {slug: article.slug}}"
          class='preview-link'>
          <h1>{{ article.title }}</h1>
          <p>{{ article.description }}</p>
          <span>Read more...</span>
          TAG LIST
        </router-link>
      </div>
      <mcv-pagination
        :current-page='currentPage'
        :limit='limit'
        :total='feed.articlesCount'
        :url='baseUrl'
      />
    </div>
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/feed'
import {mapState} from 'vuex'
import McvPagination from '@/components/Pagination'
import {limit} from '@/helpers/variables'
import {parseUrl, stringify} from 'query-string'

export default {
  name: 'McvFeed',
  props: {
    apiUrl: {
      type: String,
      required: true
    }
  },
  components: {
    McvPagination
  },
  data() {
    return {
      limit,
      url: '/'
    }
  },
  computed: { // immutable
    ...mapState({
      isLoading: state => state.feed.isLoading,
      feed: state => state.feed.data,
      error: state => state.feed.error
    }),
    currentPage() {
      return Number(this.$route.query.page || '1')
    },
    baseUrl() {
      return this.$route.path
    },
    offset() {
      return (this.currentPage * limit) - limit
    }
  },
  watch: { // mutable
    currentPage() {
      console.log('current page changed')
      this.fetchFeed()
    }
  },
  mounted() { // calls when component is initializing
    console.log('init feed')
    this.fetchFeed()
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
