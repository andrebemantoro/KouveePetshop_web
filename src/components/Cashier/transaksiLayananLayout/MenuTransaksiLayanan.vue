<template>
  <v-container>
    <!-- ------------------Menu Transaksi Layanan-------------------------------------- -->
    <v-card>
      <v-container grid-list-md mb-20>
        <div>
          <v-tabs v-model="layananTab" color="#f9c99e" centered>
            <v-tabs-slider color="#f9c99e"></v-tabs-slider>
            <v-tab href="#layananTab-1">Menunggu Pembayaran</v-tab>
            <v-tab href="#layananTab-2">Lunas</v-tab>
          </v-tabs>
        </div>
        <div v-if="this.layananTab == 'layananTab-2'">
          <h2 class="text-md-center">Data Transaksi Layanan Kouvee Petshop</h2>
          <v-layout row wrap style="margin:10px">
           
            <!-- <v-flex xs6 class="text-right">
              <v-text-field
                v-model="keyword2"
                append-icon="mdi-search"
                label="Cari"
                hide-details="auto"
                outlined
                clearable
              >
              </v-text-field>
            </v-flex>-->
          </v-layout>
          <v-data-table :headers="headers2" :items="transaksiLayanans">
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  v-for="(item, index) in filterProgress(items)"
                  :key="item.id_transaksi_layanan"
                >
                  <td>{{ index + 1 }}</td>
                  <td
                    class="underlinetext"
                    @click="showDetail(item)"
                    style="cursor:pointer"
                  >
                    {{ item.id_transaksi_layanan }}
                  </td>
                  <td>{{ item.nama_pelanggan }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.progress }}</td>
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
                        color="blue"
                        light
                        @click="editHandlerProduk(item)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </div>

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
        </div>
        <div v-if="this.layananTab == 'layananTab-1'">
          <h2 class="text-md-center">Data Transaksi Layanan Kouvee Petshop</h2>
          <v-layout row wrap style="margin:10px">
        
            <!-- <v-flex xs6 class="text-right">
              <v-text-field
                v-model="keyword2"
                append-icon="mdi-search"
                label="Cari"
                hide-details="auto"
                outlined
                clearable
              >
              </v-text-field>
            </v-flex>-->
          </v-layout>
          <v-data-table :headers="headers2" :items="transaksiLayanans">
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  v-for="(item, index) in filterProgress2(items)"
                  :key="item.id_transaksi_layanan"
                >
                  <td>{{ index + 1 }}</td>
                  <td
                    class="underlinetext"
                    @click="showDetail(item)"
                    style="cursor:pointer"
                  >
                    {{ item.id_transaksi_layanan }}
                  </td>
                  <td>{{ item.nama_pelanggan }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.progress }}</td>
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
        </div>
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
      dialog: false,
      detilTransaksis: [],
      detailTransaksiLayanans: [],
      selectedIndex: 0,
      detailItem: '',
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
     
      headers2: [
        {
          text: 'No',
          value: 'index',
        },
        {
          text: 'Id Transaksi Layanan',
          value: 'id_transaksi_layanan',
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
          text: 'Progress',
          value: 'progress',
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
      layananTab: null,
      dialogWarning: '',
      dialogEdit: '',
      dialogPassword: '',
      dialogDetailTransaksiLayanan: false,
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

    resetDynamic() {
      while (this.detilTransaksis.length != 0) {
        for (var i = 0; i < this.detilTransaksis.length; i++) {
          this.detilTransaksis.splice(this.detilTransaksis[i], 1);
        }
        this.form.subtotal = '';
        this.form.diskon = '';
        this.form.id_jenis_hewan = '';
      }
    },
    addTransaksi() {
      this.getProduk();
      this.detilTransaksis.push({
        id_customer_service: sessionStorage.getItem('Id'),
        id_transaksi_produk: '',
        id_produk: '',
        jumlah: '',
        total_harga: '',
        harga: '',
        created_at: '',
        created_by: sessionStorage.getItem('Nama'),
        modified_at: '',
        modified_by: '',
        delete_at: '',
        delete_by: '',
      });
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
    setTotal(index) {
      this.detilTransaksis[index].total_harga =
        this.detilTransaksis[index].harga * this.detilTransaksis[index].jumlah;
    },
    setSubtotal() {
      this.form.subtotal = 0;
      for (var i = 0; i < this.detilTransaksis.length; i++) {
        this.form.subtotal =
          this.form.subtotal + this.detilTransaksis[i].total_harga;
      }
      this.form.subtotal = this.form.subtotal - this.form.diskon;
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
    sendDataProduk() {
      this.pegawai.append('nama', this.form.nama);
      this.pegawai.append('tanggal_lahir', this.form.tanggal_lahir);
      this.pegawai.append('alamat', this.form.alamat);
      this.pegawai.append('telp', this.form.telp);
      this.pegawai.append('role', this.form.role);
      this.pegawai.append('username', this.form.username);
      this.pegawai.append('password', this.form.password);
      this.pegawai.append('created_by', this.form.created_by);
    },

    sendDataTransaksi() {
      this.detil.append('id_customer_service', this.form.id);
      this.detil.append('created_by', this.form.created_by);
      this.detil.append('subtotal', this.form.subtotal);
      this.detil.append('diskon', this.form.diskon);
      this.detil.append('id_hewan', this.form.id_jenis_hewan);
      var uri = this.$apiUrl + 'TransaksiProduk';

      this.load = true;
      this.$http
        .post(uri, this.detil)
        .then((response) => {
          this.sendDataDetilTransaksi(response.data.message);
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Coba Lagi';
          this.color = 'red';
          this.load = false;
        });
    },
    sendDataDetilTransaksi(id_transaksi_produk) {
      for (let i = 0; i < this.detilTransaksis.length; i++) {
        this.detilTransaksis[i].id_transaksi_produk = id_transaksi_produk;
      }
      this.user.append(
        'detail_transaksi_produk',
        JSON.stringify(this.detilTransaksis)
      );
      var uri = this.$apiUrl + 'DetailTransaksiProduk/insertMultiple';
      this.load = true;
      this.$http
        .post(uri, this.user)
        .then((response) => {
          this.snackbar = true;
          this.color = 'green';
          this.text = response.data.message;
          this.load = false;
          this.dialog = false;
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Coba Lagi';
          this.color = 'red';
          this.load = false;
        });
    },
    updateDataProduk() {
      this.pegawai.append('nama', this.form.nama);
      this.pegawai.append('tanggal_lahir', this.form.tanggal_lahir);
      this.pegawai.append('alamat', this.form.alamat);
      this.pegawai.append('telp', this.form.telp);
      this.pegawai.append('role', this.form.role);
      this.pegawai.append('username', this.form.username);
      this.pegawai.append('modified_by', this.form.modified_by);
      var uri = this.$apiUrl + 'Pegawai/' + 'update/' + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.pegawai)
        .then((response) => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = 'green'; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialogEdit = false;
          this.getDataProduk(); //mengambil data pegawai
          this.resetFormProduk();
          this.typeInput = 'new';
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Coba Lagi';
          this.color = 'red';
          this.load = false;
        });
    },
    updateProgressLayanan(detailItem) {
      this.updatedId = detailItem.id_transaksi_layanan;
      this.transaksiLayanan.append(
        'modified_by',
        sessionStorage.getItem('Nama')
      );
      console.log(detailItem.id_transaksi_layanan);
      var uri =
        this.$apiUrl + 'TransaksiLayanan/' + 'updateProgress/' + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.transaksiLayanan)
        .then((response) => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = 'green'; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialogEdit = false;
          this.getDataLayanan();
          this.getDataTransaksiLayanan(); //mengambil data transaksi layanan
          this.typeInput = 'new';
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Coba Lagi';
          this.color = 'red';
          this.load = false;
        });
    },
    editHandlerProduk(item) {
      this.typeInput = 'edit';
      this.dialogEdit = true;
      this.form.nama = item.nama;
      this.form.alamat = item.alamat;
      this.form.tanggal_lahir = item.tanggal_lahir;
      this.form.telp = item.telp;
      (this.form.role = item.role), (this.form.username = item.username);
      this.updatedId = item.id_pegawai;
    },
    deleteDataProduk(deleteId) {
      //mengahapus data
      this.pegawai.append('delete_by', this.form.delete_by);
      var uri = this.$apiUrl + 'Pegawai' + '/delete/' + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.pegawai)
        .then((response) => {
          this.snackbar = true;
          this.text = response.data.message;
          this.color = 'green';
          this.deleteDialog = false;
          this.getDataProduk();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Coba Lagi';
          this.color = 'red';
        });
    },
    setFormProduk() {
      if (this.typeInput === 'new') {
        this.sendDataProduk();
      } else {
        console.log('data berhasil diubah');
        this.updateDataProduk();
      }
    },
    showDetail(item) {
      this.detailItem = item;
      this.dialogDetailTransaksiLayanan = true;
    },
    showDetail2(item) {
      this.detailItem2 = item;
      this.dialogDetailTransaksiProduk = true;
    },
    resetFormProduk() {
      this.form = {
        nama: '',
        alamat: '',
        tanggal_lahir: '',
        telp: '',
        role: '',
        username: '',
        password: '',
        created_by: sessionStorage.getItem('Nama'),
        delete_by: sessionStorage.getItem('Nama'),
        modified_by: sessionStorage.getItem('Nama'),
      };
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
