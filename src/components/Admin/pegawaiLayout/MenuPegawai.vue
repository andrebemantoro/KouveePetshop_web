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
        <h2 class="text-md-center">Data Pegawai Kouvee Petshop</h2>
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
              Tambah Pegawai
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
          :items="pegawais"
          :search="keyword"
          :loading="load"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_pegawai">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_pegawai }}</td>
                <td>{{ item.nama }}</td>
                <td>{{ item.alamat }}</td>
                <td>{{ item.tanggal_lahir }}</td>
                <td>{{ item.telp }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.password }}</td>
                <td>{{ item.role }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.created_by }}</td>
                <td>{{ item.modified_at }}</td>
                <td>{{ item.modified_by }}</td>
                <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>
                

                <td>
                  <v-btn icon color="blue" light @click="editHandler(item)">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>

                  <div class="text-center">
                    <v-btn
                      icon
                      color="indigo"
                      light
                      @click="changePassword(item)"
                    >
                      <v-icon>mdi-lock</v-icon>
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
                              deleteData(item.id_pegawai), (pesan = false)
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
          <span class="headline">Profil Pegawai</span>
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
              <v-col cols="12">
                <v-select
                  label="Role*"
                  v-model="form.role"
                  :items="items"
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Username*"
                  v-model="form.username"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  v-model="form.password"
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
    <!-- -------------Dialog edit khusus agar passwordnya gak ikut------------------------------------------- -->
    <v-dialog v-model="dialogEdit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Profil Pegawai</span>
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
                  label="Tanggal Lahir*"
                  v-model="form.tanggal_lahir"
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
              <v-col cols="12">
                <v-select
                  label="Role*"
                  v-model="form.role"
                  :items="items"
                  required
                >
                </v-select>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Username*"
                  v-model="form.username"
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
            @click="resetForm(), (dialogEdit = false)"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="setForm(),(dialogEdit = false)">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- -------------------------------------------------------- -->
    <!-- -------------------Dialog Password------------------------------------- -->
    <v-dialog v-model="dialogPassword" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Detail Pegawai</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  v-model="form.password"
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
            @click="resetForm(), (dialogPassword = false)"
            >Close</v-btn
          >
          <v-btn color="blue darken-1" text @click="setForm()">Save</v-btn>
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
      items: ["Cashier", "Customer Service"],
      keyword: "",
      bottomNav: 1,
      menu: false,
      headers: [
        {
          text: "No",
          value: "index"
        },
        {
          text: "Id Pegawai",
          value: "id_pegawai"
        },
        {
          text: "Nama Pegawai",
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
          text: "Username",
          value: "username"
        },
        {
          text: "Password",
          value: "password"
        },
        {
          text: "Role",
          value: "role"
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
      pegawais: [],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        nama: "",
        alamat: "",
        tanggal_lahir: "",
        telp: "",
        username: "",
        password: "",
        role: "",
        created_by: "admin",
        delete_by: "admin",
        modified_by: "admin"
      },
      pegawai: new FormData(),
      typeInput: "new",
      errors: "",
      updatedId: ""
    };
  },

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
      var uri = this.$apiUrl + "Pegawai/"+"all_get" ;
      this.$http.get(uri).then(response => {
        this.pegawais = response.data.message;
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
    updatePassword() {
      this.pegawai.append("password", this.form.password);
      this.pegawai.append("modified_by", this.form.modified_by);
      var uri = this.$apiUrl + "Pegawai/" + "update/" + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.pegawai)
        .then(response => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = "green"; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialog = false;
          this.getData(); //mengambil data pegawi
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
      (this.form.role = item.role), (this.form.username = item.username);
      this.updatedId = item.id_pegawai;
    },
    changePassword(item) {
      this.typeInput = "edit";
      this.dialogPassword = true;
      this.form.nama = item.nama;
      this.form.alamat = item.alamat;
      this.form.tanggal_lahir = item.tanggal_lahir;
      this.form.telp = item.telp;
      (this.form.role = item.role), (this.form.username = item.username);
      this.form.password = item.password;
      this.updatedId = item.id_pegawai;
    },
    deleteData(deleteId) {
      //mengahapus data
      this.pegawai.append("delete_by", this.form.delete_by);
      var uri = this.$apiUrl + "Pegawai" + "/delete/" + deleteId; //data dihapus berdasarkan id
      this.load = true;
      this.$http
        .post(uri, this.pegawai)
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
      this.updatePassword();
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
        modified_by: sessionStorage.getItem("Nama")
      };
    },
    resetFormPassword() {
      this.form = {
        password: ""
      };
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
