<template>
  <!-- Latihan 1 - Column -->
  <div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
      right
      color="#ffebcd"
    >
      <v-list nav>
        <v-list-item
          v-for="group in groups"
          :key="group.title"
          link
          @click="$router.push(group.to).catch((error) => {})"
        >
          <v-list-item-icon>
            <v-icon color="black">{{ group.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="group-title">{{
              group.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="#ffebcd">
      <img src="../../assets/kouveepetshoplogo.png" alt="John" width="120px" />
      <v-divider class="mx-4" vertical></v-divider>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text>
          BERANDA
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn text>
          PRODUK
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn text>
          LAYANAN
        </v-btn>
        <v-divider vertical></v-divider>
        <v-btn text>
          TENTANG KAMI
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-md-and-up">
        <v-app-bar-nav-icon
          @click.stop="drawer = !drawer"
          class="greydarken-3"
        ></v-app-bar-nav-icon>
      </v-toolbar-items>
    </v-toolbar>
    <div>
      <v-carousel
        cycle
        height="400"
        hide-delimiter-background
        show-arrows-on-hover
      >
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="display-3">{{ slide }} Slide</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="container-satu">
      <v-layout class="mx-4">
        <v-flex>
          <template>
            <v-row>
              <v-col v-for="(item, i) in produks" :key="i" cols="3">
                <v-card class="mx-auto" max-width="344">
                  <v-img
                    :src="$apiUrl2 + 'produk/' + item.gambar"
                    contain
                    class="white"
                    height="200"
                  />

                  <v-card-title>
                    {{ item.nama }}
                  </v-card-title>

                  <v-card-subtitle color="black">
                    Harga: Rp{{ item.harga }}
                  </v-card-subtitle>
                </v-card>
              </v-col>
            </v-row>
          </template>
        </v-flex>
      </v-layout>
    </div>
    <div class="container-satu"></div>
    <div class="container-satu">
      <div class="kolom-utama">
        <h2>Kouve Petshop</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa aliquid
          veritatis, nostrum rem accusantium illum amet cum esse labore,
          doloremque animi perspiciatis ducimus architecto alias!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          sapiente sed debitis vero error molestiae neque molestias mollitia
          accusamus, odio eos distinctio cum eveniet qui, ipsa tempore
          architecto eligendi voluptatem amet soluta quo eaque dolor. Omnis
          dolorum error distinctio deserunt.
        </p>
      </div>

      <div class="sidebar-satu">
        <h3>Sidebar Satu</h3>
        <ul>
          <li>
            <a href>Link 1</a>
          </li>
          <li>
            <a href>Link 2</a>
          </li>
          <li>
            <a href>Link 3</a>
          </li>
          <li>
            <a href>Link 4</a>
          </li>
          <li>
            <a href>Link 5</a>
          </li>
        </ul>
      </div>
      <div class="sidebar-dua">
        <h3>Sidebar Dua</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque officia
          tempore quos dolorem at optio?
        </p>
      </div>
    </div>
    <!-- Akhir latihan 1 -->
    <!-- Latihan 2 - Service/Features -->
    <div class="container-dua">
      <div class="layanan satu">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi eum ab
        fugit ipsum ut fugiat dolore. Aperiam numquam error sed?
      </div>
      <div class="layanan dua">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi nemo ut
        fuga eius at dolore itaque consequuntur consectetur nulla. Molestias
        perspiciatis quam a doloremque pariatur. Aut ullam tempora itaque totam?
      </div>
      <div class="layanan tiga">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Velit,
        voluptas.
      </div>
    </div>
  </div>
  <!-- Akhir Latihan 2 -->
</template>

<script>
  export default {
    data: () => ({
      drawer: false,
      produks: [],
      groups: [
        {
          title: 'BERANDA',
          icon: 'mdi-home-variant',
          to: '/LoginAdmin',
        },
        {
          title: 'PRODUK',
          icon: 'mdi-paw',
          to: '/LoginAdmin',
        },
        {
          title: 'LAYANAN',
          icon: 'mdi-dog-service',
          to: '/LoginAdmin',
        },
        {
          title: 'TENTANG KAMI',
          icon: 'mdi-help-box',
          to: '/LoginAdmin',
        },
      ],
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: ['First', 'Second', 'Third', 'Fourth', 'Fifth'],
    }),

    watch: {
      group() {
        this.drawer = false;
      },
    },
    methods: {
      getData() {
        var uri = this.$apiUrl + 'Produk/' + 'getAll';
        this.$http.get(uri).then((response) => {
          this.produks = response.data.message;
        });
      },
    },
    mounted() {
      this.getData();
    },
  };
</script>

<style>
  /* latihan 1 */
  .container-satu {
    width: auto;
    max-height: 800px;
    margin: auto;
    margin-top: 1px;
    background-color: blanchedalmond;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
  }

  .kolom-utama {
    flex: 3;
    order: 2;
  }

  .sidebar-satu {
    flex: 1;
    order: 1;
  }

  .sidebar-dua {
    flex: 1;
    order: 3;
  }
  /* akhir dari latihan 1 */
  /* latihan 2 */
  .container-dua {
    width: auto;
    margin: auto;
    margin-top: 1px;
    padding: 20px;
    background-color: rgb(182, 230, 252);
    box-sizing: border-box;
  }
  .layanan {
    padding: 20px;
    box-sizing: border-box;
  }
  .layanan.satu {
    background-color: rgb(240, 105, 105);
  }

  .layanan.dua {
    background-color: rgb(198, 138, 255);
  }

  .layanan.tiga {
    background-color: rgb(193, 255, 131);
  }

  .group-title {
    font-weight: 400;
  }

  /* akhir dari latihan 2 */
  /* responsive */
  @media (min-width: 600px) {
    .container-dua {
      display: flex;
      justify-content: space-evenly;
    }

    .layanan {
      width: 30%;
    }
  }
  /* akhir dari responsive */
  /* .container {
              width: 600px;
              height: 150px;
              border: 5px solid black;
              margin: 30px;
              padding: 10px;
              box-sizing: border-box;
              display: flex;
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: space-evenly;
              align-items:center;
            } */

  /* .container div {
              width: 120px;
              height: 120px;
              background-color: rgba(32, 118, 248, 0.74);
              margin: 5px;
              flex-grow: 1;
            } */

  /* .container div.tiga {
              font-size: 69px;
            } */

  /* .container div.satu {
              order: 3;
            }

            .container div.empat {
              order : 4;
            } */
</style>
