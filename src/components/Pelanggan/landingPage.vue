<template>
  <!-- Latihan 1 - Column -->
  <div>
    <header>
      <v-navigation-drawer
        v-model="drawer"
        relative
        fixed
        right
        color="#ffebcd"
      >
        <v-list nav>
          <v-list-item
            v-for="group in groups"
            :key="group.title"
            link
            @click="drawer = false"
          >
            <v-list-item-icon>
              <v-icon color="black">{{ group.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-btn text :href="group.href" class="group-title">
                {{ group.title }}</v-btn
              >
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar fixed color="#ffebcd" class="appbar">
        <img
          src="../../assets/kouveepetshoplogo.png"
          alt="Logo"
          width="120px"
        />
        <v-spacer></v-spacer>
        <v-app-bar-items
          class="hidden-sm-and-down"
          v-for="group in groups"
          :key="group.title"
          link
        >
          <v-btn text class="mx-3" :href="group.href">
            {{ group.title }}
          </v-btn>
        </v-app-bar-items>
        <v-app-bar-items class="hidden-md-and-up">
          <v-app-bar-nav-icon
            @click.stop="drawer = !drawer"
            class="greydarken-3"
          ></v-app-bar-nav-icon>
        </v-app-bar-items>
      </v-app-bar>
    </header>
    <main>
      <div id="beranda">
        <v-carousel
          cycle
          height="768"
          hide-delimiter-background
          show-arrows-on-hover
        >
          <v-carousel-item
            v-for="(item, i) in colors"
            :key="i"
            :src="item.src"
            reverse-transition="fade-transition"
            transition="fade-transition"
            class="image"
          >
          </v-carousel-item>
        </v-carousel>
      </div>
      <div id="produk">
        <h2>PRODUK YANG TERSEDIA</h2>
        <v-btn class="btnSort" @click="sortProduk()" color="#ffebcd" light>
          Urutkan Berdasarkan Harga
        </v-btn>
        <section class="products">
          <v-card
            class="product-card"
            v-for="(item, i) in paginationProduk(produks)"
            :key="i"
          >
            <div class="product-image">
              <img :src="$apiUrl2 + 'produk/' + item.gambar" contain />
            </div>
            <div
              class="product-info"
              @click="showDetailProduk(item)"
              style="cursor:pointer"
            >
              <h5>
                {{ item.nama }}
              </h5>
              <h6>Rp{{ item.harga }},00</h6>
            </div>
          </v-card>
        </section>
        <v-pagination
          v-model="page"
          class="my-4"
          :length="pageProduk()"
          color="#ffebcd"
          light
        ></v-pagination>
      </div>
      <div class="container-satu" id="tentang-kami">
        <h2>TENTANG KAMI</h2>
        <p>
          Kouvee Petshop berdiri sejak tahun 2019. Perkembangan kemajuan
          teknologi menjadi salah satu alasan utama kami untuk menjadikan situs
          ini sebagai satu-satunya website resmi kami dalam melayani setiap
          customer secara online. Di dalam pelayanan, kami selalu berusaha untuk
          bisa melayani kebutuhan anda dalam memenuhi segala macam kebutuhan
          yang anda perlukan untuk hewan peliharaan anda. Kami juga selalu siap
          memberikan informasi secara maksimal serta selalu menyediakan
          produk-produk yang terbaik di setiap kelasnya dengan aneka macam
          pilihan varian. Visi utama kami adalah untuk bisa mejadi pilihan utama
          anda dalam memenuhi segala macam kebutuhan hewan peliharaan anda, baik
          itu untuk perseorangan, ataupun lembaga swasta atau negeri. Besar
          harapan kami kedepan yaitu untuk dapat terus maju dan berkembang dalam
          melayani kebutuhan peliharaan anda agar tetap sehat dan terawat dengan
          baik. <br />Alamat kami: Jl. Moses Gatotkaca no 22, Yogyakarta.
          <br />Telp: (0274) 357735
        </p>
      </div>
      <div id="layanan">
        <h2>LAYANAN YANG TERSEDIA</h2>
        <v-btn class="btnSort" @click="sortLayanan()" color="#ffebcd" light>
          Urutkan Berdasarkan Nama
        </v-btn>
        <section class="products">
          <div
            class="product-card"
            v-for="(item, i) in paginationLayanan(layanans)"
            :key="i"
          >
            <div
              class="product-info"
              @click="showDetailLayanan(item)"
              style="cursor:pointer"
            >
              <h5>
                {{ item.nama }}
              </h5>
            </div>
          </div>
        </section>
        <v-pagination
          v-model="page2"
          class="my-4"
          :length="pageLayanan()"
          color="#ffebcd"
          light
        ></v-pagination>
      </div>
    </main>
    <!-- Akhir latihan 1 -->
    <!-- Latihan 2 - Service/Features -->
    <footer>
      <div class="container-dua">
        <div class="layanan satu">
          <h3>KONTAK KAMI:</h3>
          <ul>
            <li>Instagram : @kouveepetshop</li>
            <li>Facebook : Kouvee Petshop</li>
            <li>Twitter : @kouveepetshop</li>
            <li>Telpon : (0274) 357735</li>
          </ul>
        </div>
        <div class="layanan dua">
          <h5>
            Dibuat dengan cinta oleh Programmer Kouvee Petshop 💘<br />©2020
          </h5>
        </div>
        <div class="layanan tiga">
          <h3>AGENDA KITA 2020:</h3>
          <ul>
            <li>12/04 2020 - Berbagi makan anjing gratis</li>
            <li>15/05 2020 - Kelas fotografi untuk kucing lucu</li>
            <li>16/06 2020 - Kelas yoga untuk hewan peliharaan</li>
          </ul>
        </div>
      </div>
    </footer>
    <!-- Dialog Detail Produk -->
    <v-dialog v-model="dialogDetailProduk" max-width="800px" max-height="500px">
      <v-card color="white">
        <div
          v-for="(item, i) in filteredItemsProduk(detailItem)"
          :key="i"
          class="product-card-detail"
        >
          <img :src="$apiUrl2 + 'produk/' + item.gambar" contain />
          <div class="product-card-detail-info">
            <h3>
              {{ item.nama }}
            </h3>
            <h4>Rp{{ item.harga }},00</h4>
            <h5 v-if="item.jumlah_stok == 0">Stok Habis!</h5>
            <h5 v-else>Jumlah Stok: {{ item.jumlah_stok }}</h5>
            <p>
              {{ item.nama }} merupakan salah satu dari beberapa macam produk
              yang kami jual di Kouvee Petshop. Kualitas dan mutu dari produk
              ini terjamin karena setiap produk yang dijual dipilih langsung
              oleh pemilik Kouvee Petshop.
            </p>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              text
              class="btn"
              @click="dialogDetailProduk = false"
              >Tutup</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
    <!-- ******************** -->
    <!-- Dialog Detail Layanan -->
    <v-dialog
      v-model="dialogDetailLayanan"
      max-width="800px"
      max-height="500px"
    >
      <v-card color="white">
        <div
          v-for="(item, i) in filteredItemsLayanan(detailItem)"
          :key="i"
          class="product-card-detail"
        >
          <div class="product-card-detail-ukuran">
            <h3>Ukuran hewan yang tersedia:</h3>
            <ul
              v-for="item in filteredItemsHargaLayanan(detailItem)"
              :key="item.id_harga_layanan"
            >
              <h4 v-if="searchUkuranHewan(item.id_ukuran_hewan) != undefined">
                {{ searchUkuranHewan(item.id_ukuran_hewan).nama }}
              </h4>
              <h4>Rp{{ item.harga }},00</h4>
            </ul>
          </div>
          <div class="product-card-detail-info">
            <h3>
              {{ item.nama }}
            </h3>

            <p>
              {{ item.nama }} merupakan salah satu dari beberapa macam layanan
              yang kami sediakan di Kouvee Petshop. Kualitas dan mutu dari
              layanan ini terjamin karena setiap layanan yang disediakan dipilih
              langsung oleh pemilik Kouvee Petshop.
            </p>
            <v-spacer></v-spacer>
            <v-btn
              color="red"
              text
              class="btn"
              @click="dialogDetailLayanan = false"
              >Tutup</v-btn
            >
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
  <!-- ******************** -->
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      produks: [],
      layanans: [],
      hargalayanans: [],
      ukurans: [],
      detailItem: '',
      sortProdukByPrice: false,
      sortLayananByPrice: false,
      page: 1,
      page2: 1,
      rows: 8,
      rows2: 8,
      pages: 1,
      pages2: 1,
      dialogDetailLayanan: false,
      dialogDetailProduk: false,
      groups: [
        {
          title: 'BERANDA',
          icon: 'mdi-home-variant',
          href: '#beranda',
        },
        {
          title: 'PRODUK',
          icon: 'mdi-paw',
          href: '#produk',
        },
        {
          title: 'LAYANAN',
          icon: 'mdi-dog-service',
          href: '#layanan',
        },
        {
          title: 'TENTANG KAMI',
          icon: 'mdi-help-box',
          href: '#tentang-kami',
        },
      ],
      colors: [
        {
          src: 'https://wallpaperaccess.com/full/546539.jpg',
        },
        {
          src:
            'https://www.petfoodprocessing.net/ext/resources/PFP-Images/Articles/Purina-unleashes-product-innovation_Lead.jpg?1554125823',
        },
        {
          src:
            'https://www.pixel4k.com/wp-content/uploads/2018/11/young-cat-4k_1542238388.jpg',
        },
        {
          src:
            'https://www.chromethemer.com/download/hd-wallpapers/rabbit-3840x2160.jpg',
        },
        {
          src:
            'https://vip-petfood.com/wp-content/uploads/2016/08/Special-Golden-Retriever-Wallpaper.jpg?1589068800031',
        },
      ],
    }),

    watch: {
      group() {
        this.drawer = false;
      },
    },
    methods: {
      getDataProduk() {
        var uri = this.$apiUrl + 'Produk/' + 'getAll';
        this.$http.get(uri).then((response) => {
          this.produks = response.data.message;
        });
      },
      getDataLayanan() {
        var uri = this.$apiUrl + 'Layanan/' + 'getAll';
        this.$http.get(uri).then((response) => {
          this.layanans = response.data.message;
        });
      },
      getDataHargaLayanan() {
        var uri = this.$apiUrl + 'HargaLayanan/' + 'getAll';
        this.$http.get(uri).then((response) => {
          this.hargalayanans = response.data.message;
        });
      },
      getDataUkuran() {
        var uri = this.$apiUrl + 'UkuranHewan/all';
        this.$http.get(uri).then((response) => {
          this.ukurans = response.data.message;
        });
      },
      showDetailProduk(item) {
        this.detailItem = item;
        this.dialogDetailProduk = true;
      },
      showDetailLayanan(item) {
        this.detailItem = item;
        this.dialogDetailLayanan = true;
      },
      filteredItemsHargaLayanan(value) {
        return this.hargalayanans.filter((i) => {
          return !value.id_layanan || i.id_layanan === value.id_layanan;
        });
      },
      filteredItemsProduk(value) {
        return this.produks.filter((i) => {
          return !value.id_produk || i.id_produk === value.id_produk;
        });
      },
      filteredItemsLayanan(value) {
        return this.layanans.filter((i) => {
          return !value.id_layanan || i.id_layanan === value.id_layanan;
        });
      },
      searchUkuranHewan(id_ukuran_hewan) {
        return this.ukurans.find((x) => x.id_ukuran_hewan === id_ukuran_hewan);
      },
      paginationProduk() {
        var trimStart = (this.page - 1) * this.rows;
        var trimEnd = trimStart + this.rows;
        var trimmedData = this.produks.slice(trimStart, trimEnd);
        return trimmedData;
      },
      pageProduk() {
        this.pages = Math.ceil(this.produks.length / this.rows);
        return this.pages;
      },
      paginationLayanan() {
        var trimStart2 = (this.page2 - 1) * this.rows2;
        var trimEnd2 = trimStart2 + this.rows2;
        var trimmedData2 = this.layanans.slice(trimStart2, trimEnd2);
        return trimmedData2;
      },
      pageLayanan() {
        this.pages2 = Math.ceil(this.layanans.length / this.rows2);
        return this.pages2;
      },
      sortProduk() {
        if (this.sortProdukByPrice == false) {
          this.produks.sort(function(a, b) {
            return a.harga - b.harga;
          });
          this.sortProdukByPrice = true;
        } else {
          this.produks.sort(function(a, b) {
            return b.harga - a.harga;
          });
          this.sortProdukByPrice = false;
        }
      },
      sortLayanan() {
        if (this.sortLayananByPrice == false) {
          this.layanans.sort(function(a, b) {
            var nameA = a.nama.toUpperCase(); // ignore upper and lowercase
            var nameB = b.nama.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }

            // names must be equal
            return 0;
          });
          this.sortLayananByPrice = true;
        } else {
          this.layanans.sort(function(a, b) {
            var nameA = a.nama.toUpperCase(); // ignore upper and lowercase
            var nameB = b.nama.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return 1;
            }
            if (nameA > nameB) {
              return -1;
            }

            // names must be equal
            return 0;
          });
          this.sortLayananByPrice = false;
        }
      },
    },

    mounted() {
      this.getDataProduk();
      this.getDataLayanan();
      this.getDataHargaLayanan();
      this.getDataUkuran();
    },
  };
</script>

<style>
  /* latihan 2 */
  .container-satu {
    width: auto;
    margin: 0 auto;
    padding: 1em 0.5em;
    background-color: #f7f7f7;
    box-sizing: border-box;
  }

  .container-satu p {
    text-align: justify;
    font-size: 15px;
    font-weight: 400;
    font-family: 'Montserrat', sans-serif;
    padding: 20px;
    box-sizing: border-box;
    width: 60%;
    margin: 0 auto;
  }

  .container-dua {
    width: auto;
    margin: 0 auto;
    padding: 1em 0.5em;
    background-color: #f7f7f7;
    box-sizing: border-box;
  }
  .layanan {
    padding: 20px;
    box-sizing: border-box;
  }
  .layanan.satu {
    background: white;
    text-decoration: none;
    color: #444;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin: 0 2rem;
    padding: 1rem;
  }

  .layanan.dua h5 {
    text-align: center;
    font-size: 1.2rem;
    font-weight: 400;
    font-family: 'Montserrat', sans-serif;
    padding: 20px;
    box-sizing: border-box;
    margin: 0 2rem;
    padding: 1rem;
  }

  .layanan.tiga {
    background: white;
    text-decoration: none;
    color: #444;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    margin: 0 2rem;
    padding: 1rem;
  }

  .group-title {
    font-weight: 700;
    text-decoration: none;
    color: black;
  }

  /* akhir dari latihan 2 */
  /* responsive */
  @media (min-width: 800px) {
    .container-dua {
      display: flex;
      justify-content: space-between;
    }

    .layanan {
      width: 30%;
    }
  }
  /* akhir dari responsive */
  .appbar {
    padding: 0 1rem;
    box-sizing: border-box;
  }
  .products {
    width: 90%;
    max-width: 1500px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    grid-gap: 2rem;
    padding: 1em 0.5em;
  }
  .product-card {
    background: #fafafa;
    text-decoration: none;
    color: #444;
    align-items: center;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    min-height: 100%;
    position: relative;
    top: 0;
    transition: all 0.1s ease-in;
  }

  .product-card:hover {
    top: -2px;
    box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
  }

  .product-image img {
    width: 100%;
  }

  .product-info {
    padding: 1rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .product-info h5 {
    font-size: 1rem;
    margin: 0;
    text-align: center;
  }

  .product-info h6 {
    font-size: 1rem;
    margin: 0;
    text-align: center;
  }

  h2 {
    text-align: center;
    margin: 2rem;
    font-size: 2.5rem;
    font-weight: 700;
    font-family: 'Montserrat', sans-serif;
  }

  .product-card-detail {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  .product-card-detail img {
    padding: 2em;
    box-sizing: border-box;
    max-width: 100%;
  }

  .product-card-detail-info {
    font-family: 'Montserrat', sans-serif;
    padding: 2rem;
    box-sizing: border-box;
    margin: 0 2rem;
  }

  .product-card-detail-info p {
    text-align: justify;
  }

  .product-card-detail-ukuran {
    text-align: center;
    margin: 0 2rem;
    padding: 4rem;
    box-sizing: border-box;
  }

  .product-card-detail-ukuran ul {
    margin: 0;
    padding: 0;
  }

  .btn {
    margin: 1em 0 0;
    font-weight: bold;
    align-items: right;
  }

  .btnSort {
    left: 11%;
    position: relative;
    padding: 1rem;
    font-weight: bold;
  }

  @media only screen and (min-width: 1581px) {
    .products {
      grid-template-columns: repeat(12, minmax(160px, 1fr));
    }
  }

  @media only screen and (min-width: 1126px) and (max-width: 1580px) {
    .products {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  @media only screen and (min-width: 801px) and (max-width: 1125px) {
    .products {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  @media only screen and (min-width: 501px) and (max-width: 800px) {
    .products {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media only screen and (max-width: 500px) {
    .products {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  @media only screen and (max-width: 700px) {
    .container-satu p {
      width: 90%;
    }
    .product-card-detail {
      display: flex;
      flex-direction: column;
    }
  }
</style>
