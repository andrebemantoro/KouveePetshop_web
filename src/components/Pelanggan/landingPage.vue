<template>
  <!-- Latihan 1 - Column -->
  <div>
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
    data() {},
  };
</script>

<style>
  /* latihan 1 */
  .container-satu {
    width: auto;
    margin: auto;
    margin-top: 1px;
    background-color: blanchedalmond;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
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
