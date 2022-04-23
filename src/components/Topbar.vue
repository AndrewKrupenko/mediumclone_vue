<template>
  <nav class='navbar navbar-light'>
    <div class='container'>
      <router-link :to="{ name: 'globalFeed' }" class='navbar-brand'>
        MediumClone
      </router-link>
      <ul class='nav navbar-nav pull-xs-right'>
        <li class='nav-item'>
          <router-link
            :to="{ name: 'globalFeed' }"
            active-class='active'
            class='nav-link'
            exact
          >
            Home
          </router-link>
        </li>
        <template v-if='isLoggedIn'>
          <li class='nav-item'>
            <router-link
              :to="{ name: 'createArticle' }"
              active-class='active'
              class='nav-link'
            >
              <i class='ion-compose'></i> &nbsp;
              New article
            </router-link>
          </li>
          <li class='nav-item'>
            <router-link
              :to="{ name: 'settings' }"
              active-class='active'
              class='nav-link'
            >
              <i class='ion-gear-a'></i> &nbsp;
              Settings
            </router-link>
          </li>
          <li class='nav-item'>
            <router-link
              :to="{name: 'userProfile', params: {slug: currentUser.username}}"
              active-class='active'
              class='nav-link'
            >
              <img
                :src='currentUser.image'
                class='user-pic'
              > &nbsp;
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if='isAnonymous'>
          <li class='nav-item'>
            <router-link
              :to="{ name: 'login' }"
              active-class='active'
              class='nav-link'
            >
              Sign In
            </router-link>
          </li>
          <li class='nav-item'>
            <router-link
              :to="{ name: 'register' }"
              active-class='active'
              class='nav-link'
            >
              Sign up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<script>
import {getterTypes} from '@/store/modules/auth'
import {mapGetters} from 'vuex'

export default {
  name: 'McvTopbar',
  computed: {
    ...mapGetters({
      currentUser: getterTypes.currentUser,
      isLoggedIn: getterTypes.isLoggedIn,
      isAnonymous: getterTypes.isAnonymous
    })
  }
}
</script>