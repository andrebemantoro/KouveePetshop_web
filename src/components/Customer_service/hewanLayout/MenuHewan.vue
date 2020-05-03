<template>
  <div style="margin:20px">
    <!-- <v-bottom-navigation v-model="bottomNav" dark shift>
      <v-btn>
        <span>Aktif</span>
        <v-icon>mdi-account-multiple</v-icon>
      </v-btn>

      <v-btn>
        <span>Non Aktif</span>
        <v-icon>mdi-delete-empty</v-icon>
      </v-btn>
    </v-bottom-navigation> -->
    <v-card>
      <div class="pt-5">
        <h2 class="text-md-center">Data Hewan Kouvee Petshop</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
              depressed
              dark
              rounded
              style="text-transform: none !important;"
              color="#f9c99e"
              @click="showAddDialog"
            >
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>
              Tambah Hewan
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

        <v-data-table :headers="headers" :items="hewans" :search="keyword">
          <template v-slot:body="{ items }">
            <tbody>
              <tr v-for="(item, index) in items" :key="item.id_hewans">
                <td>{{ index + 1 }}</td>
                <td>{{ item.id_hewan }}</td>
                <td>{{ item.nama_hewan }}</td>
                <td>{{ item.nama_jenis_hewan }}</td>
                <td>{{ item.nama_pelanggan }}</td>
                <td>{{ item.tanggal_lahir_hewan }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.created_by }}</td>
                <td>{{ item.modified_at }}</td>
                <td>{{ item.modified_by }}</td>
                <!-- <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td> -->
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
      </div>
    </v-card>
    <!-- ------------------Dialog untuk konfirmasi delete-------------------------------------- -->
    <div class="text-center">
      <v-dialog width="500" v-model="deleteDialog">
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
            <v-btn color="primary" text @click="deleteDialog = false">
              Batal
            </v-btn>
            <v-btn color="primary" text @click="deleteData(deleteId)">
              Hapus
            </v-btn>
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
          <span class="headline">Tambah Hewan</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    label="Nama Hewan*"
                    v-model="form.nama"
                    required
                    outlined
                    :rules="rules"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="form.id_jenis_hewan"
                    required
                    :items="jenishewans"
                    :filter="customFilter"
                    item-value="id_jenis_hewan"
                    color="white"
                    item-text="nama"
                    label="Jenis Hewan*"
                    outlined
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    v-model="form.id_pelanggan"
                    required
                    auto-select-first
                    :items="pelanggans"
                    :filter="customFilter"
                    item-value="id_pelanggan"
                    color="white"
                    item-text="nama"
                    label="Nama Pemilik*"
                    outlined
                  ></v-autocomplete>
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
                        outlined
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
            @click="resetForm(), (dialog = false)"
            >Tutup</v-btn
          >
          <v-btn color="blue darken-1" text @click="cekKosong()">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- -------------------------------------------------------- -->
    <v-dialog v-model="dialogEdit" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-spacer />
          <span class="headline">Ubah Hewan</span>
          <v-spacer />
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nama Hewan*"
                  v-model="form.nama"
                  required
                  outlined=""
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.id_jenis_hewan"
                  required
                  :items="jenishewans"
                  :filter="customFilter"
                  item-value="id_jenis_hewan"
                  color="white"
                  item-text="nama"
                  label="Jenis Hewan*"
                  outlined=""
                ></v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.id_pelanggan"
                  required
                  auto-select-first
                  :items="pelanggans"
                  :filter="customFilter"
                  item-value="id_pelanggan"
                  color="white"
                  item-text="nama"
                  label="Nama Pemilik*"
                  outlined=""
                ></v-autocomplete>
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
                      outlined=""
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        rules: [(value) => !!value || 'Wajib diisi.'],
        dialogWarning: '',
        dialogEdit: '',
        on: '',
        dialog: false,
        deleteDialog: false,
        dialogLabel: 'Tambah Hewan',
        jenishewans: [],
        pelanggans: [],
        hewans: [],
        keyword: '',
        bottomNav: 1,
        menu: false,
        headers: [
          {
            text: 'No',
            value: 'index',
          },
          {
            text: 'Id Hewan',
            value: 'id_hewan',
          },
          {
            text: 'Nama Hewan',
            value: 'nama_hewan',
          },
          {
            text: 'Jenis Hewan',
            value: 'nama_jenis_hewan',
          },
          {
            text: 'Nama Pemilik',
            value: 'nama_pelanggan',
          },
          {
            text: 'Tanggal Lahir',
            value: 'tanggal_lahir_hewan',
          },
          {
            text: 'Tanggal Dibuat',
            value: 'created_at',
          },
          {
            text: 'Dibuat Oleh',
            value: 'created_by',
          },
          {
            text: 'Tanggal Diubah',
            value: 'modified_by',
          },
          {
            text: 'Diubah Oleh',
            value: 'modified_by',
          },
          // {
          // text: "Delete At",
          // value: "delete_at"
          // },
          // {
          // text: "Delete By",
          // value: "delete_by"
          // },
          // {
          // text: "Aktif",
          // value: "aktif"
          // },
          {
            text: 'Aksi',
            value: null,
          },
        ],
        snackbar: false,
        color: null,
        text: '',
        load: false,
        form: {
          nama: '',
          id_jenis_hewan: '',
          id_pelanggan: '',
          tanggal_lahir: '',
          created_by: sessionStorage.getItem('Nama'),
          delete_by: sessionStorage.getItem('Nama'),
          modified_by: sessionStorage.getItem('Nama'),
        },
        hewan: new FormData(),
        typeInput: 'new',
        errors: '',
        updatedId: '',
        deleteId: '',
      };
    },
    watch: {
      menu(val) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'));
      },
    },
    methods: {
      cekKosong() {
        if (this.form.nama === '') {
          this.dialogWarning = true;
        } else {
          this.setForm();
          this.resetForm();
          this.reset();
          this.dialog = false;
        }
      },
      save(date) {
        this.$refs.menu.save(date);
      },
      reset() {
        this.$refs.form.resetValidation();
      },
      getData() {
        var uri = this.$apiUrl + 'Hewan/getWithJoin';
        this.$http.get(uri).then((response) => {
          this.hewans = response.data.message;
        });
      },
      getPelanggan() {
        var uri = this.$apiUrl + 'Pelanggan';
        this.$http.get(uri).then((response) => {
          this.pelanggans = response.data.message;
        });
      },
      getJenisHewan() {
        var uri = this.$apiUrl + 'JenisHewan';
        this.$http.get(uri).then((response) => {
          this.jenishewans = response.data.message;
        });
      },
      sendData() {
        this.hewan.append('nama', this.form.nama);
        this.hewan.append('id_jenis_hewan', this.form.id_jenis_hewan);
        this.hewan.append('id_pelanggan', this.form.id_pelanggan);
        this.hewan.append('tanggal_lahir', this.form.tanggal_lahir);
        this.hewan.append('created_by', this.form.created_by);

        var uri = this.$apiUrl + 'Hewan';
        this.load = true;
        this.$http
          .post(uri, this.hewan)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan kesnackbar
            this.load = false;
            this.dialog = false;
            this.resetForm();
            this.getData();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      updateData() {
        this.hewan.append('nama', this.form.nama);
        this.hewan.append('id_jenis_hewan', this.form.id_jenis_hewan);
        this.hewan.append('id_pelanggan', this.form.id_pelanggan);
        this.hewan.append('tanggal_lahir', this.form.tanggal_lahir);
        this.hewan.append('modified_by', this.form.modified_by);
        var uri = this.$apiUrl + 'Hewan/' + 'update/' + this.updatedId;
        this.load = true;
        this.$http
          .post(uri, this.hewan)
          .then((response) => {
            this.snackbar = true; //mengaktifkan snackbar
            this.color = 'green'; //memberi warna snackbar
            this.text = response.data.message; //memasukkan pesan kesnackbar
            this.load = false;
            this.dialogEdit = false;
            this.getData(); //mengambil data hewan
            this.resetForm();
            this.typeInput = 'new';
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
            this.typeInput = 'new';
          });
      },
      showAddDialog() {
        this.typeInput = 'new';
        (this.dialogLabel = 'Tambah Hewan'), this.resetForm();
        this.dialog = true;
      },
      editHandler(item) {
        this.typeInput = 'edit';
        this.dialogEdit = true;
        this.form.nama = item.nama_hewan;
        this.form.id_jenis_hewan = item.id_jenis_hewan;
        this.form.id_pelanggan = item.id_pelanggan;
        this.form.tanggal_lahir = item.tanggal_lahir_hewan;
        this.updatedId = item.id_hewan;
      },
      deleteRow(item) {
        this.deleteId = item.id_hewan;
        this.deleteDialog = true;
      },
      deleteData(deleteId) {
        //menghapus data
        this.hewan.append('delete_by', this.form.delete_by);
        var uri = this.$apiUrl + 'Hewan' + '/delete/' + deleteId; //data dihapus berdasarkan id
        this.load = true;
        this.$http
          .post(uri, this.hewan)
          .then((response) => {
            this.snackbar = true;
            this.text = response.data.message;
            this.color = 'green';
            this.deleteDialog = false;
            this.deleteId = '';
            this.getData();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
          });
      },
      setForm() {
        if (this.typeInput === 'new') {
          this.sendData();
        } else {
          console.log('data berhasil diubah');
          this.updateData();
        }
      },
      resetForm() {
        this.form = {
          nama: '',
          id_jenis_hewan: '',
          id_pelanggan: '',
          tanggal_lahir: '',
          created_by: sessionStorage.getItem('Nama'),
          delete_by: sessionStorage.getItem('Nama'),
          modified_by: sessionStorage.getItem('Nama'),
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
      this.getPelanggan();
      this.getJenisHewan();
    },
  };
</script>
