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
            <v-btn color="#f9c99e" depressed rounded dark class="mb-2" v-on="on">Tambah Supplier</v-btn>
          </template>
          <v-card>
          <v-card-title>
            <v-spacer />
            <span class="headline">Detail Supplier</span>
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
                <v-col cols="12">
                  <v-text-field
                    label="Nomor Telepon*"
                    v-model="form.telp"
                    required
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
             <v-col v-for="(item, i) in suppliers" :key="i" cols="3">
    
                <v-card
                    class="mx-auto"
                    max-width="344"
                >
                <!-- <v-img      
                  :src= "$apiUrl2+'produk/'+item.gambar"
                  contain
                  class="grey lighten-2"
                 
                  height="200" 
                /> -->
                <v-card-title>
                {{item.nama}}
                </v-card-title>

                <v-card-subtitle>
                  ID Supplier: {{item.id_supplier}}
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
                            Alamat : {{item.alamat}}<br>
                            Nomor Telepon : {{item.telp}}<br>
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
      keyword: "",
      suppliers: [],
      snackbar: false,
      color: null,
      text: "",
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
      typeInput: "new",
      errors: "",
      updatedId: "",
    };
  },
  
  methods: {
    getData() {
      var uri = this.$apiUrl + "Supplier/" + "getAll";
      this.$http.get(uri).then(response => {
        this.suppliers = response.data.message;
      });
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
          this.text = "Try Again";
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
      this.form.alamat = item.alamat;
      this.form.telp = item.telp;
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

