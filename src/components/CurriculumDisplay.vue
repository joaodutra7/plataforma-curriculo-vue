<template>
  <div ref="exportableContent" class="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto my-8">
    
    <div class="text-right mb-4">
      <button @click="exportToPDF" class="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 text-sm">
        Exportar para PDF
      </button>
    </div>

    <header class="text-center mb-8 border-b pb-6">
      <h1 class="text-4xl font-bold text-gray-800">{{ curriculum.personalData.fullName }}</h1>
      <div class="flex justify-center gap-6 mt-4 text-gray-600">
        <span>{{ curriculum.personalData.email }}</span>
        <span>{{ curriculum.personalData.phone }}</span>
        <a v-if="curriculum.personalData.linkedin" :href="curriculum.personalData.linkedin" target="_blank" class="text-blue-600 hover:underline">LinkedIn</a>
      </div>
    </header>

    <section v-if="curriculum.summary" class="mb-8">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Resumo Profissional</h2>
      <p class="text-gray-700 whitespace-pre-wrap">{{ curriculum.summary }}</p>
    </section>

    <section v-if="curriculum.experiences && curriculum.experiences.length" class="mb-8">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Experiência Profissional</h2>
      <div v-for="exp in curriculum.experiences" :key="exp._id" class="mb-6">
        <h3 class="text-xl font-bold text-gray-800">{{ exp.jobTitle }}</h3>
        <p class="text-lg text-gray-600">{{ exp.company }}</p>
        <p class="text-sm text-gray-500 mb-2">
          {{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : 'Presente' }}
        </p>
        <p class="text-gray-700 whitespace-pre-wrap">{{ exp.description }}</p>
      </div>
    </section>

    <section v-if="curriculum.education && curriculum.education.length" class="mb-8">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Formação Acadêmica</h2>
      <div v-for="edu in curriculum.education" :key="edu._id" class="mb-4">
        <h3 class="text-xl font-bold text-gray-800">{{ edu.degree }}</h3>
        <p class="text-lg text-gray-600">{{ edu.institution }}</p>
        <p class="text-sm text-gray-500">
          {{ edu.fieldOfStudy }} | {{ formatDate(edu.startDate) }} - {{ edu.endDate ? formatDate(edu.endDate) : 'Concluído' }}
        </p>
      </div>
    </section>

    <section v-if="curriculum.skills && curriculum.skills.length">
      <h2 class="text-2xl font-semibold border-b-2 border-gray-300 pb-2 mb-4">Habilidades</h2>
      <div class="flex flex-wrap gap-2">
        <span v-for="skill in curriculum.skills" :key="skill" class="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {{ skill }}
        </span>
      </div>
    </section>

  </div>
</template>

<script>

import html2pdf from 'html2pdf.js';

export default {
  props: {
    curriculum: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Função para formatar a data para o padrão brasileiro
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      // Adiciona a opção timeZone para corrigir possíveis problemas de fuso horário (pega o dia certo)
      return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
    },

    exportToPDF() {
      const element = this.$refs.exportableContent; 

      const options = {
        margin:       0.5,
        filename:     `curriculo_${this.curriculum.personalData.fullName.replace(/\s+/g, '_')}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(options).from(element).save();
    }
  }
};
</script>