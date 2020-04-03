<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#f9c99e" dark flat>
                <v-toolbar-title
                  >Kouvee Petshop for Admin Login</v-toolbar-title
                >
                <v-spacer />
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn :href="source" icon large target="_blank" v-on="on">
                    </v-btn>
                  </template>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi mdi-account"
                    type="text"
                    v-model="form.username"
                  />

                  <v-text-field
                    label="Password"
                    name="password"
                    prepend-icon="mdi mdi-lock"
                    type="password"
                    v-model="form.password"

                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <router-link :to="'/MenuCustomerService'">
                  <v-btn text router to="/menuPelanggan" color="#6c573c"
                    >Login CS Temp</v-btn
                  >
                </router-link>
                <v-spacer />
                <!-- <router-link :to="'/MenuAdmin'">
                  <v-btn text router to="/menuPegawai" color="#6c573c"
                    >Login</v-btn
                  >
                </router-link> -->
                <v-btn  
                style="text-transform: none !important;" 
                color="#6c573c" 
                @click="login()">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
    data () { 
          return { 
              dialog: false, 
              snackbar: false, 
              color: null, 
              text: '', 
              load: false,
              form: { 
                  username : null, 
                  password : null 
              }, 
              user : new FormData(), 
              typeInput: 'new', 
              errors : ''
          } 
      }, 
  props: {
    source: String
  },
  methods:{ 
  
    login() {
      // this.getData();
      var url = this.$apiUrl +  "Pegawai/" + "auth" ;
        this.user = new FormData();
        this.user.append("username", this.form.username);
        this.user.append("password", this.form.password);
        this.$http.post(url, this.user).then(response => {
          if (response.data.id) {
            sessionStorage.setItem("token", response.data.token);
            //  headers.setItem("token", response.data.token);
            // eslint-disable-next-line no-console
            console.log(sessionStorage);
            if(this.form.username == "adminbarbarbe@gmail.com" && this.form.password == "ZAQ123wsx*") {
              sessionStorage.setItem("type", 0);
              this.$router.push({ name: "User" }); 
            } else {
              sessionStorage.setItem("type", 1);
              this.$router.push({ name: "HomeUser" });
              console.log("lonnte");
            }
          }
          console.log("hapie");
      });
    },
  } 
  };
</script>
