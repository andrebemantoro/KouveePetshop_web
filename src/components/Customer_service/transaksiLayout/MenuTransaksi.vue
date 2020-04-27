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
              x-large
              style="text-transform: none !important;"
              color="#f9c99e"
              @click="(dialog = true), resetDynamic()"
            >
              <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>Tambah
              Transaksi
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
        <v-data-table :headers="headers" :items="transaksiProduks">
          <template v-slot:body="{ items }">
            <tbody>
              <tr
                v-for="(item, index) in items"
                :key="item.id_transaksi_produk"
              >
                <td>{{ index + 1 }}</td>
                <td
                  class="underlinetext"
                  @click="showDetail2(item)"
                  style="cursor:pointer"
                >
                  {{ item.id_transaksi_produk }}
                </td>
                <td>{{ item.nama_pelanggan }}</td>
                <td>{{ item.nama_hewan }}</td>
                <td>{{ item.total }}</td>
                <td>{{ item.status }}</td>
                <td>{{ item.tanggal_lunas }}</td>
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
                      @click="editHandlerProduk(item)"
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
      <v-container grid-list-md mb-20>
        <div>
          <v-tabs v-model="layananTab" color="#f9c99e" centered>
            <v-tabs-slider color="#f9c99e"></v-tabs-slider>
            <v-tab href="#layananTab-1">Diproses</v-tab>
            <v-tab href="#layananTab-2">Selesai</v-tab>
          </v-tabs>
        </div>
        <div v-if="this.layananTab == 'layananTab-1'">
          <h2 class="text-md-center">Data Transaksi Layanan Kouvee Petshop</h2>
          <v-layout row wrap style="margin:10px">
            <v-flex xs6>
              <v-btn
                depressed
                dark
                class="elevation-2"
                x-large
                style="text-transform: none !important;"
                color="#f9c99e"
                @click="dialog2 = true"
              >
                <v-icon size="18" class="mr-2">mdi-pencil-plus</v-icon>Tambah
                Transaksi
              </v-btn>
            </v-flex>
            <!-- <v-flex xs6 class="text-right">
              <v-text-field
                v-model="keyword2"
                append-icon="mdi-search"
                label="Cari"
                hide-details="auto"
                outlined
                clearable
              >
              </v-text-field>
            </v-flex>-->
          </v-layout>
          <v-data-table :headers="headers2" :items="transaksiLayanans">
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  v-for="(item, index) in filterProgress(items)"
                  :key="item.id_transaksi_layanan"
                >
                  <td>{{ index + 1 }}</td>
                  <td
                    class="underlinetext"
                    @click="showDetail(item)"
                    style="cursor:pointer"
                  >
                    {{ item.id_transaksi_layanan }}
                  </td>
                  <td>{{ item.nama_pelanggan }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.progress }}</td>
                  <td>{{ item.status }}</td>
                  <td>{{ item.tanggal_lunas }}</td>
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
                        @click="editHandlerProduk(item)"
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
        <div v-if="this.layananTab == 'layananTab-2'">
          <h2 class="text-md-center">Data Transaksi Layanan Kouvee Petshop</h2>
          <v-layout row wrap style="margin:10px">
            <v-flex xs6 />
          </v-layout>
          <v-data-table :headers="headers2" :items="transaksiLayanans">
            <template v-slot:body="{ items }">
              <tbody>
                <tr
                  v-for="(item, index) in filterProgress2(items)"
                  :key="item.id_transaksi_layanan"
                >
                  <td>{{ index + 1 }}</td>
                  <td
                    class="underlinetext"
                    @click="showDetail(item)"
                    style="cursor:pointer"
                  >
                    {{ item.id_transaksi_layanan }}
                  </td>
                  <td>{{ item.nama_pelanggan }}</td>
                  <td>{{ item.nama_hewan }}</td>
                  <td>{{ item.total }}</td>
                  <td>{{ item.progress }}</td>
                  <td>{{ item.status }}</td>
                  <td>{{ item.tanggal_lunas }}</td>
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
                        @click="editHandlerProduk(item)"
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
      </v-container>
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
            <v-btn color="primary" text @click="deleteDataProduk(deleteId)"
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
    <!------------------------ Detail Layanan Dialog ------------------------>
    <template>
      <v-dialog
        v-model="dialogDetailTransaksiLayanan"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <v-spacer />
            <h2 class="text-md-center">
              {{ 'Id Transaksi Layanan: ' + detailItem.id_transaksi_layanan }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-simple-table height="50%">
                <thead>
                  <tr>
                    <th class="text-left">Id Detail Transaksi</th>
                    <th class="text-left">Nama Layanan</th>
                    <th class="text-left">Ukuran Hewan</th>
                    <th class="text-left">Harga Satuan</th>
                    <th class="text-left">Jumlah</th>
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
                    v-for="item in filteredItems(detailItem)"
                    :key="item.id_detail_transaksi_layanan"
                  >
                    <td>{{ item.id_detail_transaksi_layanan }}</td>
                    <td>{{ item.nama_layanan }}</td>
                    <td>{{ item.ukuran_hewan }}</td>
                    <td>{{ item.harga }}</td>
                    <td>{{ item.jumlah }}</td>
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
                          @click="editHandlerHargaLayanan(item)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-container>
            <br />
            <div class="text-right">
              <v-simple-table>
                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ 'Subtotal : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.subtotal }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Diskon : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem.diskon }}</h3>
                    </td>
                  </tr>
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
              <div v-if="this.layananTab == 'layananTab-1'">
                <v-btn
                  depressed
                  dark
                  class="elevation-2"
                  x-large
                  style="text-transform: none !important;"
                  color="#f9c99e"
                  @click="
                    (dialogDetailTransaksiLayanan = false),
                      updateProgressLayanan(detailItem)
                  "
                >
                  <v-icon size="18" class="mr-2">mdi-check-bold</v-icon>Layanan
                  Selesai
                </v-btn>
              </div>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogDetailTransaksiLayanan = false"
              >Tutup</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!------------------------ Detail Produk Dialog ------------------------>
    <template>
      <v-dialog
        v-model="dialogDetailTransaksiProduk"
        persistent
        max-width="1300px"
      >
        <v-card>
          <v-card-title>
            <v-spacer />
            <h2 class="text-md-center">
              {{ 'Id Transaksi Produk: ' + detailItem2.id_transaksi_produk }}
            </h2>
            <v-spacer />
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-simple-table height="50%">
                <thead>
                  <tr>
                    <th class="text-left">Id Detail Transaksi</th>
                    <th class="text-left">Nama Produk</th>
                    <th class="text-left">Harga Satuan</th>
                    <th class="text-left">Jumlah</th>
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
                    v-for="item in filteredItems2(detailItem2)"
                    :key="item.id_detail_transaksi_produk"
                  >
                    <td>{{ item.id_detail_transaksi_produk }}</td>
                    <td>{{ item.nama_produk }}</td>
                    <td>{{ item.harga }}</td>
                    <td>{{ item.jumlah }}</td>
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
                          @click="editHandlerHargaLayanan(item)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-container>
            <br />
            <div class="text-right">
              <v-simple-table>
                <td class="text-right">
                  <tr>
                    <td>
                      <h3>{{ 'Subtotal : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.subtotal }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Diskon : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.diskon }}</h3>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <h3>{{ 'Total : Rp' }}</h3>
                    </td>
                    <td>
                      <h3>{{ detailItem2.total }}</h3>
                    </td>
                  </tr>
                </td>
              </v-simple-table>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialogDetailTransaksiProduk = false"
              >Tutup</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </template>
    <!-- ---------------------Dialog Tambah Produk----------------------------------- -->
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="#fff4cb">
          <v-btn icon @click="(dialog = false), resetDynamic()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Menu Tambah Transaksi Produk</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader>
            <h2>Data Pembelian</h2>
          </v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-card>
                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="form.id_jenis_hewan"
                      required
                      :items="hewans"
                      :filter="customFilter"
                      item-value="id_jenis_hewan"
                      color="purple"
                      item-text="nama"
                      label="Nama Hewan*"
                      outlined
                      rounded
                      
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="1">
                    <v-text-field
                      v-model="form.created_by"
                      label="Customer Service"
                      readonly
                      color="purple"
                      outlined
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-text-field
                      v-model="form.id_customer_service"
                      label="ID Customer Service"
                      outlined
                      color="purple"
                      readonly
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="1">
                    <h2>Total Pembelian :</h2>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="form.subtotal"
                      label="Total Pembelian"
                      readonly
                      shaped
                      color="purple"
                      prefix="Rp."
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <h2>Diskon Pembelian:</h2>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="form.diskon"
                      label="Diskon"
                      @change="setSubtotal()"
                      shaped
                      color="purple"
                      prefix="Rp."
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                <h3>Data Produk</h3>
              </v-list-item-title>
              <v-card>
                <div
                  class="form-row"
                  v-for="(detilTransaksi, index) in detilTransaksis"
                  :key="index"
                >
                  <v-row>
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="detilTransaksi.id_produk"
                        required
                        width
                        :items="produks"
                        @change="filteredProduk(index), setTotal(index)"
                        item-value="id_produk"
                        item-text="nama"
                        label="Nama Produk*"
                        outlined
                        color="purple"
                        :filter="customFilter"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Jumlah*"
                        v-model="detilTransaksi.jumlah"
                        color="purple"
                        type="number"
                        outlined
                        single-line
                        clearable
                        @change="setTotal(index), setSubtotal()"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Harga Produk*"
                        v-model="detilTransaksi.harga"
                        value
                        outlined
                        readonly
                        color="purple"
                        prefix="Rp."
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Subtotal*"
                        v-model="detilTransaksi.total_harga"
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
                        @click="deleteRow(detilTransaksi), setSubtotal()"
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
                      @click="addTransaksi"
                      class="tombol"
                    >
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>

                    <v-btn
                      outlined
                      color="green"
                      x-large
                      fab
                      @click="sendDataTransaksi()"
                      class="tombol"
                    >
                      <v-icon>mdi-content-save</v-icon>
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
    <!-- ---------------------Dialog Tambah Layanan----------------------------------- -->
    <v-dialog
      v-model="dialog2"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar color="#fff4cb">
          <v-btn icon @click="(dialog2 = false), resetDynamic2()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Menu Tambah Transaksi Produk</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn text @click="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-list three-line subheader>
          <v-subheader> <h2>Data Pembelian</h2> </v-subheader>
          <v-list-item>
            <v-list-item-content>
              <v-card>
                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="form.id_jenis_hewan"
                      required
                      :items="hewans"
                      :filter="customFilter"
                      item-value="id_jenis_hewan"
                      color="purple"
                      item-text="nama"
                      label="Nama Hewan*"
                      outlined
                      rounded=""
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="1">
                    <v-text-field
                      v-model="form.created_by"
                      label="Customer Service"
                      readonly=""
                      color="purple"
                      outlined=""
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-text-field
                      v-model="form.id_customer_service"
                      label="ID Customer Service"
                      outlined=""
                      color="purple"
                      readonly=""
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="1">
                    <h2>Total Pembelian:</h2>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="form.subtotal"
                      label="Total Pembelian"
                      readonly=""
                      shaped=""
                      color="purple"
                      prefix="Rp."
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <h2>Diskon Pembelian:</h2>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="form.diskon"
                      label="Diskon"
                      @change="setSubtotal2()"
                      shaped=""
                      color="purple"
                      prefix="Rp."
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-card>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> <h3>Data Produk</h3></v-list-item-title>
              <v-card>
                <div
                  class="form-row"
                  v-for="(detilLayanan, index) in detilLayanans"
                  :key="index"
                >
                  <v-row>
                    <v-col cols="3">
                      <v-autocomplete
                        v-model="detilLayanan.id_layanan"
                        required
                        width=""
                        :items="layanans"
                        @change="filteredHargaLayanan(index), setTotal2(index)"
                        item-value="id_layanan"
                        item-text="nama"
                        label="Nama Layanan*"
                        outlined
                        color="purple"
                        :filter="customFilter"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="2">
                      <v-autocomplete
                        v-model="detilLayanan.id_ukuran_hewan"
                        required
                        width=""
                        :items="ukurans"
                        @change="filteredHargaLayanan(index), setTotal2(index)"
                        item-value="id_ukuran_hewan"
                        item-text="nama"
                        label="Ukuran*"
                        outlined
                        color="purple"
                        :filter="customFilter"
                      ></v-autocomplete>
                    </v-col>
                    <v-col cols="1">
                      <v-text-field
                        label="Jumlah*"
                        v-model="detilLayanan.jumlah"
                        color="purple"
                        type="number"
                        outlined=""
                        single-line=""
                        clearable=""
                        @change="setTotal2(index), setSubtotal2()"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="2">
                      <v-text-field
                        label="Harga Layanan*"
                        v-model="detilLayanan.harga"
                        value=""
                        outlined=""
                        readonly=""
                        color="purple"
                        prefix="Rp."
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        label="Subtotal*"
                        v-model="detilLayanan.total_harga"
                        value=""
                        outlined=""
                        readonly=""
                        color="purple"
                        prefix="Rp."
                      ></v-text-field>
                    </v-col>

                    <v-col cols="1">
                      <v-btn
                        outlined=""
                        color="red lighten-2"
                        x-large=""
                        @click="deleteRow2(detilLayanan), setSubtotal2()"
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
                      @click="addLayanan()"
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
                      @click="sendDataLayanan(), (dialog2 = false)"
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
      <v-btn dark text @click="snackbar = false">Tutup</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      cari: '',
      tabs: 0,
      dialog: false,
      dialog2: false,
      detilTransaksis: [],
      detilLayanans: [],
      layanans: [],
      ukurans: [],
      detailTransaksiLayanans: [],
      detailTransaksiProduks: [],
      selectedIndex: 0,
      detailItem: '',
      detailItem2: '',
      transaksiProduks: [],
      transaksiLayanans: [],
      keyword: '',
      hewans: [],
      pelanggans: [],
      produks: [],
      bottomNav: 1,
      menu: false,
      on: '',
      deleteDialog: '',
      submit: '',
      headers: [
        {
          text: 'No',
          value: 'index',
        },
        {
          text: 'Id Transaksi Produk',
          value: 'id_transaksi_produk',
        },
        {
          text: 'Nama Pelanggan',
          value: 'nama_pelanggan',
        },
        {
          text: 'Nama Hewan',
          value: 'nama_hewan',
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
          text: 'Tanggal Lunas',
          value: 'tanggal_lunas',
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
      headers2: [
        {
          text: 'No',
          value: 'index',
        },
        {
          text: 'Id Transaksi Layanan',
          value: 'id_transaksi_layanan',
        },
        {
          text: 'Nama Pelanggan',
          value: 'nama_pelanggan',
        },
        {
          text: 'Nama Hewan',
          value: 'nama_hewan',
        },
        {
          text: 'Total',
          value: 'total',
        },
        {
          text: 'Progress',
          value: 'progress',
        },
        {
          text: 'Status',
          value: 'status',
        },
        {
          text: 'Tanggal Lunas',
          value: 'tanggal_lunas',
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
      layananTab: null,
      dialogWarning: '',
      dialogEdit: '',
      dialogPassword: '',
      dialogDetailTransaksiLayanan: false,
      dialogDetailTransaksiProduk: false,
      pesan: '',
      search: '',
      snackbar: false,
      color: null,
      text: '',
      load: false,
      form: {
        subtotal: "",
        diskon: "",
        id_jenis_hewan: "",
        created_by: sessionStorage.getItem("Nama"),
        delete_by: sessionStorage.getItem("Nama"),
        modified_by: sessionStorage.getItem("Nama"),
        id_customer_service: sessionStorage.getItem("Id"),
      },
      user: new FormData(),
      user2: new FormData(),
      detil: new FormData(),
      detil2: new FormData(),
      transaksiLayanan: new FormData(),
      typeInput: 'new',
      errors: '',
      updatedId: '',
    };
  },

  methods: {
    filterProgress() {
      return this.transaksiLayanans.filter((transaksiLayanan) => {
        return transaksiLayanan.progress.match('Sedang Diproses');
      });
    },
    filteredItems(value) {
      return this.detailTransaksiLayanans.filter((i) => {
        return (
          !value.id_transaksi_layanan ||
          i.id_transaksi_layanan === value.id_transaksi_layanan
        );
      });
    },
    filteredItems2(value) {
      return this.detailTransaksiProduks.filter((i) => {
        return (
          !value.id_transaksi_produk ||
          i.id_transaksi_produk === value.id_transaksi_produk
        );
      });
    },
    filterProgress2() {
      return this.transaksiLayanans.filter((transaksiLayanan) => {
        return transaksiLayanan.progress.match('Layanan Selesai');
      });
    },
    selectTabs(selectedTabs) {
      this.tabs = selectedTabs;
    },
    deleteRow(_detilTransaksi) {
      this.detilTransaksis.splice(
        this.detilTransaksis.indexOf(_detilTransaksi),
        1
      );
    },
    deleteRow2(_detilTransaksi) {
      this.detilLayanans.splice(this.detilLayanans.indexOf(_detilTransaksi), 1);
    },

    resetDynamic() {
      while (this.detilTransaksis.length != 0) {
        for (var i = 0; i < this.detilTransaksis.length; i++) {
          this.detilTransaksis.splice(this.detilTransaksis[i], 1);
        }
      }
      this.resetForm();
    },

    resetDynamic2() {
      while (this.detilLayanans.length != 0) {
        for (var i = 0; i < this.detilLayanans.length; i++) {
          this.detilLayanans.splice(this.detilLayanans[i], 1);
        }
      }
      this.resetForm();
    },

    resetForm() {
      this.form = {
        subtotal: '',
        diskon: '',
        id_jenis_hewan: '',
        id_customer_service: sessionStorage.getItem('Id'),
        created_by: sessionStorage.getItem('Nama'),
        delete_by: sessionStorage.getItem('Nama'),
        modified_by: sessionStorage.getItem('Nama'),
      };
    },
    addTransaksi() {
      this.getProduk();
      this.detilTransaksis.push({
        id_customer_service: sessionStorage.getItem('Id'),
        id_transaksi_produk: '',
        id_produk: '',
        jumlah: '',
        total_harga: '',
        harga: '',
        created_at: '',
        created_by: sessionStorage.getItem('Nama'),
        modified_at: '',
        modified_by: '',
        delete_at: '',
        delete_by: '',
      });
    },
    addLayanan() {
      this.detilLayanans.push({
        id_customer_service: sessionStorage.getItem("Id"),
        id_transaksi_layanan: "",
        id_harga_layanan: "",
        jumlah: "",
        total_harga: "",
        harga: "",
        created_at: "",
        created_by: sessionStorage.getItem("Nama"),
        modified_at: "",
        modified_by: "",
        delete_at: "",
        delete_by: "",
      });
    },

    filteredProduk(index) {
      var uri =
        this.$apiUrl +
        'Produk/' +
        'search/' +
        this.detilTransaksis[index].id_produk;
      this.$http.get(uri).then((response) => {
        this.detilTransaksis[index].harga = response.data.message.harga;
        this.detilTransaksis[index].total_harga =
          this.detilTransaksis[index].harga *
          this.detilTransaksis[index].jumlah;
      });
    },
    filteredHargaLayanan(index) {
      var uri =
        this.$apiUrl +
        'HargaLayanan/' +
        'searchByIdLayananUkuran/' +
        this.detilLayanans[index].id_layanan +
        '/' +
        this.detilLayanans[index].id_ukuran_hewan;
      this.$http.get(uri).then((response) => {
        this.detilLayanans[index].harga = response.data.message.harga;
        this.detilLayanans[index].id_harga_layanan =
          response.data.message.id_harga_layanan;
        this.detilLayanans[index].total_harga =
          this.detilLayanans[index].harga * this.detilLayanans[index].jumlah;
      });
    },
    setTotal(index) {
      this.detilTransaksis[index].total_harga =
        this.detilTransaksis[index].harga * this.detilTransaksis[index].jumlah;
    },
    setTotal2(index) {
      this.detilLayanans[index].total_harga =
        this.detilLayanans[index].harga * this.detilLayanans[index].jumlah;
    },
    setSubtotal() {
      this.form.subtotal = 0;
      for (var i = 0; i < this.detilTransaksis.length; i++) {
        this.form.subtotal =
          this.form.subtotal + this.detilTransaksis[i].total_harga;
      }
      this.form.subtotal = this.form.subtotal - this.form.diskon;
    },
    setSubtotal2() {
      this.form.subtotal = 0;
      for (var i = 0; i < this.detilLayanans.length; i++) {
        this.form.subtotal =
          this.form.subtotal + this.detilLayanans[i].total_harga;
      }
      this.form.subtotal = this.form.subtotal - this.form.diskon;
    },
    getDataProduk() {
      var uri = this.$apiUrl + 'TransaksiProduk/' + 'getWithJoin';
      this.$http.get(uri).then((response) => {
        this.transaksiProduks = response.data.message;
      });
    },
    getDataTransaksiProduk() {
      var uri = this.$apiUrl + 'DetailTransaksiProduk/' + 'getWithJoin';
      this.$http.get(uri).then((response) => {
        this.detailTransaksiProduks = response.data.message;
      });
    },
    getHewan() {
      var uri = this.$apiUrl + 'Hewan/' + 'all';
      this.$http.get(uri).then((response) => {
        this.hewans = response.data.message;
      });
    },
    getPelanggan() {
      var uri = this.$apiUrl + 'Pelanggan/' + 'all';
      this.$http.get(uri).then((response) => {
        this.pelanggans = response.data.message;
      });
    },
    getProduk() {
      var uri = this.$apiUrl + 'Produk/' + 'all';
      this.$http.get(uri).then((response) => {
        this.produks = response.data.message;
      });
    },
    getDataLayanan() {
      var uri = this.$apiUrl + 'TransaksiLayanan/' + 'getWithJoin';
      this.$http.get(uri).then((response) => {
        this.transaksiLayanans = response.data.message;
      });
    },
    getDataTransaksiLayanan() {
      var uri = this.$apiUrl + 'DetailTransaksiLayanan/' + 'getWithJoin';
      this.$http.get(uri).then((response) => {
        this.detailTransaksiLayanans = response.data.message;
      });
    },
    getLayanan() {
      var uri = this.$apiUrl + 'Layanan';
      this.$http.get(uri).then((response) => {
        this.layanans = response.data.message;
      });
    },
    getUkuran() {
      var uri = this.$apiUrl + 'UkuranHewan';
      this.$http.get(uri).then((response) => {
        this.ukurans = response.data.message;
      });
    },

    sendDataTransaksi() {
      this.detil.append('id_customer_service', this.form.id_customer_service);
      this.detil.append('created_by', this.form.created_by);
      this.detil.append('subtotal', this.form.subtotal);
      this.detil.append('diskon', this.form.diskon);
      this.detil.append('id_hewan', this.form.id_jenis_hewan);
      var uri = this.$apiUrl + 'TransaksiProduk';

      this.load = true;
      this.$http
        .post(uri, this.detil)
        .then((response) => {
          this.sendDataDetilTransaksi(response.data.message);
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Coba Lagi';
          this.color = 'red';
          this.load = false;
        });
    },
    sendDataDetilTransaksi(id_transaksi_produk) {
      for (let i = 0; i < this.detilTransaksis.length; i++) {
        this.detilTransaksis[i].id_transaksi_produk = id_transaksi_produk;
      }
      this.user.append(
        'detail_transaksi_produk',
        JSON.stringify(this.detilTransaksis)
      );
      var uri = this.$apiUrl + 'DetailTransaksiProduk/insertMultiple';
      this.load = true;
      this.$http
        .post(uri, this.user)
        .then((response) => {
          this.snackbar = true;
          this.color = 'green';
          this.text = response.data.message;
          this.load = false;
          this.dialog = false;
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Coba Lagi';
          this.color = 'red';
          this.load = false;
        });
    },
    sendDataLayanan() {
      this.detil2.append('id_customer_service', this.form.id_customer_service);
      this.detil2.append('created_by', this.form.created_by);
      this.detil2.append('subtotal', this.form.subtotal);
      this.detil2.append('diskon', this.form.diskon);
      this.detil2.append('id_hewan', this.form.id_jenis_hewan);

      var uri = this.$apiUrl + 'TransaksiLayanan';

      this.load = true;
      this.$http
        .post(uri, this.detil2)
        .then((response) => {
          this.sendDataDetilLayanan(response.data.message);
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Coba Lagi';
          this.color = 'red';
          this.load = false;
        });
    },
    sendDataDetilLayanan(id_transaksi_layanan) {
      for (let i = 0; i < this.detilLayanans.length; i++) {
        this.detilLayanans[i].id_transaksi_layanan = id_transaksi_layanan;
      }
      this.user2.append(
        'detail_transaksi_layanan',
        JSON.stringify(this.detilLayanans)
      );
      var uri = this.$apiUrl + 'DetailTransaksiLayanan/insertMultiple';
      this.load = true;
      this.$http
        .post(uri, this.user2)
        .then((response) => {
          this.snackbar = true;
          this.color = 'green';
          this.text = response.data.message;
          this.load = false;
          this.dialog = false;
          this.getDataLayanan();
          this.getDataTransaksiLayanan();
          this.typeInput = 'new';
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Coba Lagi';
          this.color = 'red';
          this.load = false;
        });
    },

    updateProgressLayanan(detailItem) {
      this.updatedId = detailItem.id_transaksi_layanan;
      this.transaksiLayanan.append(
        'modified_by',
        sessionStorage.getItem('Nama')
      );
      console.log(detailItem.id_transaksi_layanan);
      var uri =
        this.$apiUrl + 'TransaksiLayanan/' + 'updateProgress/' + this.updatedId;
      this.load = true;
      this.$http
        .post(uri, this.transaksiLayanan)
        .then((response) => {
          this.snackbar = true; //mengaktifkan snackbar
          this.color = 'green'; //memberi warna snackbar
          this.text = response.data.message; //memasukkan pesan kesnackbar
          this.load = false;
          this.dialogEdit = false;
          this.getDataLayanan();
          this.getDataTransaksiLayanan(); //mengambil data transaksi layanan
          this.typeInput = 'new';
        })
        .catch((error) => {
          this.errors = error;
          this.snackbar = true;
          this.text = 'Coba Lagi';
          this.color = 'red';
          this.load = false;
        });
    },
  

    setFormProduk() {
      if (this.typeInput === 'new') {
        this.sendDataProduk();
      } else {
        console.log('data berhasil diubah');
        this.updateDataProduk();
      }
    },
    showDetail(item) {
      this.detailItem = item;
      this.dialogDetailTransaksiLayanan = true;
    },
    showDetail2(item) {
      this.detailItem2 = item;
      this.dialogDetailTransaksiProduk = true;
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
    this.getDataProduk();
    this.getDataLayanan();
    this.getHewan();
    this.getProduk();
    this.getDataTransaksiLayanan();
    this.getDataTransaksiProduk();
    this.getLayanan();
    this.getUkuran();
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
.underlinetext {
  text-decoration: underline;
}
</style>
