<template>
  <v-app id="inspire">
    
    
    <v-navigation-drawer v-model="drawer" app>
      <ShUserAvatar></ShUserAvatar>

      <v-divider></v-divider>
      <ShNavigationDrawer></ShNavigationDrawer>
     
    </v-navigation-drawer>



    <!-- app bar -->
     <v-app-bar dense elevation="1" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title class="text-h6">Scheduler</v-toolbar-title>
    </v-app-bar>
    <!-- end app bar -->





    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import ShNavigationDrawer from './components/ShNavigationDrawer.vue'
import ShUserAvatar from './components/ShUserAvatar.vue'

export default {
  data: () => ({ drawer: null }),
  components: {
    ShNavigationDrawer,
    ShUserAvatar
    
  }
}
</script>