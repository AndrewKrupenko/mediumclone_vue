<template>
  <div>
    <div>Create Article</div>
    <mcv-article-form
      :errors='validationErrors'
      :initial-values='initialValues'
      :isSubmitting='isSubmitting'
      @articleSubmit='onSubmit'
    />
  </div>
</template>

<script>
import McvArticleForm from '@/components/ArticleForm'

export default {
  name: 'McvCreateArticle',
  components: {McvArticleForm},
  data() {
    return {
      initialValues: {
        title: '',
        description: '',
        body: '',
        tagList: []
      },
      validationErrors: null,
      isSubmitting: false
    }
  },
  methods: {
    onSubmit(data) {
      console.log('onSubmit data', data)
    }
  }
}
</script>