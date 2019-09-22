<template>
  <div class="home">
    <AverageFullTime msg="Welcome to Luxparkings"/>
  </div>
</template>

<script>
// @ is an alias to /src
import AverageFullTime from '@/components/AverageFullTime.vue'

export default {
  name: 'home',
  components: {
    AverageFullTime
  }
}
</script>
