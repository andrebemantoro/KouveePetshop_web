<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        ></v-img>
        <v-spacer></v-spacer>
        <v-card class="mx-auto" color="indigo" max-width="400">
          <v-container grid-list-md mb-0>
            <h1 class="text-center">Login Form</h1>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      label="Email*"
                      v-model="form.email"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-text-field
                      label="Password*"
                      v-model="form.password"
                      type="password"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-spacer></v-spacer>
              <v-btn block text router to="/components/userController.vue"
                >Login</v-btn
              >
              <!-- <v-btn color="dark" text @click="login_verified()">login</v-btn> -->
            </v-card-actions>
          </v-container>
        </v-card>
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
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      snackbar: false,
      color: null,
      text: "",
      load: false,
      form: {
        email: "",
        password: ""
      },
      user: new FormData(),
      errors: ""
    };
  },
  methods: {
    login_verified() {
      var url = this.$apiUrl + "/auth";
      this.user = new FormData();
      this.user.append("email", this.form.email);
      this.user.append("password", this.form.password);
      this.$http.post(url, this.user).then(response => {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          this.$router.push({ name: "UserController" });
        } else {
          alert("Login Failed");
        }
      });
    }
  }
};
</script>
