<template>
  <div class="playground">
    <h1>This is the playground</h1>
    <Attractors v-if="componentToRender === 'attractors'"  />
    <Collatz v-if="componentToRender === 'collatz'" />
  </div>
</template>


<script>
import Attractors from "../components/Attractors";
import Collatz from "../components/Collatz";
export default {
  name: "Playground",
  components: {
    Attractors,
    Collatz
  },
  data: () => {
    return {
      componentToRender: 'collatz'
    }
  }
};
</script>
