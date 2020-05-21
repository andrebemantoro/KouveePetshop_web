<template>
<div class="parallax">


<v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" jumbotron>

<v-container> 

  <v-row>
<v-col cols="2"></v-col>
  <v-col cols="8">
    <v-card max-width="1000px" class="text-md-center" justify-content-center>
 <v-container grid-list-md mb-20>
     <h1 class="text-md-center">Menu Cetak Laporan Pengadaan</h1>
     <v-spacer></v-spacer>
  
    
  <v-stepper v-model="e13" vertical>
    <v-stepper-step step="1" complete>
      Masukan Tanggal Cetak
    </v-stepper-step>
    <v-stepper-content step="1">
      <v-card  class="mb-5" height="200px">
        <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="bulan"       
                        readonly
                        outlined
                        clearable=""
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      ref="picker"
                      v-model="bulan"
                      type="month"
                      :max="new Date().toISOString().substr(0, 10)"
                      min="1950-01-01"
                      scrollable=""
                    >
                    <v-btn text="" outlined="" color="primary" @click="menu = false">Cancel</v-btn>
                    <v-btn text outlined="" color="primary" @click="$refs.menu.save(bulan)">OK</v-btn></v-date-picker>
                  </v-menu>
      </v-card>
      <v-btn color="primary" @click.native="e13 = 2">Continue</v-btn>
      <v-btn text="" >Cancel</v-btn>
    </v-stepper-content>
    <v-stepper-step step="2" complete>Name of step 2</v-stepper-step>
    <v-stepper-content step="2">
      <v-card color="grey lighten-1" class="mb-5" height="200px"></v-card>
      <v-btn color="primary" @click.native="e13 = 3">Continue</v-btn>
      <v-btn text="">Cancel</v-btn>
    </v-stepper-content>
  </v-stepper>

 
 </v-container>
    </v-card>
  </v-col>
    
  </v-row>
 

<!-- <v-snackbar       
    v-model="snackbar"
    :color="color"       
    :multi-line="true"       
    :timeout="3000">       
    {{ text }}       
        
    <v-btn         
        dark         
        text         
        @click="snackbar = false">         
        Close       
    </v-btn>     
</v-snackbar>  -->
</v-container> 

 </v-parallax>
 </div>
</template>

<script>
  export default {
    data () {
      return {
      date: null,
      menu: false,
      modal: false,
         e13: 1,
      bulan:'',
        
      }
    },
    watch: {
      menu(val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
      },
    },
    
    methods: {
    
    },
    mounted(){         
      
    },
  }
</script>
<style scoped>
.text-md-center{
  font-family: 'Raleway', sans-serif;
 
}
.text-center{
  font-family: 'Raleway', sans-serif;
 
}
.v-card__title{
  color: black;
}
</style>