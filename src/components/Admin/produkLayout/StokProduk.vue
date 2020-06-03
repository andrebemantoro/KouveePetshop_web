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
          <v-spacer></v-spacer>
          <v-vlex>
          <v-btn outlined=""
          rounded=""
          class="tombol"
          @click="changeHeader()"
          >Stok Habis</v-btn>
          <v-btn outlined=""
          rounded=""
          class="tombol"
          @click="changeHeader2()"
          >Sort</v-btn>
          </v-vlex>
        </v-layout>
  <div v-if="cekHeader==0">

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
  </div>
  <div v-if="cekHeader==1">

        <v-data-table :headers="headers" :items="produks2" :search="keyword">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_produk">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_produk }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.min_stok }}</td>
                <td>
                  <v-chip :color="getColor2(index)" dark="">
                    {{ item.jumlah_stok }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
  </div>
  <div v-if="cekHeader==2">

        <v-data-table :headers="headers" :items="produks3" :search="keyword">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_produk">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_produk }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.min_stok }}</td>
                <td>
                  <v-chip :color="getColor3(index)" dark="">
                    {{ item.jumlah_stok }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
  </div>
  <div v-if="cekHeader==3">

        <v-data-table :headers="headers" :items="produks4" :search="keyword">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_produk">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_produk }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.min_stok }}</td>
                <td>
                  <v-chip :color="getColor4(index)" dark="">
                    {{ item.jumlah_stok }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
  </div>
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
        cekHeader: 0,
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
        produks2: [],
        produks3: [],
        produks4: [],

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
      getData2() {
        var uri = this.$apiUrl + 'Produk/' + 'getProdukMin';
        this.$http.get(uri).then((response) => {
          this.produks2 = response.data.message;
        });
      },
      getData3() {
        var uri = this.$apiUrl + 'Produk/' + 'getProdukASC';
        this.$http.get(uri).then((response) => {
          this.produks3 = response.data.message;
        });
      },
      getData4() {
        var uri = this.$apiUrl + 'Produk/' + 'getProdukDESC';
        this.$http.get(uri).then((response) => {
          this.produks4 = response.data.message;
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
      getColor2(index) {
        this.temp[index] =
          parseInt(this.produks2[index].min_stok) + parseInt(this.temp2);
         
      
        if (parseInt(this.produks2[index].jumlah_stok) < parseInt(this.produks2[index].min_stok)){
          return 'red'
          } else if (parseInt(this.produks2[index].jumlah_stok) > parseInt(this.produks2[index].min_stok) && parseInt(this.produks2[index].jumlah_stok) < parseInt(this.temp[index])){
          return 'orange'
        }else{
          return 'green'
          } 
            
      },
      getColor3(index) {
        this.temp[index] =
          parseInt(this.produks3[index].min_stok) + parseInt(this.temp2);
         
      
        if (parseInt(this.produks3[index].jumlah_stok) < parseInt(this.produks3[index].min_stok)){
          return 'red'
          } else if (parseInt(this.produks3[index].jumlah_stok) > parseInt(this.produks3[index].min_stok) && parseInt(this.produks3[index].jumlah_stok) < parseInt(this.temp[index])){
          return 'orange'
        }else{
          return 'green'
          } 
            
      },
      getColor4(index) {
        this.temp[index] =
          parseInt(this.produks4[index].min_stok) + parseInt(this.temp2);
         
      
        if (parseInt(this.produks4[index].jumlah_stok) < parseInt(this.produks4[index].min_stok)){
          return 'red'
          } else if (parseInt(this.produks4[index].jumlah_stok) > parseInt(this.produks4[index].min_stok) && parseInt(this.produks4[index].jumlah_stok) < parseInt(this.temp[index])){
          return 'orange'
        }else{
          return 'green'
          } 
            
      },
      changeHeader(){
        if(this.cekHeader == 0){
          this.cekHeader = 1;
        }else{
          this.cekHeader = 0;
        }
      },
      changeHeader2(){
        if(this.cekHeader == 0 || this.cekHeader == 1 || this.cekHeader == 3){
          this.cekHeader = 2;
        }else{
          this.cekHeader = 3;
        }
      },
 
    },
    mounted() {
      this.getData();
      this.getData2();
      this.getData3();
      this.getData4();
    },
  };
</script>
<style scoped>
.tombol{
  margin: 2px;
}
</style>
