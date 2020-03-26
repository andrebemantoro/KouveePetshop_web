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
          :items="layanans"
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
          :item-key="item.id"
          class="elevation-1"
        >
          <template v-slot:expanded-item="{ headers, item }">
            <tbody>
              <tr>
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_layanan }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.created_by }}</td>
                <td>{{ item.modified_at }}</td>
                <td>{{ item.modified_by }}</td>
                <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>
                <td>{{ item.aktif }}</td>
              </tr>
            </tbody>
          </template>
        </v-data-table>
        <tr>
          <div class="text-center">
            <v-btn icon color="indigo" light @click="editHandler(item)">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </div>
          <div class="text-center">
            <v-dialog v-model="pesan" width="500">
              <template v-slot:activator="{ on }">
                <v-btn icon color="red lighten-2" dark v-on="on">
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>

              <v-card>
                <v-card-title class="headline Red lighten-2" primary-title>
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
                    @click="deleteData(item.id_layanan), (pesan = false)"
                  >
                    Hapus
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </tr>
      </v-container>
    </v-card>
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
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
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
      headers: [
        {
          text: "No",
          value: "index"
        },
        {
          text: "Id Layanan",
          value: "id_layanan"
        },
        {
          text: "Nama Layanan",
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
          text: "Aktif",
          value: "aktif"
        },
        {
          text: "Action",
          value: null
        }
      ],
      layanans: [],
      hargalayanans: [],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        nama: "",
        created_by: "admin",
        modified_by: "admin"
      },
      layanan: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: ""
    };
  },
  methods: {
    getData() {
      var uri = this.$apiUrl + "Layanan";
      var uri2 = this.$apiUrl + "HargaLayanan";
      this.$http.get(uri).then(response => {
        this.layanans = response.data.message;
      });
      this.$http.get(uri2).then(response => {
        this.hargalayanans = response.data.message;
      });
    },
    sendData() {
      this.layanan.append("nama", this.form.nama);
      this.layanan.append("created_by", this.form.created_by);

      var uri = this.$apiUrl + "Layanan";
      this.load = true;
      this.$http
        .post(uri, this.layanan)
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
      var uri = this.$apiUrl + "Layanan/" + this.updatedId;
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
        console.log("dddd");
        this.updateData();
      }
    },
    resetForm() {
      this.form = {
        nama: ""
      };
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
