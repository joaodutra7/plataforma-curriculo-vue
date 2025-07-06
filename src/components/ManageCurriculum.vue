<template>
  <div class="container mx-auto p-4">
    <div v-if="isLoading" class="text-center">
      <p>Carregando seu currículo...</p>
    </div>

    <div v-else-if="curriculum">
      <h1 class="text-3xl font-bold mb-4">Seu Currículo</h1>
      <CurriculumDisplay :curriculum="curriculum" />

      <div class="text-center mt-6 flex justify-center gap-4">
          <button @click="isEditing = true" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Editar Currículo
          </button>
          <button @click="exportCurriculumToPDF" class="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700">
            Exportar para PDF
          </button>
      </div>

      <CurriculumForm v-if="isEditing" :existing-data="curriculum" @saved="fetchCurriculum" />
    </div>

    <div v-else>
      <h1 class="text-3xl font-bold mb-4">Crie seu Currículo</h1>
      <p class="mb-4">Parece que você ainda não tem um currículo. Preencha o formulário abaixo para começar.</p>
      <CurriculumForm @saved="fetchCurriculum" />
    </div>

  </div>
</template>

<script>

import html2pdf from 'html2pdf.js';
import axios from 'axios';
import CurriculumForm from '@/components/CurriculumForm.vue';
import CurriculumDisplay from '@/components/CurriculumDisplay.vue';

export default {
  components: {
    CurriculumForm,
    CurriculumDisplay,
  },
  data() {
    return {
      curriculum: null,
      isLoading: true,
      isEditing: false, // Controla o modo de edição
    };
  },
  async created() {
    // Assim que a página é criada, busca os dados do currículo
    await this.fetchCurriculum();
  },
  methods: {
  async fetchCurriculum() {
    this.isLoading = true;
    this.isEditing = false;

    const token = localStorage.getItem('token');

    if (!token) {
      this.isLoading = false;
      // Você pode redirecionar para o login ou mostrar uma mensagem
      alert('Você precisa estar logado para ver seu currículo.'); 
      this.$router.push('/login'); // Exemplo de redirecionamento
      return; // Interrompe a execução da função
    }

    try {
      const response = await axios.get('/api/curriculum', {
        headers: {
          'Authorization': `Bearer ${token}` // A linha crucial
        }
      });
      this.curriculum = response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        this.curriculum = null;
      } else {
        // O erro 401 cairá aqui se o token for inválido ou expirado
        console.error('Erro ao buscar currículo:', error);
        alert('Sua sessão pode ter expirado. Por favor, faça login novamente.');
        this.$router.push('/login');
      }
    } finally {
      this.isLoading = false;
    }
  },

  exportCurriculumToPDF() {
    this.$nextTick(() => {
      const element = this.$refs.curriculumContent?.$el;

      if (!element) {
        console.error('Elemento do currículo não encontrado para exportação.');
        alert('Ocorreu um erro ao preparar o PDF. Por favor, tente novamente.');
        return;
      }

      const options = {
        margin:       0.5,
        filename:     `curriculo_${this.curriculum.personalData.fullName.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(options).from(element).save();
    });
  }
}
};
</script>