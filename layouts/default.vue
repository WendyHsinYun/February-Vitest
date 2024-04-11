<template lang="pug">
v-app(color="background")
  v-app-bar(app color="surface" height="100" elevation="0")
    v-row
      v-col.ml-10(cols='auto' width='160px') 
        ButtonSecondary(:text='"Overview"' color="surface" :prependIcon='"mdi-view-dashboard-outline"' height='53' )
      v-col(cols='auto' width='160px')
        ButtonSecondary(:text='"Contacts"' color="surface" :prependIcon='"mdi-account-box"' height='53' :active='true')  
    
  v-main
    v-container.pa-6(fluid)
      slot

</template>

<script setup></script>

<style lang="sass" scoped></style>
