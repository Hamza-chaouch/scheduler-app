<template>
   <v-list nav dense>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon>mdi-calendar</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Calendar</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/about">
          <v-list-item-icon>
            <v-icon>mdi-crosshairs-question</v-icon>
          </v-list-item-icon>
          <v-list-item-title>About</v-list-item-title>
        </v-list-item>

      </v-list>



  


  
</template>

<script>
import ShUserAvatar from './ShUserAvatar.vue'

export default {
    props : ["drawer"],
    components: {
   
    ShUserAvatar
  }
}
</script>