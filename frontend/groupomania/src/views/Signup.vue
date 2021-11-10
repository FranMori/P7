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
        .required("Veuillez entrer votre Email")
        .email("l'Email n'est pas valide")
        .max(50, "50 caractères maximum"),
      password: yup
        .string()
        .required("Veuillez entrer votre mot de passe")
        .min(6, "Au minimum 6 caractères")
        .max(40, "40 caractères maximum"),
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
