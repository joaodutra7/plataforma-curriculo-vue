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

import jsPDF from 'jspdf';

export default {
  props: {
    curriculum: {
      type: Object,
      required: true,
    },
  },
  methods: {
     async sendPDFByEmail(pdfDataURI) {
  try {
    const token = localStorage.getItem('token');

    await axios.post('http://localhost:3001/api/send-pdf-email', {
      pdfData: pdfDataURI,
      fileName: `curriculo_${this.curriculum.personalData.fullName.replace(/\s+/g, '_')}.pdf`,
      recipient: this.curriculum.personalData.email // ou outro e-mail desejado
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    alert('Currículo enviado por e-mail com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    alert('Erro ao enviar currículo por e-mail.');
  }
},
    // Função para formatar a data para o padrão brasileiro
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      // Adiciona a opção timeZone para corrigir possíveis problemas de fuso horário (pega o dia certo)
      return new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
    },

     exportToPDF() {
      const doc = new jsPDF('p', 'pt', 'a4'); // Usando pontos (pt) como unidade
      const margin = 40;
      const pageWidth = doc.internal.pageSize.getWidth();
      const usableWidth = pageWidth - (margin * 2);
      let y = margin; // Nosso "cursor" vertical

      // --- Cabeçalho ---
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text(this.curriculum.personalData.fullName, pageWidth / 2, y, { align: 'center' });
      y += 20;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      const contactInfo = `${this.curriculum.personalData.email} | ${this.curriculum.personalData.phone}`;
      doc.text(contactInfo, pageWidth / 2, y, { align: 'center' });
      y += 30;

      // --- Resumo Profissional ---
      if (this.curriculum.summary) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Resumo Profissional', margin, y);
        y += 15;
        doc.line(margin, y, pageWidth - margin, y); // Linha horizontal
        y += 15;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        // jsPDF não quebra linhas automaticamente. Precisamos fazer isso manualmente.
        const summaryLines = doc.splitTextToSize(this.curriculum.summary, usableWidth);
        doc.text(summaryLines, margin, y);
        y += (summaryLines.length * 12) + 20; // Aumenta o 'y' baseado no número de linhas
      }

      // --- Experiência Profissional ---
      if (this.curriculum.experiences && this.curriculum.experiences.length) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('Experiência Profissional', margin, y);
        y += 15;
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        this.curriculum.experiences.forEach(exp => {
          // Controle de quebra de página
          if (y > doc.internal.pageSize.getHeight() - 100) { // Se estiver perto do fim da página
            doc.addPage();
            y = margin; // Reseta o cursor para o topo da nova página
          }
          
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.text(exp.jobTitle, margin, y);
          y += 14;

          doc.setFontSize(11);
          doc.setFont('helvetica', 'italic');
          doc.text(`${exp.company} | ${this.formatDate(exp.startDate)} - ${exp.endDate ? this.formatDate(exp.endDate) : 'Presente'}`, margin, y);
          y += 14;

          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          const expLines = doc.splitTextToSize(exp.description, usableWidth);
          doc.text(expLines, margin, y);
          y += (expLines.length * 12) + 20;
        });
      }

      const pdfOutput = doc.output('datauristring');

      // Agora envia o PDF para o backend
        this.sendPDFByEmail(pdfOutput);

    }
    
  }
};
</script>