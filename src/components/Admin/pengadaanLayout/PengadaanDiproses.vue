<template>
  <v-container>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="12">
        <v-bottom-navigation :value="activeBtn" grow color="#fd8c00">
          <v-btn @click="Pengadaan()">
            <span>Menunggu Konfirmasi</span>
            <v-icon>mdi-history</v-icon>
          </v-btn>

          <v-btn @click="PengadaanDiproses()">
            <span>Sedang Diproses</span>
            <v-icon>mdi-truck</v-icon>
          </v-btn>

          <v-btn @click="PengadaanSelesai()">
            <span>Selesai</span>
            <v-icon>mdi-checkbox-multiple-marked-outline</v-icon>
          </v-btn>
        </v-bottom-navigation>
        <v-card>
          <!-- <v-container grid-list-md mb-20> -->
          <div class="pa-3">
            <h2 class="text-md-center">Pengadaan Produk Dalam Proses</h2>
            <v-layout row wrap style="margin:10px">
              <v-flex xs6> </v-flex>
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
            <v-data-table :headers="headers" :items="filterProgres(pengadaans)">
              <template v-slot:body="{ items }">
                <tbody>
                  <tr
                    v-for="(item, index) in items"
                    :key="item.id_pengadaan_produk"
                  >
                    <td>{{ index + 1 }}</td>
                    <td
                      class="underlinetext"
                      @click="showDetail(item)"
                      style="cursor:pointer"
                    >
                      {{ item.id_pengadaan_produk }}
                    </td>
                    <td>{{ item.nama_supplier }}</td>
                    <td>{{ item.total }}</td>
                    <td>{{ item.status }}</td>
                    <td>{{ item.created_at }}</td>
                    <td>{{ item.created_by }}</td>
                    <td>{{ item.modified_at }}</td>
                    <td>{{ item.modified_by }}</td>
                    <!-- <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>-->

                    <td>
                      <div>
                        <v-btn
                          color="blue darken-1"
                          icon=""
                          @click="updatePengadaanSelesai(item)"
                          ><v-icon>mdi-arrow-right-box</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-data-table>
          </div>
          <!-- </v-container> -->
        </v-card>
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>

    <!------------------------  Dialog detail pengadaan------------------------>
    <template>
      <v-dialog
        v-model="dialogDetailPengadaanProduk"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <v-spacer />
            <h2 class="text-md-center">
              {{ 'Id Pengadaan Produk: ' + detailItem.id_pengadaan_produk }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <!-- <v-container> -->
            <v-simple-table height="50%">
              <thead>
                <tr>
                  <th class="text-left">Id Detail Pengadaan</th>
                  <th class="text-left">Nama Produk</th>
                  <th class="text-left">Jumlah</th>
                  <th class="text-left">Harga</th>
                  <th class="text-left">Total Harga</th>
                  <th class="text-left">Tanggal Dibuat</th>
                  <th class="text-left">Dibuat Oleh</th>
                  <th class="text-left">Tanggal Diubah</th>
                  <th class="text-left">Diubah Oleh</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in filteredItems2(detailItem)"
                  :key="item.id_detail_pengadaan"
                >
                  <td>{{ item.id_detail_pengadaan }}</td>
                  <td>{{ item.nama_produk }}</td>
                  <td>{{ item.jumlah }}</td>
                  <td>{{ item.harga }}</td>
                  <td>{{ item.total_harga }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>{{ item.created_by }}</td>
                  <td>{{ item.modified_at }}</td>
                  <td>{{ item.modified_by }}</td>
                </tr>
              </tbody>
            </v-simple-table>
            <!-- </v-container> -->
            <br />

            <div class="text-right">
              <v-simple-table>
                <td class="text-right">
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
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              outlined=""
              @click="dialogDetailPengadaanProduk = false"
              >Tutup</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- ------------------------------------------------------------------------- -->

    <v-snackbar
      v-model="snackbar"
      :color="color"
      :multi-line="true"
      :timeout="3000"
    >
      {{ text }}

      <v-btn dark text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        headers: [
          {
            text: 'No',
            value: 'index',
          },
          {
            text: 'Id Pengadaan Produk',
            value: 'id_pengadaan_produk',
          },
          {
            text: 'Nama Supplier',
            value: 'nama_supplier',
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
        activeBtn: 1,
        dialog: false,
        confirmationDialog: false,
        editedIndex: -1,
        produks: [],
        pengadaans: [],
        detailPengadaans: [],
        suppliers: [],
        detailTambah: [],
        id_supplier: null,
        empty: null,
        dialogDetailPengadaanProduk: false,
        detailItem: '',
        on: '',

        status: new FormData(),
        form: {
          subtotal: 0,
          created_by: sessionStorage.getItem('Nama'),
          delete_by: sessionStorage.getItem('Nama'),
          modified_by: sessionStorage.getItem('Nama'),
        },
        typeInput: 'new',
        search: '',
        snackbar: false,
        color: null,
        text: '',
        load: false,
      };
    },

    methods: {
      Pengadaan() {
        this.$router.push({ name: 'Pengadaan' });
      },
      PengadaanDiproses() {
        this.$router.push({ name: 'PengadaanDiproses' });
      },
      PengadaanSelesai() {
        this.$router.push({ name: 'PengadaanSelesai' });
      },
      getSupplier() {
        var uri = this.$apiUrl + 'Supplier';
        this.$http.get(uri).then((response) => {
          this.suppliers = response.data.message;
        });
      },
      getProduk() {
        var uri = this.$apiUrl + 'Produk/' + 'all';
        this.$http.get(uri).then((response) => {
          this.produks = response.data.message;
        });
      },
      getPengadaan() {
        var uri = this.$apiUrl + 'PengadaanProduk/' + 'getWithJoin';
        this.$http.get(uri).then((response) => {
          this.pengadaans = response.data.message;
        });
      },
      getDetailPengadaan() {
        var uri = this.$apiUrl + 'DetailPengadaan/' + 'getWithJoin';
        this.$http.get(uri).then((response) => {
          this.detailPengadaans = response.data.message;
        });
      },
      setTotal(index) {
        this.detailTambah[index].total_harga =
          this.detailTambah[index].jumlah * this.detailTambah[index].harga;
      },
      setSubtotal() {
        this.form.subtotal = 0;
        for (var i = 0; i < this.detailTambah.length; i++) {
          this.form.subtotal =
            this.form.subtotal + this.detailTambah[i].total_harga;
        }
      },

      filterProgres() {
        return this.pengadaans.filter((pengadaan) => {
          return pengadaan.status.match('Pesanan Diproses');
        });
      },
      filteredItems2(value) {
        return this.detailPengadaans.filter((i) => {
          return (
            !value.id_pengadaan_produk ||
            i.id_pengadaan_produk === value.id_pengadaan_produk
          );
        });
      },
      showDetail(item) {
        this.detailItem = item;
        this.dialogDetailPengadaanProduk = true;
      },

      updatePengadaanSelesai(item) {
        this.status.append('status', item.status);
        this.status.append('modified_by', this.form.modified_by);
        this.status.append('created_by', item.created_by);
        this.status.append('id_supplier', item.id_supplier);
        console.log(this.form.status);
        var uri =
          this.$apiUrl +
          'PengadaanProduk/' +
          'updateStatusToSelesai/' +
          item.id_pengadaan_produk;
        this.load = true;
        this.$http
          .post(uri, this.status)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan ke snackba r
            this.load = false;
            this.dialogDetailPengadaanProduk = false;
            this.getPengadaan();
            this.getDetailPengadaan();
            window.location.reload();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = error;
            // this.text = 'Try Again';
            this.color = 'red';
            this.load = false;
          });
      },
      editHandler(company) {
        this.dialog = true;
        this.typeInput = 'edit';
        this.form.id = company.id_company;
        this.form.company_name = company.company_name;
        this.form.address = company.address;
        this.form.city = company.city;
        this.form.province = company.province;
        this.form.phone_number = company.phone_number;
        this.form.company_email = company.company_email;
        this.form.company_description = company.company_description;
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
      this.getProduk();
      this.getSupplier();
      this.getPengadaan();
      this.getDetailPengadaan();
    },
  };
</script>
<style scoped>
  .text-md-center {
    font-family: 'Raleway', sans-serif;
  }
  .text-center {
    font-family: 'Raleway', sans-serif;
  }
  .v-card__title {
    color: black;
  }
</style>
