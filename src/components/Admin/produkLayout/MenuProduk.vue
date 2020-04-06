<template>
<div>
  <!-- <v-data-table :headers="headers" :items="desserts" :search="search" sort-by="calories" class="elevation-1"> -->
    <template>
      <v-toolbar flat color="white">
        <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
        ></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Tambah Produk</v-btn>
          </template>
          <v-card>
          <v-card-title>
            <v-spacer />
            <span class="headline">Detail Produk</span>
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
                  <v-text-field
                    label="Harga*"
                    v-model="form.harga"
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
                 
                  <template>
                    <v-file-input
                      accept="image/*"
                      label="File input"
                      v-model="form.gambar"
                    ></v-file-input>
                  </template>
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
      </v-toolbar>
    </template>
    <v-layout class="mx-4">
      <v-flex>
        <template>
          <v-row>
             <v-col v-for="(item, i) in produks" :key="i" cols="3">
    
                <v-card
                    class="mx-auto"
                    max-width="344"
                >
                <v-img      
                  :src= "$apiUrl2+'produk/'+item.gambar"
                  contain
                  class="grey lighten-2"
                 
                  height="200" 
                />
                    <!-- <img
                   src="{{item.gambar}}"
                    height="200px"
                    > -->

                    <v-card-title>
                    ID Produk: {{item.id_produk}}<br>{{item.nama}}
                    </v-card-title>

                    <v-card-subtitle>
                    Jumlah Stok :{{item.jumlah_stok}}
                    </v-card-subtitle>
                   

                    <v-card-actions>
                    <v-btn text @click="editHandler(item)">Edit</v-btn>
                    <v-spacer></v-spacer>
<!-- ---------------------------------------------------------------------------------------------- -->
                  <!-- -------------------------------------------------------- -->
                    <!-- <div class="text-center">
                      <v-dialog v-model="pesan" width="500">
                        <template v-slot:activator="{ on }">
                          <v-btn icon color="red lighten-2" dark v-on="on" text="">
                            Delete
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
                                deleteData(item.id_produk), (pesan = false)
                              "
                            >
                              Hapus
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </div> -->

                    <!-- -------------------------------------------------------- -->
                    
<!-- ---------------------------------------------------------------------------------------------- -->

                    <v-spacer></v-spacer>

                    <v-btn
                        icon
                        @click="show = !show"
                    >
                        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                    </v-btn>
                    </v-card-actions>

                    <v-expand-transition>
                    <div v-show="show">
                        <v-divider></v-divider>

                        <v-card-text>
                          <v-card-subtitle>
                            Stok Minimal : {{item.min_stok}}<br>
                            Harga        : {{item.min_stok}}<br>
                            Satuan       : {{item.satuan}}<br>
                          </v-card-subtitle>
                          
                        </v-card-text>
                    </div>
                    </v-expand-transition>
                </v-card>

          <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000"> {{ text }} <v-btn dark text
                @click="snackbar = false"> Close </v-btn>
        </v-snackbar>
        </v-col>
          </v-row> 
        </template>
      </v-flex>
    </v-layout>
 
      
</div>

</template>

<script>
export default {
  data() {
    return {
      show: false,
      dialog: false,
      items: ["Buah", "Karung", "Lusin"],
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
          text: "Satuan",
          value: "satuan"
        },
        {
          text: "Jumlah Stok",
          value: "jumlah_stok"
        },
        {
          text: "Harga",
          value: "harga"
        },
        {
          text: "Stok Minimal",
          value: "min_stok"
        },
        {
          text: "Gambar",
          value: ""
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
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama")
      },
      produk: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: "",
    };
  },
  
  methods: {
    getData() {
      var uri = this.$apiUrl + "Produk/" + "getAll";
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
    updateData() {
      this.produk.append("nama", this.form.nama);
      this.produk.append("satuan", this.form.satuan);
      this.produk.append("jumlah_stok", this.form.jumlah_stok);
      this.produk.append("harga", this.form.harga);
      this.produk.append("min_stok", this.form.min_stok);
      this.produk.append("gambar", this.form.gambar);
      this.produk.append("modified_by", this.form.modified_by);
      var uri = this.$apiUrl + "Produk/" + "update/" + this.updatedId;
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
    editHandler(item) {
      this.typeInput = "edit";
      this.dialog = true;
      this.form.nama = item.nama;
      this.form.satuan = item.satuan;
      this.form.jumlah_stok = item.jumlah_stok;
      this.form.harga = item.harga;
      this.form.min_stok = item.min_stok;
      this.form.gambar = item.password;
      this.updatedId = item.id_produk;
    },
    deleteData(deleteId) {
      //mengahapus data
      this.produk.append("delete_by", this.form.delete_by);
      var uri = this.$apiUrl + "Produk" + "/delete/" + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.produk)
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
        satuan: "",
        jumlah_stok: "",
        harga: "",
        min_stok: "",
        gambar: "",
        created_by: "admin",
        delete_by: "admin",
        modified_by: "admin"
      };
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

