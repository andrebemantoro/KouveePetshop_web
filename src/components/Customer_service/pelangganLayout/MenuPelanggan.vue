<template>
  <v-container>
    <v-bottom-navigation v-model="bottomNav" dark shift>
      <v-btn>
        <span>Aktif</span>
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>

      <v-btn>
        <span>Non Aktif</span>
        <v-icon>mdi-delete-empty</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-card>
      <v-container grid-list-md mb-20>
        <h2 class="text-md-center">Data Pelanggan Kouvee Petshop</h2>
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
              Tambah Pelanggan
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
          :items="pelanggans"
          :search="keyword"
          :loading="load"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_pelanggan">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_pelanggan }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.alamat }}</td>
                <td>{{ item.tanggal_lahir }}</td>
                <td>{{ item.telp }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.created_by }}</td>
                <td>{{ item.modified_at }}</td>
                <td>{{ item.modified_by }}</td>
                <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>
                <!-- <td>{{ item.aktif }}</td> -->

                <td>
                  <div class="text-center">
                    <v-btn icon color="blue" light @click="editHandler(item)">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>

                  <!-- ------------------Dialog untuk konfirmasi delete-------------------------------------- -->
                  <div class="text-center">
                    <v-dialog v-model="pesan" width="500">
                      <template v-slot:activator="{ on }">
                        <v-btn icon color="red lighten-2" dark v-on="on">
                          <v-icon>mdi-delete</v-icon>
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title
                          class="headline Red lighten-2"
                          primary-title
                        >
                          Konfirmasi Hapus
                        </v-card-title>

                        <v-card-text>
                          Data yang akan dihapus, Lanjutkan ?
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="
                              deleteData(item.id_pelanggan), (pesan = false)
                            "
                          >
                            Hapus
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>

                  <!-- -------------------------------------------------------- -->
                </td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
      </v-container>
    </v-card>
    <!-- ---------------------Dialog----------------------------------- -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Detail Pelanggan</span>
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
              <v-col cols="12">
                <v-text-field
                  label="Alamat*"
                  v-model="form.alamat"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="20">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="form.tanggal_lahir"
                      label="Tanggal Lahir*"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="form.tanggal_lahir"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Nomor Telepon*"
                  v-model="form.telp"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="resetForm(), (dialog = false)"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- -------------------------------------------------------- -->
    <!-- -------------------------------------------------------- -->
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
      dialog: false,
      pelanggans: [],
      keyword: "",
      bottomNav: 1,
      menu: false,
      headers: [
        {
          text: "No",
          value: "index"
        },
        {
          text: "Id Pelanggan",
          value: "id_pelanggan"
        },
        {
          text: "Nama Pelanggan",
          value: "nama"
        },
        {
          text: "Alamat",
          value: "alamat"
        },
        {
          text: "Tanggal Lahir",
          value: "tanggal_lahir"
        },
        {
          text: "Nomor Telepon",
          value: "telp"
        },
        {
          text: "Created At",
          value: "created_at"
        },
        {
          text: "Created By",
          value: "created_by"
        },
        {
          text: "Modified At",
          value: "modified_by"
        },
        {
          text: "Modified By",
          value: "modified_by"
        },
        {
          text: "Delete At",
          value: "delete_at"
        },
        {
          text: "Delete By",
          value: "delete_by"
        },
        // {
        //   text: "Aktif",
        //   value: "aktif"
        // },
        {
          text: "Action",
          value: null
        }
      ],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        nama: "",
        alamat: "",
        tanggal_lahir: "",
        telp: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama")
      },
      pelanggan: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: ""
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
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },

  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    getData() {
      var uri = this.$apiUrl + "Pelanggan";
      this.$http.get(uri).then(response => {
        this.pelanggans = response.data.message;
      });
    },
    sendData() {
      this.pelanggan.append("nama", this.form.nama);
      this.pelanggan.append("tanggal_lahir", this.form.tanggal_lahir);
      this.pelanggan.append("alamat", this.form.alamat);
      this.pelanggan.append("telp", this.form.telp);
      this.pelanggan.append("created_by", this.form.created_by);

      var uri = this.$apiUrl + "Pelanggan";
      this.load = true;
      this.$http
        .post(uri, this.pelanggan)
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
      this.pelanggan.append("nama", this.form.nama);
      this.pelanggan.append("tanggal_lahir", this.form.tanggal_lahir);
      this.pelanggan.append("alamat", this.form.alamat);
      this.pelanggan.append("telp", this.form.telp);
      this.pelanggan.append("modified_by", this.form.modified_by);
      var uri = this.$apiUrl + "Pelanggan/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.pelanggan)
        .then(response => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil datapegawai
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
      this.dialogEdit = true;
      this.form.nama = item.nama;
      this.form.alamat = item.alamat;
      this.form.tanggal_lahir = item.tanggal_lahir;
      this.form.telp = item.telp;
      this.updatedId = item.id_pelanggan;
    },
    deleteData(deleteId) {
      //mengahapus data
      this.pelanggan.append("delete_by", this.form.delete_by);
      var uri = this.$apiUrl + "Pelanggan" + "/delete/" + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.pelanggan)
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
        console.log("dddd");
        this.updateData();
      }
    },
    setFormPassword() {
      console.log("dddd");
      this.updateData();
    },
    resetForm() {
      this.form = {
        nama: "",
        alamat: "",
        tanggal_lahir: "",
        telp: "",
        created_by: "Customer Service",
        delete_by: "Customer Service",
        modified_by: "Customer Service"
      };
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
