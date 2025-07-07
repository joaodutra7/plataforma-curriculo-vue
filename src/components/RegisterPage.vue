<template>
  <div class="flex flex-col items-center justify-center w-full h-full relative z-10 p-4 animate-fade-in">

    <div class="bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-2xl p-8 md:p-10 max-w-md w-full border border-gray-700 transform hover:scale-[1.01] transition-all duration-500 ease-in-out animate-scale-in">
      
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-fade-in-down">
          Registrar-se
        </h1>
        <p class="mt-2 text-lg text-gray-300 animate-fade-in-up">
          Crie sua conta para acessar todas as funcionalidades.
        </p>
      </div>

      <form @submit.prevent="registerUser" class="flex flex-col gap-6 animate-fade-in-up animation-delay-200">
        <input v-model="name" placeholder="Nome completo"
          class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
        <input v-model="address" placeholder="Endereço"
          class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
        <input v-model="email" type="email" placeholder="Email"
          class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
        <input v-model="password" type="password" placeholder="Senha"
          class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
        <button type="submit"
          class="group flex items-center justify-center w-full py-4 px-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white text-xl font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500 transition-all duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 relative overflow-hidden mt-2"
        >
          <span class="absolute right-0 top-0 h-full w-12 bg-white/20 transform translate-x-full group-hover:-translate-x-40 transition-transform duration-500 ease-in-out skew-x-12"></span>
          Registrar
          <UserPlusIcon class="h-6 w-6 ml-3 transition-transform duration-300 group-hover:scale-110" />
        </button>
      </form>

      <div class="mt-8 text-center animate-fade-in-up animation-delay-500">
        <p class="text-gray-400">
          Já tem uma conta? 
          <router-link to="/login" class="text-blue-400 hover:underline font-semibold transition-colors duration-300">
            Faça login aqui!
          </router-link>
        </p>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import { UserPlusIcon } from '@heroicons/vue/24/solid';

export default {
  components: {
    UserPlusIcon
  },
  data() {
    return {
      name: "",
      address: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async registerUser() {
      try {
        const response = await axios.post("/api/auth/register", {
          name: this.name,
          address: this.address,
          email: this.email,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        alert("Registro realizado com sucesso! Você será redirecionado para o seu perfil."); 
        this.$router.push("/profile");
      } catch (error) {
        console.error("Erro ao registrar usuário:", error.response ? error.response.data : error.message);
        alert(
          error.response && error.response.data && error.response.data.message
            ? error.response.data.message
            : "Erro ao tentar registrar. Verifique os dados e tente novamente."
        );
      }
    },
  },
};
</script>

<style>

.animate-fade-in-up.animation-delay-200 { animation-delay: 0.2s; }
.animate-fade-in-up.animation-delay-500 { animation-delay: 0.5s; }

</style>