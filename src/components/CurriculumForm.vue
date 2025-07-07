<template>
  <div class="flex flex-col items-center justify-center w-full relative z-10 p-4 animate-fade-in">
    
    <div class="w-full max-w-4xl mx-auto mb-8 text-center animate-fade-in-down">
      <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        Gerenciar Currículo
      </h1>
      <p class="mt-4 text-lg text-gray-300">
        Preencha os campos abaixo para criar ou editar seu currículo.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-8 bg-gray-900/40 backdrop-blur-lg p-8 md:p-10 rounded-xl shadow-2xl w-full max-w-4xl border border-gray-700 animate-scale-in">

      <fieldset class="border border-gray-700 p-6 rounded-lg bg-gray-800/20 shadow-inner-lg animate-fade-in-up">
        <legend class="text-xl md:text-2xl font-extrabold px-3 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">Dados Pessoais</legend>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          <input v-model="formData.personalData.fullName" placeholder="Nome Completo" 
                 class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
          <input v-model="formData.personalData.email" type="email" placeholder="Email de Contato" 
                 class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
          <input v-model="formData.personalData.phone" placeholder="Telefone" 
                 class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
          <input v-model="formData.personalData.linkedin" placeholder="URL do LinkedIn (Opcional)" 
                 class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" />
        </div>
      </fieldset>

      <fieldset class="border border-gray-700 p-6 rounded-lg bg-gray-800/20 shadow-inner-lg animate-fade-in-up animation-delay-100">
        <legend class="text-xl md:text-2xl font-extrabold px-3 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Resumo Profissional</legend>
        <textarea v-model="formData.summary" placeholder="Fale um pouco sobre sua carreira..." 
                  class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 h-32 resize-y w-full"></textarea>
      </fieldset>

      <fieldset class="border border-gray-700 p-6 rounded-lg bg-gray-800/20 shadow-inner-lg animate-fade-in-up animation-delay-200">
        <legend class="text-xl md:text-2xl font-extrabold px-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Experiência Profissional</legend>
        <div v-for="(exp, index) in formData.experiences" :key="index" class="relative border-t border-gray-700 pt-6 mt-6 first:border-t-0 first:pt-0 first:mt-0 flex flex-col gap-4 bg-gray-800/30 p-4 rounded-lg shadow-sm">
          <input v-model="exp.jobTitle" placeholder="Cargo" 
                 class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
          <input v-model="exp.company" placeholder="Empresa" 
                 class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-gray-400 block mb-1">Data de Início</label>
              <input v-model="exp.startDate" type="date" 
                     class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" required />
            </div>
            <div>
              <label class="text-sm text-gray-400 block mb-1">Data de Término (opcional)</label>
              <input v-model="exp.endDate" type="date" 
                     class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300" />
            </div>
          </div>
          <textarea v-model="exp.description" placeholder="Descrição das atividades" 
                    class="border border-gray-600 rounded-lg p-3 bg-gray-800/50 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 h-24 resize-y" required></textarea>
          <button @click.prevent="removeExperience(index)"
            class="absolute top-2 right-2 bg-red-600 text-white rounded-full h-8 w-8 flex items-center justify-center text-lg font-bold hover:bg-red-700 transition-colors duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-500">
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
        <button @click.prevent="addExperience" 
          class="button-add mt-6 group flex items-center justify-center py-3 px-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 relative overflow-hidden"
        >
          <span class="absolute right-0 top-0 h-full w-10 bg-white/20 transform translate-x-full group-hover:-translate-x-32 transition-transform duration-500 ease-in-out skew-x-12"></span>
          <PlusIcon class="h-5 w-5 mr-2" />
          Adicionar Experiência
        </button>
      </fieldset>

      <button type="submit" 
        class="group flex items-center justify-center w-full py-4 px-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-700 text-white text-xl font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-green-500 transition-all duration-400 ease-in-out transform hover:-translate-y-2 hover:scale-105 active:scale-95 relative overflow-hidden mt-6"
      >
        <span class="absolute right-0 top-0 h-full w-16 bg-white/20 transform translate-x-full group-hover:-translate-x-60 transition-transform duration-500 ease-in-out skew-x-12"></span>
        <CloudArrowUpIcon class="h-7 w-7 mr-3" />
        Salvar Currículo
      </button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import { PlusIcon, XMarkIcon, CloudArrowUpIcon } from '@heroicons/vue/24/solid';


const initialFormData = {
  personalData: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: ''
  },
  summary: '',
  experiences: [],
  education: [],
  skills: [],
};

export default {
  components: {
    PlusIcon,
    XMarkIcon,
    CloudArrowUpIcon
  },
  props: {
    existingData: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formData: this.existingData ? JSON.parse(JSON.stringify(this.existingData)) : JSON.parse(JSON.stringify(initialFormData)),
    };
  },
  methods: {
    addExperience() {
      this.formData.experiences.push({ jobTitle: '', company: '', startDate: null, endDate: null, description: '' });
    },
    removeExperience(index) {
      this.formData.experiences.splice(index, 1);
    },
    async handleSubmit() {
      try {
        const token = localStorage.getItem('token');
        await axios.post('/api/curriculum', this.formData, { 
          headers: { 'Authorization': `Bearer ${token}` }
        });
        alert('Currículo salvo com sucesso!');
        this.$emit('saved');
      } catch (error) {
        console.error('Erro ao salvar o currículo:', error);
        alert('Ocorreu um erro ao salvar seu currículo.');
      }
    }
  }
};
</script>

<style>

.shadow-inner-lg {
  box-shadow: inset 0 2px 8px -2px rgba(0, 0, 0, 0.4);
}


@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scale-in {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}


.animate-fade-in-down { animation: fade-in-down 0.8s ease-out forwards; }
.animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
.animate-fade-in-up.animation-delay-100 { animation-delay: 0.1s; }
.animate-fade-in-up.animation-delay-200 { animation-delay: 0.2s; }
.animate-fade-in-up.animation-delay-300 { animation-delay: 0.3s; }

.animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
.animate-scale-in { animation: scale-in 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; }


.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>