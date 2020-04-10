/* eslint-disable vue/no-unused-vars */
<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <h2 class="text-md-center">Data Layanan Kouvee Petshop</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
              depressed
              dark
              rounded
              style="text-transform: none !important;"
              color="#f9c99e"
              @click="dialog = true"
            >
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
              Tambah Layanan
            </v-btn>
          </v-flex>
          <v-flex xs6 class="text-right">
            <v-text-field
              v-model="keyword"
              append-icon="mdi-search"
              label="Search"
              hide-details
            >
            </v-text-field>
          </v-flex>
        </v-layout>
        <v-data-table
          :headers="headers"
          :items="hargalayanans"
          :search="keyword"
          :single-expand="true"
          :expanded.sync="expanded"
          item-key="id_harga_layanan"
          show-expand
          class="elevation-1"
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td>{{ item.nama_ukuran_hewan }}</td>
            <td :colspan="headers.length">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th>Ukuran Hewan</th>
                      <th>Harga Layanan</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="hargalayanan in hargalayanans"
                      :key="hargalayanan.id_harga_layanan"
                    >
                      <td>{{ hargalayanan.nama_ukuran_hewan }}</td>
                      <td>{{ hargalayanan.harga }}</td>
                      <td>
                        <div>
                          <v-btn
                            icon
                            color="blue"
                            light
                            @click="editHandler(item)"
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
              </v-simple-table>
            </td>
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
            <v-btn color="primary" text @click="deleteData(deleteId)"
              >Hapus</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Detail Layanan</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nama*"
                  v-model="form.nama"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*wajib diisi</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Tutup</v-btn
          >
          <v-btn color="blue darken-1" text @click="setForm()">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      expanded: [],
      singleExpand: true,
      dialog: false,
      // items: ["Buah", "Lusin", "Box"],
      keyword: "",
      deleteDialog: "",
      on: "",
      headers: [
        {
          text: "Id Layanan",
          value: "id_layanan"
        },
        {
          text: "Nama Layanan",
          value: "nama_layanan"
        },
        {
          text: "Tanggal Dibuat",
          value: "created_at"
        },
        {
          text: "Dibuat Oleh",
          value: "created_by"
        },
        {
          text: "Tanggal Diubah",
          value: "modified_by"
        },
        {
          text: "Diubah Oleh",
          value: "modified_by"
        },
        // {
        //   text: "Delete At",
        //   value: "delete_at"
        // },
        // {
        //   text: "Delete By",
        //   value: "delete_by"
        // },
        // {
        //   text: "Aktif",
        //   value: "aktif"
        // },
        {
          text: "Aksi",
          value: null
        }
      ],
      layanans: [],
      hargalayanans: [],
      ukurans: [],
      snackbar: false,
      dialogEdit: "",
      dialogPassword: "",
      pesan: "",
      item: "",
      search: "",
      color: null,
      text: "",
      load: false,
      form: {
        nama: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama")
      },
      layanan: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: ""
    };
  },
  methods: {
    getData() {
      var uri = this.$apiUrl + "HargaLayanan/getWithJoin";
      this.$http.get(uri).then(response => {
        this.hargalayanans = response.data.message;

        // array.forEach(hargalayanans => {
        //   forEach(filtered) {
        //     this.hargalayananfiltered
        //   }

        // });
      });
    },
    getLayanan() {
      var uri = this.$apiUrl + "Layanan";
      this.$http.get(uri).then(response => {
        this.layanans = response.data.message;
      });
    },
    getUkuran() {
      var uri = this.$apiUrl + "UkuranHewan";
      this.$http.get(uri).then(response => {
        this.ukurans = response.data.message;
      });
    },
    sendData() {
      this.hargalayanan.append("nama", this.form.nama);
      this.hargalayanan.append("");
      this.hargalayanan.append("created_by", this.form.created_by);

      var uri = this.$apiUrl + "Layanan";
      this.load = true;
      this.$http
        .post(uri, this.hargalayanan)
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
          this.text = "Try Again";
          this.color = "red";
          this.load = false;
        });
    },
    updateData() {
      this.layanan.append("nama", this.form.nama);
      this.layanan.append("modified_by", this.form.modified_by);
      var uri = this.$apiUrl + "Layanan/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.layanan)
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
          this.text = "Try Again";
          this.color = "red";
          this.load = false;
          this.typeInput = "new";
        });
    },
    editHandler(item) {
      this.typeInput = "edit";
      this.dialog = true;
      this.form.nama = item.nama;
      this.updatedId = item.id_layanan;
    },
    deleteData(deleteId) {
      //mengahapus data
      this.layanan.append("delete_by", this.form.delete_by);
      var uri = this.$apiUrl + "Layanan" + "/delete/" + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.layanan)
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
          this.text = "Try Again";
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
