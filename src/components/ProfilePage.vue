<template>
  <div class="flex flex-col items-center justify-center w-full h-full relative z-10 p-4 animate-fade-in">

    <div class="bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-2xl p-8 md:p-10 max-w-md w-full border border-gray-700 transform hover:scale-[1.01] transition-all duration-500 ease-in-out animate-scale-in">
      
      <div class="text-center mb-8">
        <h1 class="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-fade-in-down">
          Meu Perfil
        </h1>
        <p class="mt-2 text-lg text-gray-300 animate-fade-in-up">
          Visualize suas informações de usuário.
        </p>
      </div>

      <div v-if="user.email" class="space-y-4 text-center animate-fade-in-up animation-delay-200">
        <p class="text-lg text-gray-300 flex items-center justify-center gap-2">
          <UserCircleIcon class="h-6 w-6 text-purple-400" />
          <strong class="text-white">Nome:</strong> {{ user.name }}
        </p>
        <p class="text-lg text-gray-300 flex items-center justify-center gap-2">
          <HomeModernIcon class="h-6 w-6 text-teal-400" />
          <strong class="text-white">Endereço:</strong> {{ user.address }}
        </p>
        <p class="text-lg text-gray-300 flex items-center justify-center gap-2">
          <EnvelopeIcon class="h-6 w-6 text-pink-400" />
          <strong class="text-white">Email:</strong> {{ user.email }}
        </p>
        
        <button @click="exportToPDF"
          class="group flex items-center justify-center w-full py-4 px-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 relative overflow-hidden mt-8"
        >
          <span class="absolute right-0 top-0 h-full w-12 bg-white/20 transform translate-x-full group-hover:-translate-x-40 transition-transform duration-500 ease-in-out skew-x-12"></span>
          <ArrowDownTrayIcon class="h-7 w-7 mr-3" />
          Exportar para PDF
        </button>
      </div>

      <div v-else class="text-center animate-fade-in-up animation-delay-200">
        <div class="w-16 h-16 border-4 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-xl md:text-2xl font-semibold text-gray-300">Carregando dados do usuário...</p>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import jsPDF from "jspdf";
import { UserCircleIcon, HomeModernIcon, EnvelopeIcon, ArrowDownTrayIcon } from '@heroicons/vue/24/solid';

export default {
  components: {
    UserCircleIcon,
    HomeModernIcon,
    EnvelopeIcon,
    ArrowDownTrayIcon
  },
  data() {
    return {
      user: {},
    };
  },
  async created() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para acessar o perfil.");
      this.$router.push("/login");
      return;
    }
    try {
      const response = await axios.get("/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.user = response.data;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      alert("Erro ao carregar seu perfil. Sua sessão pode ter expirado. Por favor, faça login novamente.");
      this.$router.push("/login");
    }
  },
  methods: {
    exportToPDF() {
      const doc = new jsPDF();
      let yOffset = 20;
      const lineHeight = 10;
      
      
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text("Dados do Perfil", 105, yOffset, { align: 'center' }); 
      yOffset += 30;

      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      doc.text(`Nome: ${this.user.name}`, 20, yOffset);
      yOffset += lineHeight;
      doc.text(`Endereço: ${this.user.address}`, 20, yOffset);
      yOffset += lineHeight;
      doc.text(`Email: ${this.user.email}`, 20, yOffset);
      
      doc.save(`perfil_${this.user.name.replace(/\s+/g, '_')}.pdf`);
    },
  },
};
</script>

<style>

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 1s linear infinite;
}


.animate-fade-in-up.animation-delay-200 { animation-delay: 0.2s; }
</style>