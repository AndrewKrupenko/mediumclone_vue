<template>
  <div class='feed-toggle'>
    <ul class='nav nav-pills outline-active'>
      <li v-if='isLoggedIn' class='nav-item'>
        <router-link
          :class="{active: routeName === 'yourFeed'}"
          :to="{name: 'yourFeed'}"
          class='nav-link'
        >
          Your feed
        </router-link>
      </li>
      <li class='nav-item'>
        <router-link
          :class="{active: routeName === 'globalFeed'}"
          :to="{name: 'globalFeed'}"
          class='nav-link'
        >
          Global feed
        </router-link>
      </li>
      <li v-if='tagName' class='nav-item'>
        <router-link
          :class="{active: routeName === 'tag'}"
          :to="{name: 'tag'}"
          class='nav-link'
        >
          <i class='ion-pound' />
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getterTypes} from '@/store/modules/auth'

export default {
  name: 'McvFeedToggler',
  props: {
    tagName: {
      type: String,
      required: false
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: getterTypes.isLoggedIn
    }),
    routeName() {
      return this.$route.name
    }
  }
}
</script>