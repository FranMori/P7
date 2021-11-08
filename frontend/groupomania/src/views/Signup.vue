<template> 
<div id='signup'>
  <h1>Signup</h1>
  <Form @submit="handleRegister" :validation-schema="schema">
    <div>
      <label for="email">Email</label>
      <Field name="email" type="text"/>
      <ErrorMessage name="email" class="error-feedback"/>
</div>
<div>
      <label for="prenom">Prénom</label>
      <Field name="prenom" type="text"/>
      <ErrorMessage name="prenom" class="error-feedback"/>
</div>
<div>
      <label for="nom">Nom</label>
      <Field name="nom" type="text"/>
      <ErrorMessage name="nom" class="error-feedback"/>
</div>
<div>
      <label for="password">Password</label>
      <Field name="password" type="password"/>
      <ErrorMessage name="password" class="error-feedback"/>
</div>
  
  
    <button>S'inscrire</button>
</Form>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";

export default {
  name: 'Signup',
    components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
     const schema = yup.object().shape({
      email: yup
        .string()
        .required("Email is required!")
        .email("Email is invalid!")
        .max(50, "Must be maximum 50 characters!"),
      password: yup
        .string()
        .required("Password is required!")
        .min(6, "Must be at least 6 characters!")
        .max(40, "Must be maximum 40 characters!"),
    });

    return {
      successful: false,
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
   methods: {
    handleRegister(user) {
      this.message = "";
      this.successful = false;
      this.loading = true;

      this.$store.dispatch("auth/register", user).then(
        (data) => {
          this.message = data.message;
          this.successful = true;
          this.loading = false;
          this.$router.push("/connexion")
        },
        (error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.loading = false;
        }
      )
    },
   },
}
</script>
