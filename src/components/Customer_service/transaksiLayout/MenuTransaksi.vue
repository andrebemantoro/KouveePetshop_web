<template>
  <v-container>
    <div class="text-md-center">
      <v-btn
        class="tab"
        color="#f9c99e"
        style="text-transform: none !important;"
        :class="tabs ? 'btn-unclicked' : 'btn-clicked'"
        @click="selectTabs(0)"
        >Produk</v-btn
      >
      <v-btn
        class="tab"
        color="#f9c99e"
        style="text-transform: none !important;"
        :class="tabs ? 'btn-clicked' : 'btn-unclicked'"
        @click="selectTabs(1)"
        >Layanan</v-btn
      >
    </div>
    <!-- ------------------Menu Transaksi Produk-------------------------------------- -->
    <v-card v-if="this.tabs == 0">
      <v-container grid-list-md mb-20>
        <h2 class="text-md-center">Data Transaksi Produk Kouvee Petshop</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
              depressed
              dark
              class="elevation-2"
              x-large=""
              style="text-transform: none !important;"
              color="#f9c99e"
              @click="(dialog = true), resetForm(), reset()"
            >
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
              Tambah Transaksi
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
            >
            </v-text-field>
          </v-flex>
        </v-layout>

        <v-data-table
          :headers="headers"
          :items="transaksiProduks"
          :search="keyword"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="(item, index) in items"
                :key="item.id_transaksi_produk"
              >
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_transaksi_produk }}</td>
                <td>{{ item.id_customer_service }}</td>
                <td>{{ item.id_kasir }}</td>
                <td>{{ item.id_hewan }}</td>
                <td>{{ item.subtotal }}</td>
                <td>{{ item.diskon }}</td>
                <td>{{ item.total }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.tanggal_lunas }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.created_by }}</td>
                <td>{{ item.modified_at }}</td>
                <td>{{ item.modified_by }}</td>
                <!-- <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td> -->

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
    <!-- ------------------Menu Transaksi Layanan-------------------------------------- -->
    <v-card v-if="this.tabs == 1">
      Hello
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
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="#fff4cb">
          <v-btn icon @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Menu Tambah Transaksi Produk</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>Data Pembelian</v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-card>
                <v-row>
                  <v-col cols="9" sm="6" md="4">
                    <v-autocomplete
                      v-model="form.id_hewan"
                      required
                      :items="hewans"
                      :filter="customFilter"
                      item-value="id_jenis_hewan"
                      color="white"
                      item-text="nama"
                      label="Nama Hewan*"
                      outlined
                      rounded=""
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="9" sm="2" md="4">
                    <v-text-field
                      value="John Doe"
                      label="Customer Service"
                      readonly=""
                      rounded=""
                      outlined=""
                    ></v-text-field>
                  </v-col>
                  <v-col cols="9" sm="2" md="4">
                    <v-text-field
                      value="69"
                      label="ID Customer Service"
                      outlined=""
                      readonly=""
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Data Produk</v-list-item-title>
              <v-card>
                <div
                  class="form-row"
                  v-for="(experience, index) in workExperiences"
                  :key="index"
                >
                  <v-row>
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="experience.nama"
                        :name="`workExperiences[${index}][company]`"
                        required
                        width=""
                        :items="produks"
                        :filter="customFilter"
                        item-value="id_produk"
                        color="white"
                        item-text="nama"
                        label="Nama Produk*"
                        outlined
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Jumlah*"
                        v-model="experience.jumlah"
                        :name="`workExperiences[${index}][title]`"
                        type="number"
                        outlined=""
                        single-line=""
                        clearable=""
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Subtotal*"
                        v-model="experience.subtotal"
                        :name="`workExperiences[${index}][title]`"
                        filled=""
                        outlined=""
                        readonly=""
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1">
                      <v-btn
                        outlined=""
                        color="red lighten-2"
                        x-large=""
                        @click="deleteRow(index)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12">
                      <v-divider light=""></v-divider>
                    </v-col>
                  </v-row>
                </div>

                <v-row>
                  <v-col class="text-right">
                    <v-btn
                      outlined=""
                      color="green"
                      x-large=""
                      fab=""
                      @click="addExperience"
                      class="tombol"
                    >
                      <v-icon>
                        mdi-plus
                      </v-icon>
                    </v-btn>

                    <v-btn
                      outlined=""
                      color="green"
                      x-large=""
                      fab=""
                      @click="submit"
                      class="tombol"
                    >
                      <v-icon>
                        mdi-content-save
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
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
      <v-btn dark text @click="snackbar = false">
        Tutup
      </v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      tabs: 0,
      password: "Password",

      dialog: false,
      workExperiences: [
        {
          nama: "",
          jumlah: "",
          subtotal: "",
        },
      ],
      keyword: "",
      hewans: [],
      produks: [],
      bottomNav: 1,
      menu: false,
      on: "",
      deleteDialog: "",
      headers: [
        {
          text: "No",
          value: "index",
        },
        {
          text: "Id Transaksi Produk",
          value: "id_transaksi_produk",
        },
        {
          text: "Id CS",
          value: "id_customer_service",
        },
        {
          text: "Id Kasir",
          value: "id_kasir",
        },
        {
          text: "Id Hewans",
          value: "id_hewan",
        },
        {
          text: "Subtotal",
          value: "Subtotal",
        },
        {
          text: "Diskon",
          value: "diskon",
        },
        {
          text: "Total",
          value: "total",
        },
        {
          text: "Status",
          value: "status",
        },

        {
          text: "Tanggal Lunas",
          value: "tanggal_lunas",
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
      transaksiProduks: [],
      dialogWarning: "",
      dialogEdit: "",
      dialogPassword: "",
      pesan: "",
      search: "",
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        nama: "",
        jumlah: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
      },
      pegawai: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: "",
    };
  },

  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },

  methods: {
<<<<<<< HEAD
    selectTabs(selectedTabs) {
      this.tabs = selectedTabs;
    },
    deleteRow(index) {
      this.workExperiences.$remove(index);
=======
    deleteRow(index){
      this.workExperiences.remove(index)
>>>>>>> 88450be17cb92798e4cbd20861b383a38df7e8bc
    },
    addExperience() {
      this.workExperiences.push({
        nama: "",
        jumlah: "",
      });
    },

    cekKosongEdit() {
      if (
        this.form.nama === "" ||
        this.form.alamat === "" ||
        this.form.tanggal_lahir === "" ||
        this.form.telp === "" ||
        this.form.role === "" ||
        this.form.username === ""
      ) {
        this.dialogWarning = true;
      } else {
        this.setForm();
        this.resetForm();
        this.reset();
        this.dialogEdit = false;
      }
    },
    cekKosongPassword() {
      if (this.form.password === "") {
        this.dialogWarning = true;
      } else {
        this.setFormPassword();
        this.resetForm();
        this.reset();
        this.dialogPassword = false;
      }
    },
    save(date) {
      this.$refs.menu.save(date);
    },
    reset() {
      this.$refs.form.resetValidation();
      this.show = false;
    },
    getData() {
      var uri = this.$apiUrl + "TransaksiProduk/" + "all_get";
      this.$http.get(uri).then((response) => {
        this.transaksiProduks = response.data.message;
      });
    },
    getHewan() {
      var uri = this.$apiUrl + "Hewan/" + "all_get";
      this.$http.get(uri).then((response) => {
        this.hewans = response.data.message;
      });
    },
    getProduk() {
      var uri = this.$apiUrl + "Produk/" + "all_get";
      this.$http.get(uri).then((response) => {
        this.produks = response.data.message;
      });
    },
    sendData() {
      this.pegawai.append("nama", this.form.nama);
      this.pegawai.append("tanggal_lahir", this.form.tanggal_lahir);
      this.pegawai.append("alamat", this.form.alamat);
      this.pegawai.append("telp", this.form.telp);
      this.pegawai.append("role", this.form.role);
      this.pegawai.append("username", this.form.username);
      this.pegawai.append("password", this.form.password);
      this.pegawai.append("created_by", this.form.created_by);

      var uri = this.$apiUrl + "Pegawai";
      this.load = true;
      this.$http
        .post(uri, this.pegawai)
        .then((response) => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil [pegawai]
          this.resetForm();
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
        });
    },
    updateData() {
      this.pegawai.append("nama", this.form.nama);
      this.pegawai.append("tanggal_lahir", this.form.tanggal_lahir);
      this.pegawai.append("alamat", this.form.alamat);
      this.pegawai.append("telp", this.form.telp);
      this.pegawai.append("role", this.form.role);
      this.pegawai.append("username", this.form.username);
      this.pegawai.append("modified_by", this.form.modified_by);
      var uri = this.$apiUrl + "Pegawai/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.pegawai)
        .then((response) => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialogEdit = false;
          this.getData(); //mengambil data pegawai
          this.resetForm();
          this.typeInput = "new";
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = "Coba Lagi";
          this.color = "red";
          this.load = false;
        });
    },

    editHandler(item) {
      this.typeInput = "edit";
      this.dialogEdit = true;
      this.form.nama = item.nama;
      this.form.alamat = item.alamat;
      this.form.tanggal_lahir = item.tanggal_lahir;
      this.form.telp = item.telp;
      (this.form.role = item.role), (this.form.username = item.username);
      this.updatedId = item.id_pegawai;
    },

    deleteData(deleteId) {
      //mengahapus data
      this.pegawai.append("delete_by", this.form.delete_by);
      var uri = this.$apiUrl + "Pegawai" + "/delete/" + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.pegawai)
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
        tanggal_lahir: "",
        telp: "",
        role: "",
        username: "",
        password: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
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
    this.getData();
    this.getHewan();
    this.getProduk();
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
</style>
