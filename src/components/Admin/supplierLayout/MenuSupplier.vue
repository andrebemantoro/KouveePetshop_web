<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-20>
        <template>
          <h2 class="text-md-center">Data Supplier Kouvee Petshop</h2>
          <v-layout row wrap style="margin:10px">
            <v-toolbar flat color="white">
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn
                    color="#f9c99e"
                    depressed
                    rounded
                    dark
                    class="mb-2"
                    v-on="on"
                    ><v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon
                    >Tambah Supplier</v-btn
                  >
                </template>
                <v-card>
                  <v-card-title>
                    <v-spacer />
                    <span class="headline">Tambah Supplier</span>
                    <v-spacer />
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-form ref="form">
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              label="Nama*"
                              v-model="form.nama"
                              required
                              outlined=""
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Alamat*"
                              v-model="form.alamat"
                              required
                              outlined=""
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                          <v-col cols="12">
                            <v-text-field
                              label="Nomor Telepon*"
                              v-model="form.telp"
                              required
                              outlined=""
                              :rules="rules"
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-form>
                    </v-container>
                    <small>*wajib diisi</small>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="resetForm(), (dialog = false)"
                      >Tutup</v-btn
                    >
                    <v-btn color="blue darken-1" text @click="cekKosong()"
                      >Simpan</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-spacer></v-spacer>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-flex xs6 class="text-right">
                <v-text-field
                  v-model="search"
                  label="Cari"
                  single-line
                  hide-details
                  outlined=""
                  clearable=""
                ></v-text-field>
              </v-flex>
            </v-toolbar>
          </v-layout>
        </template>
        <v-layout class="mx-4">
          <v-flex>
            <template>
              <v-row>
                <v-col v-for="(item, i) in suppliers" :key="i" cols="3">
                  <v-card class="mx-auto" max-width="344">
                    <!-- <v-img      
                  :src= "$apiUrl2+'produk/'+item.gambar"
                  contain
                  class="grey lighten-2"
                 
                  height="200" 
                /> -->
                    <v-card-title>
                      {{ item.nama }}
                    </v-card-title>

                    <v-card-subtitle>
                      ID Supplier: {{ item.id_supplier }}
                    </v-card-subtitle>

                    <v-card-actions>
                      <v-btn text @click="editHandler(item)"
                        >Ubah Supplier</v-btn
                      >
                      <v-spacer></v-spacer>
                      <v-btn
                        color="red lighten-2"
                        text
                        v-on="on"
                        @click="deleteRow(item)"
                      >
                        Hapus
                      </v-btn>
                      <!-- ------------------Dialog untuk konfirmasi delete-------------------------------------- -->
                      <div class="text-center">
                        <v-dialog width="500" v-model="deleteDialog">
                          <v-card>
                            <v-card-title
                              class="headline Red lighten-2"
                              primary-title
                              >Konfirmasi Hapus</v-card-title
                            >
                            <v-card-text
                              >Data yang akan dihapus, Lanjutkan ?</v-card-text
                            >
                            <v-divider></v-divider>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn
                                color="primary"
                                text
                                @click="deleteDialog = false"
                                >Batal</v-btn
                              >
                              <v-btn
                                color="primary"
                                text
                                @click="deleteData(deleteId)"
                                >Hapus</v-btn
                              >
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </div>
                      <v-spacer></v-spacer>

                      <v-btn icon @click="updateMunculke(item)">
                        <v-icon>{{
                          item.id_supplier == munculke
                            ? "mdi-chevron-up"
                            : "mdi-chevron-down"
                        }}</v-icon>
                      </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                      <!-- <div v-show="show"> -->
                      <div v-if="item.id_supplier == munculke">
                        <v-divider></v-divider>

                        <v-card-text>
                          <v-card-subtitle>
                            Alamat : {{ item.alamat }}<br />
                            Nomor Telepon : {{ item.telp }}<br />
                            Dibuat Oleh : {{ item.created_by }}<br />
                            Tanggal Dibuat : {{ item.created_at }}<br />
                            Diubah Oleh : {{ item.modified_by }}<br />
                            Tanggal Diubah : {{ item.modified_at }}<br />
                          </v-card-subtitle>
                        </v-card-text>
                      </div>
                    </v-expand-transition>
                  </v-card>

                  <v-snackbar
                    v-model="snackbar"
                    :color="color"
                    :multi-line="true"
                    :timeout="3000"
                  >
                    {{ text }}
                    <v-btn dark text @click="snackbar = false"> Tutup </v-btn>
                  </v-snackbar>
                </v-col>
              </v-row>
            </template>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
    <!-- ------------------Dialog untuk warning kosong-------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="dialogWarning">
        <v-card>
          <v-card-title class="headline Red lighten-2" primary-title
            >Data Harus Diisi Semua !</v-card-title
          >

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="dialogWarning = false"
              >Kembali</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      rules: [value => !!value || "Wajib diisi."],
      dialogWarning: "",
      munculke: 0,
      show: false,
      dialog: false,
      keyword: "",
      suppliers: [],
      snackbar: false,
      color: null,
      text: "",
      on: "",
      deleteDialog: "",
      load: false,
      form: {
        nama: "",
        alamat: "",
        telp: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama")
      },
      supplier: new FormData(),
      pesan: "",
      search: "",
      typeInput: "new",
      errors: "",
      updatedId: ""
    };
  },

  methods: {
    cekKosong() {
      if (
        this.form.nama === "" ||
        this.form.alamat === "" ||
        this.form.telp === ""
      ) {
        this.dialogWarning = true;
      } else {
        this.setForm();
        this.resetForm();
        this.reset();
        this.dialog = false;
      }
    },
    reset() {
      this.$refs.form.resetValidation();
    },
    getData() {
      var uri = this.$apiUrl + "Supplier/" + "getAll";
      this.$http.get(uri).then(response => {
        this.suppliers = response.data.message;
      });
    },
    updateMunculke(item) {
      if (this.munculke == 0) this.munculke = item.id_supplier;
      else if (this.munculke == item.id_supplier) this.munculke = 0;
      else this.munculke = item.id_supplier;
      // console.log(this.produks[i])
    },
    sendData() {
      this.supplier.append("nama", this.form.nama);
      this.supplier.append("alamat", this.form.alamat);
      this.supplier.append("telp", this.form.telp);
      this.supplier.append("created_by", this.form.created_by);

      var uri = this.$apiUrl + "Supplier";
      this.load = true;
      this.$http
        .post(uri, this.supplier)
        .then(response => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil [pegawai]
          this.resetForm();
        })
        .catch(error => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
        });
    },
    updateData() {
      this.supplier.append("nama", this.form.nama);
      this.supplier.append("alamat", this.form.alamat);
      this.supplier.append("telp", this.form.telp);
      this.supplier.append("modified_by", this.form.modified_by);
      var uri = this.$apiUrl + "Supplier/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.supplier)
        .then(response => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil databong
          this.resetForm();
          this.typeInput = "new";
        })
        .catch(error => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
          this.typeInput = "new";
        });
    },
    editHandler(item) {
      this.typeInput = "edit";
      this.dialog = true;
      this.form.nama = item.nama;
      this.form.alamat = item.alamat;
      this.form.telp = item.telp;
      this.updatedId = item.id_supplier;
    },
    deleteRow(item) {
      this.deleteId = item.id_supplier;
      this.deleteDialog = true;
    },
    deleteData(deleteId) {
      //mengahapus data
      this.supplier.append("delete_by", this.form.delete_by);
      var uri = this.$apiUrl + "Supplier" + "/delete/" + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.supplier)
        .then(response => {
          this.snackbar = true;
          this.text = response.data.message;
          this.color = "green";
          this.deleteDialog = false;
          this.getData();
        })
        .catch(error => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
        });
    },
    setForm() {
      if (this.typeInput === "new") {
        this.sendData();
      } else {
        console.log("data berhasil diubah");
        this.updateData();
      }
    },
    resetForm() {
      this.form = {
        nama: "",
        alamat: "",
        telp: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama")
      };
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
