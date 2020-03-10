
<template>
  <v-container>
    <v-card>
      <v-container grid-list-md mb-0>
        <h2 class="text-md-center">Data Produk Kouvee Petshop</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
              depressed
              dark
              rounded
              style="text-transform: none !important;"
              color="green accent-3"
              @click="dialog = true"
            >
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
              Tambah Produk
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
          :items="produks"
          :search="keyword"
          :loading="load"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_produk">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_produk }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.jumlah_stok }}</td>
                <td>{{ item.min_stok }}</td>
                <td>{{ item.satuan }}</td>
                <td>{{ item.harga }}</td>
                <td>{{ item.gambar }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.created_by }}</td>
                <td>{{ item.modified_at }}</td>
                <td>{{ item.modified_by }}</td>
                <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>
                <td>{{ item.aktif }}</td>

                <td>
                  <v-btn icon color="indigo" light @click="editHandler(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon color="error" light @click="setDelete()">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
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
          <span class="headline">Detil Produk</span>
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
                  label="Stok Minimal*"
                  v-model="form.min_stok"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Jumlah Stok*"
                  v-model="form.jumlah_stok"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  label="Satuan*"
                  v-model="form.satuan"
                  :items="items"
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Harga*"
                  v-model="form.harga"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Gambar*"
                  v-model="form.gambar"
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
      dialog: false,
      items: ["Buah", "Lusin", "Box"],
      keyword: "",
      headers: [
        {
          text: "No",
          value: "index"
        },
        {
          text: "Id Produk",
          value: "id_produk"
        },
        {
          text: "Nama Produk",
          value: "nama"
        },
        {
          text: "Jumlah Stok",
          value: "jumlah_stok"
        },
        {
          text: "Stok Minimal",
          value: "min_stok"
        },
        {
          text: "Satuan",
          value: "satuan"
        },
        {
          text: "Harga",
          value: "harga"
        },
        {
          text: "Gambar",
          value: "gambar"
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
      produks: [],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        nama: "",
        satuan: "",
        jumlah_stok: "",
        harga: "",
        min_stok: "",
        gambar: "",
        created_by: "admin",
        aktif: "0"
      },
      produk: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: ""
    };
  },
  methods: {
    getData() {
      var uri = this.$apiUrl + "Produk";
      this.$http.get(uri).then(response => {
        this.produks = response.data.message;
      });
    },
    sendData() {
      this.produk.append("nama", this.form.nama);
      this.produk.append("satuan", this.form.satuan);
      this.produk.append("jumlah_stok", this.form.jumlah_stok);
      this.produk.append("harga", this.form.harga);
      this.produk.append("min_stok", this.form.min_stok);
      this.produk.append("gambar", this.form.gambar);
      this.produk.append("created_by", this.form.created_by);

      var uri = this.$apiUrl + "Produk";
      this.load = true;
      this.$http
        .post(uri, this.produk)
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
    // updateData() {

    //     this.pegawai.append('nama', this.form.nama);
    //     this.pegawai.append('tanggal_lahir', this.form.tanggal_lahir);
    //     this.pegawai.append('alamat', this.form.alamat);
    //     this.pegawai.append('telp', this.form.telp);
    //     this.pegawai.append('role', this.form.role);
    //     this.pegawai.append('username', this.form.username);
    //     this.pegawai.append('password', this.form.password);
    //     this.pegawai.append('created_by', this.form.created_by);
    //     var uri = this.$apiUrl + 'Pegawai/' + this.updatedId;
    //     this.load = true
    //     this.$http.post(uri, this.pegawai).then(response => {
    //         this.snackbar = true; //mengaktifkan snackbar
    //         this.color = 'green'; //memberi warna snackbar
    //         this.text = response.data.message; //memasukkan pesan kesnackbar
    //         this.load = false;
    //         this.dialog = false
    //         this.getData(); //mengambil databong
    //         this.resetForm();
    //         this.typeInput = 'new';
    //     }).catch(error => {
    //         this.errors = error
    //         this.snackbar = true;
    //         this.text = 'Try Again';
    //         this.color = 'red';
    //         this.load = false;
    //         this.typeInput = 'new';
    //     })
    // },
    // editHandler(item) {
    //     this.typeInput = 'edit';
    //     this.dialog = true;
    //     this.form.nama = item.nama;
    //     this.form.alamat = item.alamat;
    //     this.form.tanggal_lahir = item.tanggal_lahir;
    //     this.form.telp = item.telp;
    //     this.form.role = item.role,
    //     this.form.username = item.username;
    //     this.form.password = item.password;
    //     this.updatedId = item.id
    // },
    // deleteData(deleteId) { //mengahapus data
    //     var uri = this.$apiUrl + 'Produk/' + deleteId; //data dihapus berdasarkan id
    //     this.$http.post(uri).then(response => {
    //         this.snackbar = true;
    //         this.text = response.data.message;
    //         this.color = 'green'
    //         this.deleteDialog = false;
    //         this.getData();
    //     }).catch(error => {
    //         this.errors = error
    //         this.snackbar = true;
    //         this.text = 'Try Again';
    //         this.color = 'red';
    //     })
    // },
    softDelete() {
      this.aktif.append("aktif", this.form.aktif);
      var uri = this.$apiUrl + "Produk/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.produk)
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
    setForm() {
      if (this.typeInput === "new") {
        this.sendData();
      } else {
        console.log("dddd");
        this.updateData();
      }
    },
    setDelete() {
      console.log("dddd");
      this.softDelete();
    },
    resetForm() {
      this.form = {
        nama: "",
        satuan: "",
        jumlah_stok: "",
        min_stok: "",
        harga: "",
        gambar: ""
      };
    }
  }
};
</script>
