<template>
  <div class="MenuUkuran">
    <v-container>
      <v-card class="TableUkuran">
        <v-container grid-list-md mb-0>
          <h2 class="text-md-center">Data Ukuran Hewan Kouvee Petshop</h2>
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
                Tambah Ukuran
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
            :items="ukurans"
            :search="keyword"
            :loading="load"
            class="TableUkuran2"
          >
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  v-for="(item, index) in items"
                  :key="item.id_ukuran_hewan"
                  class="NamaKolom"
                >
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.id_ukuran_hewan }}</td>
                  <td>{{ item.nama }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>{{ item.created_by }}</td>
                  <td>{{ item.modified_at }}</td>
                  <td>{{ item.modified_by }}</td>
                  <td>{{ item.delete_by }}</td>
                  <td>{{ item.delete_at }}</td>
                

                  <td>
                    <div class="text-center">
                      <v-btn icon color="blue" light @click="editHandler(item)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </div>
                    <!-- -------------------------------------------------------- -->
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
                                deleteData(item.id_ukuran_hewan), (pesan = false)
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
      <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <v-spacer />
            <span class="headline">Detail Ukuran Hewan</span>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      
      keyword: "",
      headers: [
        {
          text: "No",
          value: "index"
        },
        {
          text: "Id Ukuran",
          value: "id_ukuran_hewan"
        },
        {
          text: "Nama",
          value: "nama"
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
        {
          text: "Action",
          value: null
        }
      ],
      ukurans: [],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        nama: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama")
      },
      ukuran: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: ""
    };
  },
  methods: {
    getData() {
      var uri = this.$apiUrl + "UkuranHewan/" + "getAll";
      this.$http.get(uri).then(response => {
        this.ukurans = response.data.message;
      });
    },
    sendData() {
      this.ukuran.append("nama", this.form.nama);
      this.ukuran.append("created_by", this.form.created_by);
      
      
      var uri = this.$apiUrl + "UkuranHewan";
      this.load = true;
      this.$http
        .post(uri, this.ukuran)
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
      this.ukuran.append("nama", this.form.nama);
      this.ukuran.append("modified_by", this.form.modified_by);
      var uri = this.$apiUrl + "UkuranHewan/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.ukuran)
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
     
      this.updatedId = item.id_ukuran_hewan;
    },
    deleteData(deleteId) {
      //mengahapus data
      this.ukuran.append("delete_by", this.form.delete_by);
<<<<<<< HEAD
      var uri = this.$apiUrl + "UkuranHewan/" + "delete/" + deleteId; //data dihapus berdasarkan id
=======
      var uri = this.$apiUrl + "UkuranHewan" + "/delete/" + deleteId; //data dihapus berdasarkan id
>>>>>>> 784ed0cb065bea2537af6487c8ba2d64d8be6979
      this.load = true;
      this.$http
        .post(uri, this.ukuran)
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
    resetForm() {
      this.form = {
        nama: "",
        modified_by : "admin",
        delete_by: "admin",
        created_by: "admin"        
      };
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

