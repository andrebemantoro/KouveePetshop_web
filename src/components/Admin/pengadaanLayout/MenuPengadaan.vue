<template>
<v-container> 
    <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="12">
         <v-card>
      <!-- <v-container grid-list-md mb-20> -->
      <div class="pa-3">
        <h2 class="text-md-center">Data Pengadaan Produk Kouvee Petshop</h2>
        <v-layout row wrap style="margin:10px">
          <v-flex xs6>
            <v-btn
              depressed
              dark
              class="elevation-2"
              x-large
              style="text-transform: none !important;"
              color="#f9c99e"
              @click="(dialog = true), resetDynamic()"
            >
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>Tambah
              Pengadaan
            </v-btn>
          </v-flex>
          <!-- <v-flex xs6 class="text-right">
            <v-text-field
              v-model="keyword"
              append-icon="mdi-search"
              label="Cari"
              hide-details="auto"
              outlined
              clearable
            >
            </v-text-field>
          </v-flex>-->
        </v-layout>
        <v-data-table
          :headers="headers"
          :items="filterProgres(pengadaans)"
        >
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="(item, index) in items"
                :key="item.id_pengadaan_produk"
              >
                <td>{{ index + 1 }}</td>
                <td
                  class="underlinetext"
                  @click="showDetail(item)"
                  style="cursor:pointer"
                >
                  {{ item.id_pengadaan_produk }}
                </td>
                <td>{{ item.nama_supplier }}</td>
                <td>{{ item.total }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.created_at }}</td>
                <td>{{ item.created_by }}</td>
                <td>{{ item.modified_at }}</td>
                <td>{{ item.modified_by }}</td>
                <!-- <td>{{ item.delete_by }}</td>
                <td>{{ item.delete_at }}</td>-->

                <td>
                  <div>
                    <v-btn
                      icon
                      color="blue"
                      light
                      @click="editHandlerTransaksiProduk(item)"
                    >
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </div>

                  <div>
                    <v-btn
                      icon
                      color="red lighten-2"
                      dark
                      v-on="on"
                      @click="
                        deleteRowProduk(item),
                          getDetailTransaksiProdukById(item)
                      "
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
      <!-- </v-container> -->
    </v-card>
        </v-col>
        <v-col cols="2"></v-col>
    </v-row> 
  <!-- --------------------Dialog Tambah Pengadaan------------------------------------------ -->
  <v-dialog v-model="dialog" persistent="" width="1500px">
    <v-card>
  <v-card-title>
    <h2 class="text-center">Tambah Pengadaan Produk</h2>
  </v-card-title>
  <v-card-text>
    <v-container>
        <v-row>
            <v-col cols="12">
               <div class="form-group">
                 <label for="Supplier">Supplier : </label>
               <v-autocomplete
                      v-model="id_supplier"
                      required
                      :items="suppliers"
                      :filter="customFilter"
                      item-value="id_supplier"
                      color="purple"
                      item-text="nama"
                      outlined
                      :search-input.sync="form.empty"
                    ></v-autocomplete>
               </div>
            </v-col>
        </v-row>
        <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h3>Data Produk</h3>
              </v-list-item-title>
              <v-card>
                <div
                  class="form-row"
                  v-for="(tambah, index) in detailTambah"
                  :key="index"
                >
                  <v-row>
                    <v-col cols="4">
                      <v-autocomplete
                        v-model="tambah.id_produk"
                        required
                        width
                        :items="produks"
                        @change="filteredProduk(index)"
                        item-value="id_produk"
                        item-text="nama"
                        label="Nama Produk*"
                        outlined
                        color="purple"
                        :filter="customFilter"
                        hide-selected
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Jumlah*"
                        v-model="tambah.jumlah"
                        color="purple"
                        type="number"
                        outlined
                        single-line
                        clearable
                        @keyup="setTotal(index), setSubtotal()"
                        @change="setTotal(index), setSubtotal()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Harga*"
                        v-model="tambah.harga"
                        color="purple"
                        type="number"
                        outlined
                        single-line
                        clearable
                         prefix="Rp."
                        @keyup="setTotal(index), setSubtotal()"
                        @change="setTotal(index), setSubtotal()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Total Harga*"
                        v-model="tambah.total_harga"
                        value
                        outlined
                        readonly
                        color="purple"
                        prefix="Rp."
                      ></v-text-field>
                    </v-col>
                    <v-col cols="1">
                      <v-btn
                        outlined
                        color="red lighten-2"
                        x-large
                        @click="deleteRow(tambah), setSubtotal()"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                    <v-col cols="12">
                      <v-divider light></v-divider>
                    </v-col>
                  </v-row>
                </div>

                <v-row>
                  <v-col class="text-right">
                    <v-btn
                      outlined
                      color="green"
                      x-large
                      fab
                      @click="addTambah"
                      class="tombol"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>

                
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-list-item>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn color="blue darken-1" outlined="" text @click="sendDataPengadaan()">Save</v-btn>
        <v-btn color="blue darken-1" outlined="" text @click="dialog = false,resetDynamic()">Cancel</v-btn>
    </v-card-actions>
</v-card>
</v-dialog>
<!-- --------------------------------------------------------------------------------------------------------------- -->
<!------------------------  Dialog detail pengadaan------------------------>
    <template>
      <v-dialog
        v-model="dialogDetailPengadaanProduk"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <v-spacer />
            <h2 class="text-md-center">
              {{ 'Id Transaksi Produk: ' + detailItem.id_pengadaan_produk }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <!-- <v-container> -->
            <v-simple-table height="50%">
              <thead>
                <tr>
                  <th class="text-left">Id Detail Pengadaan</th>
                  <th class="text-left">Nama Produk</th>
                  <th class="text-left">Jumlah</th>
                  <th class="text-left">Harga</th>
                  <th class="text-left">Total Harga</th>
                  <th class="text-left">Tanggal Dibuat</th>
                  <th class="text-left">Dibuat Oleh</th>
                  <th class="text-left">Tanggal Diubah</th>
                  <th class="text-left">Diubah Oleh</th>
                  <th class="text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in filteredItems2(detailItem)"
                  :key="item.id_detail_pengadaan"
                >
                  <td>{{ item.id_detail_pengadaan }}</td>
                  <td>{{ item.nama_produk }}</td>
                  <td>{{ item.jumlah }}</td>
                  <td>{{ item.harga }}</td>
                  <td>{{ item.total_harga }}</td>
                  <td>{{ item.created_at }}</td>
                  <td>{{ item.created_by }}</td>
                  <td>{{ item.modified_at }}</td>
                  <td>{{ item.modified_by }}</td>
                  <td>
                    <div>
                      <v-btn
                        icon
                        color="blue"
                        light
                        outlined
                        class="tombol"
                        @click="editHandlerProduk(item)"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </div>
                    <div>
                      <v-btn
                        icon
                        color="red lighten-2"
                        light
                        class="tombol"
                        outlined
                        v-on="on"
                        @click="deleteRowDetailProduk(item)"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
            <!-- </v-container> -->
            <br />
            
            <div class="text-right">
              <v-simple-table>
                <td class="text-right">
                
                 
                  <tr>
                    <td>
                      <h3>{{ 'Total : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.total }}</h3>
                    </td>
                  </tr>
                </td>
              </v-simple-table>
            <v-spacer></v-spacer>
              <v-btn
              color="blue darken-1"
              text=""
              outlined=""
              @click="dialogDetailPengadaanProduk = false"
              ><v-icon size="18" class="mr-2">mdi-arrow-right-box</v-icon>Pesanan Diproses
              </v-btn>
            
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogDetailPengadaanProduk = false"
              >Tutup</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- ------------------------------------------------------------------------- -->
<v-dialog v-model="confirmationDialog" width="25%">
<v-card>
  <v-card-title>
    <h2 class="text-center">Confirmation</h2>
  </v-card-title>
  <v-card-text>
    <v-container>
        <v-row>
            <h4>Are you sure want to delete this item ?</h4>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
        <v-btn color="blue darken-1" outlined="" text @click="deleteData(id)">Confirm</v-btn>
        <v-btn color="blue darken-1" outlined="" text @click="confirmationDialog = false">Cancel</v-btn>
    </v-card-actions>
</v-card>
</v-dialog>

<v-snackbar       
    v-model="snackbar"
    :color="color"       
    :multi-line="true"       
    :timeout="3000">       
    {{ text }}       
        
    <v-btn         
        dark         
        text         
        @click="snackbar = false">         
        Close       
    </v-btn>     
</v-snackbar> 
</v-container> 

</template>

<script>
  export default {
    data () {
      return {
         headers: [
          {
            text: 'No',
            value: 'index',
          },
          {
            text: 'Id Pengadaan Produk',
            value: 'id_pengadaan_produk',
          },
          {
            text: 'Nama Supplier',
            value: 'nama_supplier',
          },
          {
            text: 'Total',
            value: 'total',
          },
          {
            text: 'Status',
            value: 'status',
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
          {
            text: 'Aksi',
            value: null,
          },
        ],
            dialog: false,
            confirmationDialog: false,
            editedIndex: -1,
            produks:[],
            pengadaans:[],
            detailPengadaans:[],
            suppliers:[],
            detailTambah:[],
            id_supplier:null,
            empty:null,
            dialogDetailPengadaanProduk: false,
            detailItem: '',
            on: '',
            user: new FormData(),
            user2: new FormData(),
            form: 
            {
              subtotal: 0,
              created_by: sessionStorage.getItem('Nama'),
              delete_by: sessionStorage.getItem('Nama'),
              modified_by: sessionStorage.getItem('Nama'),
            },
            typeInput: 'new', 
            search: '',
            snackbar: false,          
            color: null,         
            text: '',          
            load: false,

      }
    },
    watch: {
      id_supplier() {
        this.empty = 'null';
      },
    },
    computed: 
    {
      formTitle () {
        return this.typeInput === "new" ? 'Add Company' : 'Edit Company'
      },
    },
    methods: {
        getSupplier() {
        var uri = this.$apiUrl + 'Supplier';
        this.$http.get(uri).then((response) => {
          this.suppliers = response.data.message;
        });
      },
        getProduk() {
        var uri = this.$apiUrl + 'Produk/' + 'all';
        this.$http.get(uri).then((response) => {
          this.produks = response.data.message;
        });
      },
       getPengadaan() {
        var uri = this.$apiUrl + 'PengadaanProduk/'+ 'getWithJoin' ;
        this.$http.get(uri).then((response) => {
          this.pengadaans = response.data.message;
        });
      },
       getDetailPengadaan() {
        var uri = this.$apiUrl + 'DetailPengadaan/'+ 'getWithJoin' ;
        this.$http.get(uri).then((response) => {
          this.detailPengadaans = response.data.message;
        });
      },
      setTotal(index){
        this.detailTambah[index].total_harga = this.detailTambah[index].jumlah * this.detailTambah[index].harga;
      },
      setSubtotal() {
        this.form.subtotal = 0;
        for (var i = 0; i < this.detailTambah.length; i++) {
          this.form.subtotal =
            this.form.subtotal + this.detailTambah[i].total_harga;
        }

      },
      addTambah() {
        this.detailTambah.push({
         
          id_pengadaan_produk: '',
          id_detail_pengadaan: '',
          id_supplier: '',
          id_produk: '',
          jumlah: '',
          harga: '',
          total_harga: '',
          created_at: '',
          created_by: sessionStorage.getItem('Nama'),
          modified_at: '',
          modified_by: '',
          delete_at: '',
          delete_by: '',
        });
      },
      deleteRow(tambah) {
        this.detailTambah.splice(
          this.detailTambah.indexOf(tambah),
          1
        );
      },
      resetDynamic() {
        while (this.detailTambah.length != 0) {
          for (var i = 0; i < this.detailTambah.length; i++) {
            this.detailTambah.splice(this.detailTambah[i], 1);
          }
        }
        this.id_supplier = null;
      },
      filterProgres() {
        return this.pengadaans.filter((pengadaan) => {
          return pengadaan.status.match('Menunggu Konfirmasi');
        });
      },
      filteredItems2(value) {
        return this.detailPengadaans.filter((i) => {
          return (
            !value.id_pengadaan_produk ||
            i.id_pengadaan_produk === value.id_pengadaan_produk
          );
        });
      },
      showDetail(item) {
        this.detailItem = item;
        this.dialogDetailPengadaanProduk= true;
      },
       
        sendDataPengadaan() {
        this.user.append('id_supplier', this.id_supplier);
        this.user.append('created_by', this.form.created_by);
        var uri = this.$apiUrl + 'PengadaanProduk';

        this.load = true;
        this.$http
          .post(uri, this.user)
          .then((response) => {
            this.sendDataDetailPengadaan(response.data.message);
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
      sendDataDetailPengadaan(id_pengadaan_produk) {
        for (let i = 0; i < this.detailTambah.length; i++) {
          this.detailTambah[i].id_pengadaan_produk = id_pengadaan_produk;
        }
        this.user2.append(
          'detail_pengadaan',
          JSON.stringify(this.detailTambah)
        );
        var uri = this.$apiUrl + 'DetailPengadaan/insertMultiple';
        this.load = true;
        this.$http
          .post(uri, this.user2)
          .then((response) => {
            this.snackbar = true;
            this.color = 'green';
            this.text = response.data.message;
            this.load = false;
            this.dialog = false;
            this.id_supplier = null;
            this.getPengadaan(); 
          this.getDetailPengadaan();
          })
          .catch((error) => {
            this.errors = error;
            this.snackbar = true;
            this.text = 'Coba Lagi';
            this.color = 'red';
            this.load = false;
          });
      },
        updateData(){ 
            this.company = new FormData()
            this.company.append('id_user', this.$session.get('user').id_user)
            this.company.append('company_name', this.form.company_name);
            this.company.append('address', this.form.address);
            this.company.append('city', this.form.city);
            this.company.append('province', this.form.province);
            this.company.append('company_email', this.form.company_email);
            this.company.append('phone_number', this.form.phone_number);
            this.company.append('company_picture', this.form.company_picture);
            this.company.append('company_description', this.form.company_description);

            var uri =this.$apiUrl + 'company/' + this.form.id             
            this.load = true             
            this.$http.post(uri,this.company).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackba r               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;  
                this.text = error             
                // this.text = 'Try Again';
                this.color = 'red';               
                this.load = false;           
            })         
        },
        deleteData(id){ 
            this.confirmationDialog = false;
            var uri =this.$apiUrl + 'company/delete/' + id             
            this.load = true             
            this.$http.post(uri).then(response =>{               
                this.snackbar = true; //mengaktifkan snackbar               
                this.color = 'green'; //memberi warna snackbar               
                this.text = response.data.message; //memasukkan pesan ke snackba r               
                this.load = false;               
                this.dialog = false               
                this.getData(); //mengambil data user               
                this.resetForm();           
            }).catch(error =>{               
                this.errors = error               
                this.snackbar = true;               
                this.text = 'Try Again';
                this.color = 'red';               
                this.load = false;           
            })
        }, 
        confirm(id){
            this.id = id;
            this.confirmationDialog = true;
        },
        editHandler(company){
            this.dialog = true; 
            this.typeInput = "edit";   
            this.form.id = company.id_company;       
            this.form.company_name = company.company_name;
            this.form.address = company.address;
            this.form.city = company.city;
            this.form.province = company.province;
            this.form.phone_number = company.phone_number;
            this.form.company_email = company.company_email;
            this.form.company_description = company.company_description;
        },
        setForm(){             
            if (this.typeInput === 'new') {
                this.sendData()             
            }else{         
                this.updateData()             
            }
        },
        resetForm(){     
          this.typeInput = 'new'        
            this.form = {                
                company_name: '',
                address: '', 
                city: '', 
                province: '',
                company_email: '',
                phone_number: '',
                company_description: ''             
            }         
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
    mounted(){         
        this.getProduk();     
        this.getSupplier();     
        this.getPengadaan(); 
         this.getDetailPengadaan();
    },
  }
</script>
<style scoped>
.text-md-center{
  font-family: 'Raleway', sans-serif;
 
}
.text-center{
  font-family: 'Raleway', sans-serif;
 
}
.v-card__title{
  color: black;
}
</style>
