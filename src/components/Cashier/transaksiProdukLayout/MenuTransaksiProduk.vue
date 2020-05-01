<template>
  <v-container>
    
    <!-- ------------------Menu Transaksi Produk-------------------------------------- -->
    <v-card v-if="this.tabs == 0">
      <v-container grid-list-md mb-20>
        <h2 class="text-md-center">Data Transaksi Produk Kouvee Petshop</h2>
        <v-layout row wrap style="margin:10px">
         
          <!-- <v-flex xs6 class="text-right">
            <v-text-field
              v-model="keyword"
              append-icon="mdi-search"
              label="Cari"
              hide-details="auto"
              outlined
              clearable
            >
            </v-text-field>
          </v-flex>-->
        </v-layout>
        <v-data-table :headers="headers" :items="transaksiProduks">
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="(item, index) in items"
                :key="item.id_transaksi_produk"
              >
                <td>{{ index + 1 }}</td>
                <td
                  class="underlinetext"
                  @click="showDetail2(item)"
                  style="cursor:pointer"
                >
                  {{ item.id_transaksi_produk }}
                </td>
                <td>{{ item.nama_pelanggan }}</td>
                <td>{{ item.nama_hewan }}</td>
                <td>{{ item.total }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.tanggal_lunas }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.created_by }}</td>
                <td>{{ item.modified_at }}</td>
                <td>{{ item.modified_by }}</td>
                <!-- <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>-->

                <td>
                 

                  <div>
                    <v-btn
                      icon
                      color="red lighten-2"
                      dark
                      v-on="on"
                      @click="deleteRow(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    
    <!-- ------------------Dialog untuk konfirmasi delete-------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="deleteDialog">
        <v-card>
          <v-card-title class="headline Red lighten-2" primary-title
            >Konfirmasi Hapus</v-card-title
          >
          <v-card-text>Data yang akan dihapus, Lanjutkan ?</v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="deleteDialog = false"
              >Batal</v-btn
            >
            <v-btn color="primary" text @click="deleteDataProduk(deleteId)"
              >Hapus</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    
    <!------------------------ Detail Layanan Dialog ------------------------>
    <template>
      <v-dialog
        v-model="dialogDetailTransaksiLayanan"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <v-spacer />
            <h2 class="text-md-center">
              {{ 'Id Transaksi Layanan: ' + detailItem.id_transaksi_layanan }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-simple-table height="50%">
                <thead>
                  <tr>
                    <th class="text-left">Id Detail Transaksi</th>
                    <th class="text-left">Nama Layanan</th>
                    <th class="text-left">Ukuran Hewan</th>
                    <th class="text-left">Harga Satuan</th>
                    <th class="text-left">Jumlah</th>
                    <th class="text-left">Total Harga</th>
                    <th class="text-left">Tanggal Dibuat</th>
                    <th class="text-left">Dibuat Oleh</th>
                    <th class="text-left">Tanggal Diubah</th>
                    <th class="text-left">Diubah Oleh</th>
                    <th class="text-left">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in filteredItems(detailItem)"
                    :key="item.id_detail_transaksi_layanan"
                  >
                    <td>{{ item.id_detail_transaksi_layanan }}</td>
                    <td>{{ item.nama_layanan }}</td>
                    <td>{{ item.ukuran_hewan }}</td>
                    <td>{{ item.harga }}</td>
                    <td>{{ item.jumlah }}</td>
                    <td>{{ item.total_harga }}</td>
                    <td>{{ item.created_at }}</td>
                    <td>{{ item.created_by }}</td>
                    <td>{{ item.modified_at }}</td>
                    <td>{{ item.modified_by }}</td>
                    <td>
                     
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-container>
            <br />
            <div class="text-right">
              <v-simple-table>
                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ 'Subtotal : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.subtotal }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Diskon : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.diskon }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Total : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.total }}</h3>
                    </td>
                  </tr>
                </td>
              </v-simple-table>
              <div v-if="this.layananTab == 'layananTab-1'">
                <v-btn
                  depressed
                  dark
                  class="elevation-2"
                  x-large
                  style="text-transform: none !important;"
                  color="#f9c99e"
                  @click="
                    (dialogDetailTransaksiLayanan = false),
                      updateProgressLayanan(detailItem)
                  "
                >
                  <v-icon size="18" class="mr-2">mdi-check-bold</v-icon>Layanan
                  Selesai
                </v-btn>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogDetailTransaksiLayanan = false"
              >Tutup</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!------------------------ Detail Produk Dialog ------------------------>
    <template>
      <v-dialog
        v-model="dialogDetailTransaksiProduk"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <v-spacer />
            <h2 class="text-md-center">
              {{ 'Id Transaksi Produk: ' + detailItem2.id_transaksi_produk }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-simple-table height="50%">
                <thead>
                  <tr>
                    <th class="text-left">Id Detail Transaksi</th>
                    <th class="text-left">Nama Produk</th>
                    <th class="text-left">Harga Satuan</th>
                    <th class="text-left">Jumlah</th>
                    <th class="text-left">Total Harga</th>
                    <th class="text-left">Tanggal Dibuat</th>
                    <th class="text-left">Dibuat Oleh</th>
                    <th class="text-left">Tanggal Diubah</th>
                    <th class="text-left">Diubah Oleh</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in filteredItems2(detailItem2)"
                    :key="item.id_detail_transaksi_produk"
                  >
                    <td>{{ item.id_detail_transaksi_produk }}</td>
                    <td>{{ item.nama_produk }}</td>
                    <td>{{ item.harga }}</td>
                    <td>{{ item.jumlah }}</td>
                    <td>{{ item.total_harga }}</td>
                    <td>{{ item.created_at }}</td>
                    <td>{{ item.created_by }}</td>
                    <td>{{ item.modified_at }}</td>
                    <td>{{ item.modified_by }}</td>
                    <td>
                    </td>
                      
                  </tr>
                </tbody>
              </v-simple-table>
            </v-container>
            <br />
            <div class="text-right">
              <v-simple-table>
                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ 'Subtotal : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.subtotal }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Diskon : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.diskon }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Total : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.total }}</h3>
                    </td>
                  </tr>
                </td>
              </v-simple-table>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogDetailTransaksiProduk = false"
              >Tutup</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
   

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
      cari: '',
      tabs: 0,
      dialog: false,
      detilTransaksis: [],
      detailTransaksiLayanans: [],
      detailTransaksiProduks: [],
      selectedIndex: 0,
      detailItem: '',
      detailItem2: '',
      transaksiProduks: [],
      transaksiLayanans: [],
      keyword: '',
      hewans: [],
      pelanggans: [],
      produks: [],
      bottomNav: 1,
      menu: false,
      on: '',
      deleteDialog: '',
      submit: '',
      headers: [
        {
          text: 'No',
          value: 'index',
        },
        {
          text: 'Id Transaksi Produk',
          value: 'id_transaksi_produk',
        },
        {
          text: 'Nama Pelanggan',
          value: 'nama_pelanggan',
        },
        {
          text: 'Nama Hewan',
          value: 'nama_hewan',
        },
        {
          text: 'Total',
          value: 'total',
        },
        {
          text: 'Status',
          value: 'status',
        },
        {
          text: 'Tanggal Lunas',
          value: 'tanggal_lunas',
        },
        {
          text: 'Tanggal Dibuat',
          value: 'created_at',
        },
        {
          text: 'Dibuat Oleh',
          value: 'created_by',
        },
        {
          text: 'Tanggal Diubah',
          value: 'modified_by',
        },
        {
          text: 'Diubah Oleh',
          value: 'modified_by',
        },
        {
          text: 'Aksi',
          value: null,
        },
      ],
      
     
      dialogWarning: '',
      dialogEdit: '',
      dialogPassword: '',
      dialogDetailTransaksiLayanan: false,
      dialogDetailTransaksiProduk: false,
      pesan: '',
      search: '',
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        subtotal: '',
        diskon: '',
        id_jenis_hewan: '',
        created_by: sessionStorage.getItem('Nama'),
        delete_by: sessionStorage.getItem('Nama'),
        modified_by: sessionStorage.getItem('Nama'),
        id_customer_service: sessionStorage.getItem('Id'),
      },
      user: new FormData(),
      detil: new FormData(),
      transaksiLayanan: new FormData(),
      typeInput: 'new',
      errors: '',
      updatedId: '',
    };
  },

  methods: {
    filterProgress() {
      return this.transaksiLayanans.filter((transaksiLayanan) => {
        return transaksiLayanan.progress.match('Sedang Diproses');
      });
    },
    filteredItems(value) {
      return this.detailTransaksiLayanans.filter((i) => {
        return (
          !value.id_transaksi_layanan ||
          i.id_transaksi_layanan === value.id_transaksi_layanan
        );
      });
    },
    filteredItems2(value) {
      return this.detailTransaksiProduks.filter((i) => {
        return (
          !value.id_transaksi_produk ||
          i.id_transaksi_produk === value.id_transaksi_produk
        );
      });
    },
    filterProgress2() {
      return this.transaksiLayanans.filter((transaksiLayanan) => {
        return transaksiLayanan.progress.match('Layanan Selesai');
      });
    },
    selectTabs(selectedTabs) {
      this.tabs = selectedTabs;
    },
    deleteRow(_detilTransaksi) {
      this.detilTransaksis.splice(
        this.detilTransaksis.indexOf(_detilTransaksi),
        1
      );
    },

    
   

    filteredProduk(index) {
      var uri =
        this.$apiUrl +
        'Produk/' +
        'search/' +
        this.detilTransaksis[index].id_produk;
      this.$http.get(uri).then((response) => {
        this.detilTransaksis[index].harga = response.data.message.harga;
        this.detilTransaksis[index].total_harga =
          this.detilTransaksis[index].harga *
          this.detilTransaksis[index].jumlah;
      });
    },
    
  
    getDataProduk() {
      var uri = this.$apiUrl + 'TransaksiProduk/' + 'getWithJoin';
      this.$http.get(uri).then((response) => {
        this.transaksiProduks = response.data.message;
      });
    },
    getDataTransaksiProduk() {
      var uri = this.$apiUrl + 'DetailTransaksiProduk/' + 'getWithJoin';
      this.$http.get(uri).then((response) => {
        this.detailTransaksiProduks = response.data.message;
      });
    },
    getHewan() {
      var uri = this.$apiUrl + 'Hewan/' + 'all';
      this.$http.get(uri).then((response) => {
        this.hewans = response.data.message;
      });
    },
    getPelanggan() {
      var uri = this.$apiUrl + 'Pelanggan/' + 'all';
      this.$http.get(uri).then((response) => {
        this.pelanggans = response.data.message;
      });
    },
    getProduk() {
      var uri = this.$apiUrl + 'Produk/' + 'all';
      this.$http.get(uri).then((response) => {
        this.produks = response.data.message;
      });
    },
    getDataLayanan() {
      var uri = this.$apiUrl + 'TransaksiLayanan/' + 'getWithJoin';
      this.$http.get(uri).then((response) => {
        this.transaksiLayanans = response.data.message;
      });
    },
    getDataTransaksiLayanan() {
      var uri = this.$apiUrl + 'DetailTransaksiLayanan/' + 'getWithJoin';
      this.$http.get(uri).then((response) => {
        this.detailTransaksiLayanans = response.data.message;
      });
    },
    

   
   
  
   
   
    
    showDetail(item) {
      this.detailItem = item;
      this.dialogDetailTransaksiLayanan = true;
    },
    showDetail2(item) {
      this.detailItem2 = item;
      this.dialogDetailTransaksiProduk = true;
    },
   

    customFilter(item, queryText) {
      const textOne = item.nama.toLowerCase();
      const textTwo = item.nama.toLowerCase();
      const searchText = queryText.toLowerCase();

      return (
        textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
      );
    },
  },
  mounted() {
    this.getDataProduk();
    this.getDataLayanan();
    this.getHewan();
    this.getProduk();
    this.getDataTransaksiLayanan();
    this.getDataTransaksiProduk();
  },
};
</script>
<style scoped>
.tombol {
  margin: 2px;
}
.tab {
  margin: 10px;
}
.btn-clicked {
  color: #ffffff;
}
.btn-unclicked {
  color: #000000;
}
.underlinetext {
  text-decoration: underline;
}
</style>
