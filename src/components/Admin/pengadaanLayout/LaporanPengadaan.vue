<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-card max-width="" class="text-md-center" justify-content-center>
            <v-container grid-list-md mb-5>
              <h1 class="text-md-center">Menu Laporan</h1>
              <v-spacer></v-spacer>
              <v-row>
                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Pengadaan Bulanan
                        </h2>
                        <div class=" text--primary">
                          Mencetak laporan pengadaan sesuai bulan dan tahun yang
                          dipilih.<br />
                          Silahkan masukan bulan dan tahun pengadaan.
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            right
                            bottom=""
                            rounded=""
                            small
                            color="primary"
                            @click="dialogPengadaanBulanan = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>

                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Pengadaan Tahunan
                        </h2>
                        <div class=" text--primary">
                          Mencetak laporan pengadaan sesuai tahun yang
                          dipilih.<br />
                          Silahkan masukan tahun pengadaan.
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            right
                            bottom=""
                            rounded=""
                            small
                            color="primary"
                            @click="dialogPengadaanTahunan = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>

                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Pendapatan Bulanan
                        </h2>
                        <div class=" text--primary">
                          Mencetak laporan Pendapatan sesuai bulan dan tahun
                          yang dipilih.<br />
                          Silahkan masukan bulan dan tahun pengadaan.
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            right
                            bottom=""
                            rounded=""
                            small
                            color="primary"
                            @click="dialogPendapatanBulanan = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>

                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Pendapatan Tahunan
                        </h2>
                        <div class=" text--primary">
                          Mencetak laporan Pendapatan sesuai tahun yang
                          dipilih.<br />
                          Silahkan masukan tahun pengadaan.
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            right
                            bottom=""
                            rounded=""
                            small
                            color="primary"
                            @click="dialogPendapatanTahunan = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>

                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Produk Terlaris
                        </h2>
                        <div class=" text--primary">
                          Mencetak laporan produk terlaris dalam satu tahun.<br />
                          Silahkan masukan tahun untuk mencetak.
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            right
                            bottom=""
                            rounded=""
                            small
                            color="primary"
                            @click="dialogProdukTerlaris = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>

                <v-col cols="6">
                  <v-hover v-slot:default="{ hover }">
                    <v-card width="100%" :elevation="hover ? 12 : 2">
                      <v-card-text>
                        <h2 class="text--primary">
                          Laporan Layanan Terlaris
                        </h2>
                        <div class=" text--primary">
                          Mencetak laporan layanan terlaris dalam satu tahun.<br />
                          Silahkan masukan tahun untuk mencetak.
                        </div>
                      </v-card-text>
                      <v-card-actions>
                        <v-hover v-slot:default="{ hover }">
                          <v-btn
                            :elevation="hover ? 12 : 2"
                            absolute
                            class="white--text"
                            fab
                            right
                            bottom=""
                            rounded=""
                            small
                            color="primary"
                            @click="dialogLayananTerlaris = true"
                          >
                            <v-icon>mdi-calendar</v-icon>
                          </v-btn>
                        </v-hover>
                      </v-card-actions>
                    </v-card>
                  </v-hover>
                </v-col>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogPengadaanBulanan"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Tanggal Pengadaan</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-dialog
                              ref="dialog1"
                              v-model="modal1"
                              :return-value.sync="date1"
                              persistent
                              width="50%"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="date1"
                                  label="Tanggal Pengadaan"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-on="on"
                                  outlined=""
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="date1"
                                type="month"
                                scrollable
                                :landscape="$vuetify.breakpoint.smAndUp"
                                full-width=""
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="resetForm(), (modal1 = false)"
                                  >Batal</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialog1.save(date1)"
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
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
                        @click="resetForm(), (dialogPengadaanBulanan = false)"
                        >Tutup</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongLaporanPengadaan(date1)"
                        >Simpan</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogPengadaanTahunan"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Tahun Pengadaan</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              outlined
                              type="text"
                              class="form-control"
                              placeholder="Masukan tahun pengadaan"
                              :maxlength="max"
                              v-model="date6"
                              prepend-icon="mdi-calendar"
                              counter="4"
                              @input="onlyNumbers"
                            />
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
                        @click="resetForm(), (dialogPengadaanTahunan = false)"
                        >Tutup</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongLaporanPengadaanTahunan(date6)"
                        >Simpan</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogPendapatanBulanan"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Tanggal Pendapatan</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-dialog
                              ref="dialog2"
                              v-model="modal2"
                              :return-value.sync="date2"
                              persistent
                              width="50%"
                            >
                              <template v-slot:activator="{ on }">
                                <v-text-field
                                  v-model="date2"
                                  label="Tanggal Pendapatan"
                                  prepend-icon="mdi-calendar"
                                  readonly
                                  v-on="on"
                                  outlined=""
                                ></v-text-field>
                              </template>
                              <v-date-picker
                                v-model="date2"
                                type="month"
                                scrollable
                                :landscape="$vuetify.breakpoint.smAndUp"
                                full-width=""
                              >
                                <v-spacer></v-spacer>
                                <v-btn
                                  text
                                  color="primary"
                                  @click="resetForm(), (modal2 = false)"
                                  >Batal</v-btn
                                >
                                <v-btn
                                  text
                                  color="primary"
                                  @click="$refs.dialog2.save(date2)"
                                  >OK</v-btn
                                >
                              </v-date-picker>
                            </v-dialog>
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
                        @click="resetForm(), (dialogPendapatanBulanan = false)"
                        >Tutup</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongPendapatanBulanan(date2)"
                        >Simpan</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogProdukTerlaris"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Tahun Transaksi</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              outlined
                              type="text"
                              class="form-control"
                              placeholder="Masukan tahun transaksi"
                              :maxlength="max"
                              v-model="date3"
                              prepend-icon="mdi-calendar"
                              counter="4"
                            />
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
                        @click="resetForm(), (dialogProdukTerlaris = false)"
                        >Tutup</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongProdukTerlaris(date3)"
                        >Simpan</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogLayananTerlaris"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Tahun Transaksi</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              outlined
                              type="text"
                              class="form-control"
                              placeholder="Masukan tahun transaksi"
                              :maxlength="max"
                              v-model="date5"
                              counter="4"
                              prepend-icon="mdi-calendar"
                            />
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
                        @click="resetForm(), (dialogLayananTerlaris = false)"
                        >Tutup</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongLayananTerlaris(date5)"
                        >Simpan</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
              <!-- -------------------------------------------------------------------------- -->
              <v-row justify="center">
                <v-dialog
                  v-model="dialogPendapatanTahunan"
                  persistent
                  max-width="600px"
                >
                  <v-card>
                    <v-card-title>
                      <span class="headline">Tahun Pendapatan</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col cols="12">
                            <v-text-field
                              outlined
                              type="text"
                              class="form-control"
                              placeholder="Masukan tahun pendaptan"
                              :maxlength="max"
                              v-model="date4"
                              prepend-icon="mdi-calendar"
                              counter="4"
                              @input="onlyNumbers"
                            />
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
                        @click="resetForm(), (dialogPendapatanTahunan = false)"
                        >Tutup</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="cekKosongPendapatanTahunan(date4)"
                        >Simpan</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
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
            </v-container>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: '12',
        max: 4,
        date1: null,
        date2: null,
        date3: null,
        date4: null,
        date5: null,
        date6: null,
        landscape: false,
        modal1: false,
        modal2: false,
        e13: 1,
        bulan: '',
        dialogPengadaanBulanan: false,
        dialogPengadaanTahunan: false,
        dialogPendapatanBulanan: false,
        dialogPendapatanTahunan: false,
        dialogProdukTerlaris: false,
        dialogLayananTerlaris: false,
        dialogWarning: false,
      };
    },
    methods: {
      save(date) {
        this.$refs.menu.save(date);
      },
      cekKosongProdukTerlaris(param) {
        if (param == null) {
          this.dialogWarning = true;
        } else {
          this.cetakProdukTerlaris(param);
          this.dialogProdukTerlaris = false;
        }
      },
      cekKosongLayananTerlaris(param) {
        if (param == null) {
          this.dialogWarning = true;
        } else {
          this.cetakLayananTerlaris(param);
          this.dialogLayananTerlaris = false;
        }
      },
      onlyNumbers: function() {
        this.message = this.message.replace(/[^0-9.]/g, '');
      },
      cekKosongLaporanPengadaan(param) {
        if (param == null) {
          this.dialogWarning = true;
        } else {
          this.cetakLaporanBulanan(param);
          this.dialogPengadaanBulanan = false;
        }
      },
      cekKosongLaporanPengadaanTahunan(param) {
        if (param == null) {
          this.dialogWarning = true;
        } else {
          this.cetakLaporanTahunan(param);
          this.dialogPengadaanTahunan = false;
        }
      },
      cekKosongPendapatanBulanan(param) {
        if (param == null) {
          this.dialogWarning = true;
        } else {
          this.cetakPendapatanBulanan(param);
          this.dialogPendapatanBulanan = false;
        }
      },
      cekKosongPendapatanTahunan(param) {
        if (param == null) {
          this.dialogWarning = true;
        } else {
          this.cetakPendapatanTahunan(param);
          this.dialogPendapatanTahunan = false;
        }
      },
      cetakLaporanBulanan(pengadaanBulanan) {
        var uri =
          this.$apiUrl + 'Laporan/laporanPengadaanBulanan/' + pengadaanBulanan;
        window.open(uri, '_blank');
        this.resetForm();
      },
      cetakLaporanTahunan(pengadaanTahunan) {
        var uri =
          this.$apiUrl + 'Laporan/laporanPengadaanTahunan/' + pengadaanTahunan;
        window.open(uri, '_blank');
        this.resetForm();
      },
      cetakPendapatanBulanan(pendapatanBulanan) {
        var uri =
          this.$apiUrl +
          'Laporan/laporanPendapatanBulanan/' +
          pendapatanBulanan;
        window.open(uri, '_blank');
        this.resetForm();
      },
      cetakProdukTerlaris(produkTerlaris) {
        var uri =
          this.$apiUrl + 'Laporan/laporanProdukTerlaris/' + produkTerlaris;
        window.open(uri, '_blank');
        this.resetForm();
      },
      cetakLayananTerlaris(layananTerlaris) {
        var uri =
          this.$apiUrl + 'Laporan/laporanLayananTerlaris/' + layananTerlaris;
        window.open(uri, '_blank');
        this.resetForm();
      },
      cetakPendapatanTahunan(pendapatanTahunan) {
        var uri =
          this.$apiUrl +
          'Laporan/laporanPendapatanTahunan/' +
          pendapatanTahunan;
        window.open(uri, '_blank');
        this.resetForm();
      },
      resetForm() {
        this.date1 = null;
        this.date2 = null;
        this.date3 = null;
        this.date4 = null;
        this.date5 = null;
      },
    },
    mounted() {},
  };
</script>
<style scoped>
  .text-md-center {
    font-family: 'Raleway', sans-serif;
  }
  .text-center {
    font-family: 'Raleway', sans-serif;
  }
  .v-card__title {
    color: black;
  }

  @import '~vue-snotify/styles/material.css';
</style>
