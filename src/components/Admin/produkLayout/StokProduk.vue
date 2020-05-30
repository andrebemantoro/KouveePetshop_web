<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-20>
        <h2 class="text-md-center">Stok Produk Kouvee Petshop</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6 class="text-right">
            <v-text-field
              v-model="keyword"
              append-icon="mdi-search"
              label="Cari"
              hide-details="auto"
              outlined
              clearable
              prepend-icon="mdi-magnify"
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-data-table :headers="headers" :items="produks" :search="keyword">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_produk">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_produk }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.min_stok }}</td>
                <td>
                  <v-chip :color="getColor(index)" dark="">
                    {{ item.jumlah_stok }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-container>
    </v-card>

    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="true"
      :timeout="3000"
    >
      {{ text }}
      <v-btn dark text @click="snackbar = false">Tutup</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        keyword: '',
        temp: [],
        temp2: 10,
        menu: false,
        on: '',
        deleteDialog: '',
        headers: [
          {
            text: 'No',
            value: 'index',
          },
          {
            text: 'Id Produk',
            value: 'id_produk',
          },
          {
            text: 'Nama Produk',
            value: 'nama',
          },
          {
            text: 'Stok Minimal',
            value: 'min_stok',
          },
          {
            text: 'Jumlah Stok',
            value: 'jumlah_stok',
          },
        ],
        produks: [],

        snackbar: false,
        color: null,
        text: '',
        load: false,

        errors: '',
      };
    },

    methods: {
      getData() {
        var uri = this.$apiUrl + 'Produk/' + 'all_get';
        this.$http.get(uri).then((response) => {
          this.produks = response.data.message;
        });
      },
      getColor(index) {
        this.temp[index] =
          parseInt(this.produks[index].min_stok) + parseInt(this.temp2);
         
      
        if (parseInt(this.produks[index].jumlah_stok) < parseInt(this.produks[index].min_stok)){
          return 'red'
          } else if (parseInt(this.produks[index].jumlah_stok) > parseInt(this.produks[index].min_stok) && parseInt(this.produks[index].jumlah_stok) < parseInt(this.temp[index])){
          return 'orange'
        }else{
          return 'green'
          } 
            
      },
    },
    mounted() {
      this.getData();
    },
  };
</script>
