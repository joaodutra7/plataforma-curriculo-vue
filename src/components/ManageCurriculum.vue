<template>
  <div class="flex flex-col items-center justify-center w-full h-full relative z-10 p-4 animate-fade-in">

    <div v-if="isLoading" class="text-center p-8 bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-2xl border border-gray-700 animate-scale-in">
      <div class="w-16 h-16 border-4 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
      <p class="text-xl md:text-2xl font-semibold text-gray-300">Carregando seu currículo...</p>
      <p class="text-sm text-gray-500 mt-2">Isso pode levar alguns segundos.</p>
    </div>

    <div v-else-if="curriculum" class="w-full">
      <div class="text-center mb-8 animate-fade-in-down">
        <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Seu Currículo
        </h1>
        <p class="mt-4 text-lg text-gray-300">
          Aqui está o seu currículo atual.
        </p>
      </div>

      <CurriculumDisplay :curriculum="curriculum" class="animate-fade-in-up animation-delay-100" />

      <div class="text-center mt-8 animate-fade-in-up animation-delay-200">
        <button 
          @click="isEditing = true" 
          class="group flex items-center justify-center py-4 px-8 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xl font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 relative overflow-hidden"
        >
          <span class="absolute right-0 top-0 h-full w-16 bg-white/20 transform translate-x-full group-hover:-translate-x-60 transition-transform duration-500 ease-in-out skew-x-12"></span>
          <PencilSquareIcon class="h-7 w-7 mr-3" />
          Editar Currículo
        </button>
      </div>

      <CurriculumForm v-if="isEditing" :existing-data="curriculum" @saved="fetchCurriculum" class="mt-12 animate-fade-in-up animation-delay-300" />
    </div>

    <div v-else class="w-full">
      <div class="text-center mb-8 animate-fade-in-down">
        <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Crie seu Currículo
        </h1>
        <p class="mt-4 text-lg text-gray-300">
          Parece que você ainda não tem um currículo. Preencha o formulário abaixo para começar.
        </p>
      </div>

      <CurriculumForm @saved="fetchCurriculum" class="animate-fade-in-up animation-delay-100" />
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import CurriculumForm from '@/components/CurriculumForm.vue';
import CurriculumDisplay from '@/components/CurriculumDisplay.vue';
import { PencilSquareIcon } from '@heroicons/vue/24/solid'; 

export default {
  components: {
    CurriculumForm,
    CurriculumDisplay,
    PencilSquareIcon, 
  },
  data() {
    return {
      curriculum: null,
      isLoading: true,
      isEditing: false, 
    };
  },
  async created() {
    
    await this.fetchCurriculum();
  },
  methods: {
    async fetchCurriculum() {
      this.isLoading = true;
      this.isEditing = false; 

      const token = localStorage.getItem('token');

      if (!token) {
        this.isLoading = false;
        alert('Você precisa estar logado para ver seu currículo.');
        this.$router.push('/login');
        return;
      }

      try {
        const response = await axios.get('/api/curriculum', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        this.curriculum = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.curriculum = null; 
        } else {
          console.error('Erro ao buscar currículo:', error);
          alert('Sua sessão pode ter expirado ou ocorreu um erro. Por favor, faça login novamente.');
          this.$router.push('/login');
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
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


.animate-fade-in-up.animation-delay-100 { animation-delay: 0.1s; }
.animate-fade-in-up.animation-delay-200 { animation-delay: 0.2s; }
.animate-fade-in-up.animation-delay-300 { animation-delay: 0.3s; }


</style>