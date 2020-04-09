<template>
  <v-container>
    <!-- <v-bottom-navigation v-model="bottomNav" dark shift>
      <v-btn>
        <span>Aktif</span>
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>

      <v-btn>
        <span>Non Aktif</span>
        <v-icon>mdi-delete-empty</v-icon>
      </v-btn>
    </v-bottom-navigation>-->
    <v-card>
      <v-container grid-list-md mb-20>
        <h2 class="text-md-center">Data Jenis Hewan Kouvee Petshop</h2>
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
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>Tambah
              Jenis Hewan
            </v-btn>
          </v-flex>
          <v-flex xs6 class="text-right">
            <v-text-field
              v-model="keyword"
              append-icon="mdi-search"
              label="Cari"
              hide-details="auto"
              outlined
              clearable
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-data-table :headers="headers" :items="jenishewans" :search="keyword">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_jenis_hewan">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_jenis_hewan }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.created_by }}</td>
                <td>{{ item.modified_at }}</td>
                <td>{{ item.modified_by }}</td>
                <!-- <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>-->
                <!-- <td>{{ item.aktif }}</td> -->

                <td>
                  <div>
                    <v-btn icon color="blue" light @click="editHandler(item)">
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
    <!-- ---------------------Dialog----------------------------------- -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Detail Jenis Hewan</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Jenis Hewan*"
                    v-model="form.nama"
                    required
                    outlined
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
            @click="resetForm(), reset(), (dialog = false)"
            >Tutup</v-btn
          >
          <v-btn color="blue darken-1" text @click="cekKosong()">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogEdit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Detail Jenis Hewan</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Jenis Hewan*"
                  v-model="form.nama"
                  required
                  outlined=""
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*wajib diisi</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="resetForm(), (dialogEdit = false)"
            >Tutup</v-btn
          >
          <v-btn color="blue darken-1" text @click="setForm()">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- -------------------------------------------------------- -->
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
      rules: [(value) => !!value || "Wajib di isi."],
      dialog: false,
      jenishewans: [],
      keyword: "",
      on: "",
      bottomNav: 1,
      menu: false,
      headers: [
        {
          text: "No",
          value: "index",
        },
        {
          text: "Id Jenis Hewan",
          value: "id_jenis_hewan",
        },
        {
          text: "Jenis Hewan",
          value: "nama",
        },
        {
          text: "Tanggal Dibuat",
          value: "created_at",
        },
        {
          text: "Dibuat Oleh",
          value: "created_by",
        },
        {
          text: "Tanggal Diubah",
          value: "modified_by",
        },
        {
          text: "Diubah Oleh",
          value: "modified_by",
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
          value: null,
        },
      ],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        nama: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
      },
      jenishewan: new FormData(),
      dialogWarning: "",
      dialogEdit: "",
      deleteDialog: false,
      typeInput: "new",
      errors: "",
      updatedId: "",
    };
  },
  // computed: {
  //   color() {
  //     switch (this.bottomNav) {
  //       case 0:
  //         return "blue-grey";
  //       case 1:
  //         return "teal";
  //     }
  //   }
  // },
  methods: {
    cekKosong() {
      if (this.form.nama === "") {
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
      this.show = false;
    },
    getData() {
      var uri = this.$apiUrl + "JenisHewan";
      this.$http.get(uri).then((response) => {
        this.jenishewans = response.data.message;
      });
    },
    sendData() {
      this.jenishewan.append("nama", this.form.nama);
      this.jenishewan.append("created_by", this.form.created_by);

      var uri = this.$apiUrl + "JenisHewan";
      this.load = true;
      this.$http
        .post(uri, this.jenishewan)
        .then((response) => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialog = false;
          this.getData();
          this.resetForm();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Try Again";
          this.color = "red";
          this.load = false;
        });
    },
    updateData() {
      this.jenishewan.append("nama", this.form.nama);
      this.jenishewan.append("modified_by", this.form.modified_by);
      var uri = this.$apiUrl + "JenisHewan/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.jenishewan)
        .then((response) => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil data jenis hewan
          this.resetForm();
          this.typeInput = "new";
        })
        .catch((error) => {
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
      this.dialogEdit = true;
      this.form.nama = item.nama;
      this.updatedId = item.id_jenis_hewan;
    },
    deleteRow(item) {
      this.deleteId = item.id_jenis_hewan;
      this.deleteDialog = true;
    },
    deleteData(deleteId) {
      //menghapus data
      this.jenishewan.append("delete_by", this.form.delete_by);
      var uri = this.$apiUrl + "JenisHewan" + "/delete/" + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.jenishewan)
        .then((response) => {
          this.snackbar = true;
          this.text = response.data.message;
          this.color = "green";
          this.deleteDialog = false;
          this.getData();
        })
        .catch((error) => {
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
        modified_by: sessionStorage.getItem("Nama"),
      };
    },
    resetFormPassword() {
      this.form = {
        password: "",
      };
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
