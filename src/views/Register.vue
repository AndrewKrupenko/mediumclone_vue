<template>
  <div class='auth-page'>
    <div class='container page'>
      <div class='row'>
        <div class='col-md-6 offset-md-3 col-xs-12'>
          <h1 class='text-xs-center'>Sign Up</h1>
          <p class='text-xs-center'>
            <router-link :to="{name: 'login'}">
              Already have an account?
            </router-link>
          </p>

          <mcv-validation-errors
            v-if='validationErrors'
            :validation-errors='validationErrors'
          />
          <form @submit.prevent='onSubmit'>
            <fieldset class='form-group'>
              <input
                v-model='username'
                class='form-control form-control-lg'
                placeholder='Username'
                type='text'
              >
            </fieldset>

            <fieldset class='form-group'>
              <input
                v-model='email'
                class='form-control form-control-lg'
                placeholder='Email'
                type='email'
              >
            </fieldset>

            <fieldset class='form-group'>
              <input
                v-model='password'
                class='form-control form-control-lg'
                placeholder='Password'
                type='password'
              >
            </fieldset>
            <button
              :disabled='isSubmitting'
              class='btn btn-lg btn-primary pull-xs-right'
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import McvValidationErrors from '@/components/ValidationErrors'
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'McvRegister',
  components: {
    McvValidationErrors
  },
  data() {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  computed: {
    isSubmitting() {
      return this.$store.state.auth.isSubmitting
    },
    validationErrors() {
      return this.$store.state.auth.validationErrors
    }
  },
  methods: {
    onSubmit() {
      // this.$store.commit('registerStart') // call mutation
      this.$store.dispatch(actionTypes.register, {
        username: this.username,
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({name: 'globalFeed'})
      }) // call action which calls mutation
    }
  }
}
</script>