<template>
  <v-container grid-list-md mb-20>
 <h2 class="text-md-center">Menu Transaksi Kouvee Petshop</h2>
 <v-stepper v-model="e1">
    <v-stepper-header>
      <v-stepper-step :complete="e1 > 1" step="1">Name of step 1</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :complete="e1 > 2" step="2">Name of step 2</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step step="3">Name of step 3</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-card
          class="mb-12"
        >   
        <v-row>
        <v-col>
           <v-text-field
        label="Nama Layanan*"
        required
         outlined
        ></v-text-field>
        </v-col>
        <v-col>
        <v-text-field
        label="Harga Layanan*"
        required
         outlined
        ></v-text-field>
            </v-col> 
          </v-row> 
       
        <v-text-field
        label="Jumlah*"
        required
         outlined
        ></v-text-field>
        <v-text-field
        label="Total Harga*"
        required
         outlined
        ></v-text-field>
      
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn text  >Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-card
          class="mb-12"
          
          height="200px"
        >
   
        </v-card>

        <v-btn
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>

        <v-btn text  @click="e1 = 1">Cancel</v-btn>
      </v-stepper-content>

      <v-stepper-content step="3">
        <v-card
          class="mb-12"
          color="grey lighten-1"
          height="200px"
        ></v-card>

        <v-btn
          color="primary"
          @click="e1 = 1"
        >
          Continue
        </v-btn>

        <v-btn text @click="e1 = 2">Cancel</v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
  </v-container>
  
</template>
<script>
  export default {
    data () {
      return {
        e1: 1,
      }
    },
  }
</script>