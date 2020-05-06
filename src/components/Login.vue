<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-5 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <img
                    src="../assets/kouveepetshoplogo.png"
                    width="72%"
                    height="72%"
                  />
                  <h1 class="flex my-4" color="#f9c99e">
                    Kouvee Petshop Administration
                  </h1>
                </div>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi mdi-account"
                    type="text"
                    required
                    v-model="form.username"
                    :error="error"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
                    label="Password"
                    name="password"
                    prepend-icon="mdi mdi-lock"
                    required
                    v-model="form.password"
                    :rules="[rules.required]"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn block color="#f9c99e" @click="login()" :loading="loading"
                  >Login
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
    </v-content>
  </v-app>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        load: false,
        snackbar: false,
        hidePassword: true,
        error: false,
        color: null,
        text: '',

        rules: {
          required: (value) => !!value || 'Required.',
        },
        form: {
          username: null,
          password: null,
        },
        user: new FormData(),
        pegawai: [],
        typeInput: 'new',
        errors: '',
      };
    },
    props: {
      source: String,
    },
    methods: {
      login() {
        if (this.form.username == 'admin') {
          if (this.form.password == 'admin123') {
            sessionStorage.setItem('Nama', 'admin');
            this.snackbar = true;
            this.text = 'Login Berhasil';
            this.color = 'green';
            this.$router.push({ name: 'Pegawai' });
            console.log('admin');
          } else {
            this.snackbar = true;
            this.text = 'Login Gagal';
            this.color = 'red';
          }
        } else {
          this.user.append('username', this.form.username);
          this.user.append('password', this.form.password);
          var url = this.$apiUrl + 'Pegawai/' + 'auth';
          this.load = true;
          this.$http
            .post(url, this.user)
            .then((response) => {
              this.pegawai = response.data.message;
              if (this.pegawai.id_pegawai != null) {
                if (this.pegawai.role.toLowerCase() == 'customer service') {
                  //login ke menu customer
                  sessionStorage.setItem(
                    'Id',
                    response.data.message.id_pegawai
                  );
                  sessionStorage.setItem(
                    'Nama',
                    response.data.message.username
                  );
                  this.snackbar = true;
                  this.text = 'Login Berhasil';
                  this.color = 'green';
                  this.$router.push({ name: 'Pelanggan' });
                  console.log('customer service');
                } else if (this.pegawai.role.toLowerCase() == 'kasir') {
                  //code untuk login ke kasir
                  sessionStorage.setItem(
                    'Id',
                    response.data.message.id_pegawai
                  );
                  sessionStorage.setItem(
                    'Nama',
                    response.data.message.username
                  );
                  this.snackbar = true;
                  this.text = 'Login Berhasil';
                  this.color = 'green';
                  this.$router.push({ name: 'TransaksiProduk' });
                  console.log('customer service');
                } else {
                  this.snackbar = true;
                  this.text = 'Login Gagal';
                  this.color = 'red';
                }
              } else {
                this.snackbar = true;
                this.text = 'Login Gagal';
                this.color = 'red';
              }
            })
            .catch((error) => {
              this.errors = error;
              this.snackbar = true;
              this.text = 'Try Again';
              this.color = 'red';
            });
        }
      },
    },
    mounted() {
      window.addEventListener('keyup', (event) => {
        if (event.keyCode === 13) {
          this.login();
        }
      });
    },
  };
</script>

<style scoped lang="css">
  #login {
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    z-index: 0;
  }
</style>
