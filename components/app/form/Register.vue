<template>
  <v-card>
    <v-card-title class="title primary white--text mb-3">
      <v-icon class="mr-3" dark>mdi-account-plus</v-icon>
      Criar Conta
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form @submit.prevent="onsubmit" ref="form">
          <v-text-field dense outlined label="Nome do usuário" v-model="userInfo.username" :rules="[rules.required]"></v-text-field>
          <v-text-field dense outlined label="E-mail" v-model="userInfo.email" :rules="[rules.required, rules.email]"></v-text-field>
          <v-text-field dense outlined label="Senha" v-model="userInfo.password" 
          :type=" show ? 'text' : 'password'" 
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          :rules="[rules.required, rules.min, rules.password]" counter></v-text-field>
          <v-text-field dense outlined label="Confirmar senha" v-model="userInfo.repassword" 
          :type=" showRe ? 'text' : 'password'" 
          :append-icon="showRe ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showRe = !showRe"
          :rules="[rules.required, rules.min, rules.password]" counter></v-text-field>
          <div class="d-flex justify-space-between">
            <v-btn color="secundary" small type="submit">Registrar-se</v-btn>
            <v-btn color="secundary" small outlined @click="close()">Fechar</v-btn>
          </div>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      showRe: false,
      rules: {
        required:(value) => !!value || "Campo obrigatório.",
        min:(value) => (value || '').length >= 8 || "Deve conter no mínimo 8 caracteres.",
        email:(value) => /.+@/.test(value) || "Deve ser um e-mail.",
        password:(value) => (this.userInfo.password === this.userInfo.repassword) || "As senhas não conferem."
      },
      userInfo: {
        username: "",
        email: "",
        password: "",
        repassword: ""
      }
    }
  },
  methods: {
    close() {
      this.$emit('close',false)
    },
    onsubmit(){
      if(this.$refs.form.validate()){
        this.userInfo.identifier = this.userInfo.username
        this.$apollo.mutate({
          mutation:require('../../../graphql/register.gql'),
          variables:this.userInfo
        }).then( res => {
          this.$auth.loginWith("local", { data: this.userInfo, })
            .then(() => {
              this.$emit('close',false)
              this.$refs.form.reset()
              this.$store.dispatch("snackbars/setSnack", { text: `Bem vindo, ${this.$auth.user.username}!` , color: 'success'})
            })
        })
      }
    }
  }
}
</script>