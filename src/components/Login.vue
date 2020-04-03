<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="#f9c99e" dark flat>
                <v-toolbar-title
                  >Kouvee Petshop Login</v-toolbar-title
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
                    required
                    v-model="form.username"
                  />

                  <v-text-field
                    label="Password"
                    name="password"
                    prepend-icon="mdi mdi-lock"
                    type="password"
                    required
                    v-model="form.password"

                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <!-- <router-link :to="'/MenuCustomerService'">
                  <v-btn text router to="/menuPelanggan" color="#6c573c"
                    >Login CS Temp</v-btn
                  >
                </router-link> -->
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
              <v-snackbar v-model="snackbar" :color="color" :multi-line="true" :timeout="3000">
                {{ text }}
                <v-btn dark text @click="snackbar = false">
                  Close
                </v-btn>
              </v-snackbar>
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
              pegawai : [],
              typeInput: 'new', 
              errors : ''
          } 
      }, 
  props: {
    source: String
  },
  methods:{ 
    login() {
        if(this.form.username == "admin") {
          if(this.form.password == "admin123"){
            sessionStorage.setItem("Nama", "admin");
            this.$router.push({ name: "Pegawai" }); 
            console.log("admin");
          }else{
            this.snackbar = true;
            this.text = "Login Gagal";
            this.color = "red";
          }
        }
        else {
          this.user.append("username", this.form.username);
          this.user.append("password", this.form.password);
          var url = this.$apiUrl +  "Pegawai/" + "auth" ;
          this.load = true;
          this.$http
          .post(url, this.user)
          .then(response => {
            this.pegawai = response.data.message;
            console.log(this.pegawai);
            if(this.pegawai.id_pegawai!=null) {
              if(this.pegawai.role.toLowerCase()=="customer service"){//login ke menu customer service
                sessionStorage.setItem("Id", response.data.message.id_pegawai)
                sessionStorage.setItem("Nama", response.data.message.nama);
                this.$router.push({ name: "Pelanggan" });
                console.log("customer service");
              }else if(this.pegawai.role.toLowerCase()=="kasir"){
                //code untuk login ke kasir 
              }else{
                this.snackbar = true;
                this.text = "Login Gagal";
                this.color = "red";
              }
            }
            else {
              this.snackbar = true;
              this.text = "Login Gagal";
              this.color = "red";
            }
          })
          .catch(error => {
            this.errors = error;
            this.snackbar = true;
            this.text = "Try Again";
            this.color = "red";
            
          });
        }
    },
  } 
};
</script>
