<template>
  <div class="flex flex-col items-center justify-center h-full w-full relative z-10 p-4 animate-fade-in">
    
    <div class="bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-2xl p-8 md:p-12 max-w-4xl w-full border border-gray-700 transform hover:scale-[1.005] transition-all duration-500 ease-in-out animate-scale-in">
      
      <div class="text-right mb-8 flex justify-end gap-4 animate-fade-in-down">
        <button 
          @click="exportToPDF" 
          class="group flex items-center justify-center py-3 px-6 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-md font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 relative overflow-hidden"
        >
          <span class="absolute right-0 top-0 h-full w-12 bg-white/20 transform translate-x-full group-hover:-translate-x-40 transition-transform duration-500 ease-in-out skew-x-12"></span>
          <ArrowDownTrayIcon class="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
          Exportar para PDF
        </button>
        <button 
          @click="sendPDFByEmail" 
          class="group flex items-center justify-center py-3 px-6 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-md font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 relative overflow-hidden"
        >
          <span class="absolute right-0 top-0 h-full w-12 bg-white/20 transform translate-x-full group-hover:-translate-x-40 transition-transform duration-500 ease-in-out skew-x-12"></span>
          <EnvelopeIcon class="h-5 w-5 mr-2 transition-transform duration-300 group-hover:scale-110" />
          Enviar por E-mail
        </button>
      </div>

      <header class="text-center mb-8 border-b border-gray-700 pb-6 animate-fade-in-up">
        <h1 class="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          {{ curriculum.personalData.fullName }}
        </h1>
        <div class="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-4 text-gray-300 text-lg">
          <span class="flex items-center gap-1"><EnvelopeIcon class="h-5 w-5 text-gray-500" />{{ curriculum.personalData.email }}</span>
          <span class="flex items-center gap-1"><PhoneIcon class="h-5 w-5 text-gray-500" />{{ curriculum.personalData.phone }}</span>
          <a v-if="curriculum.personalData.linkedin" :href="curriculum.personalData.linkedin" target="_blank" class="text-blue-400 hover:underline flex items-center gap-1 transition-colors duration-300 hover:text-blue-300">
            <LinkIcon class="h-5 w-5" /> LinkedIn
          </a>
        </div>
      </header>

      <section v-if="curriculum.summary" class="mb-8 animate-fade-in-up animation-delay-100">
        <h2 class="text-2xl font-semibold border-b-2 border-pink-500 pb-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">Resumo Profissional</h2>
        <p class="text-gray-300 leading-relaxed whitespace-pre-wrap">{{ curriculum.summary }}</p>
      </section>

      <section v-if="curriculum.experiences && curriculum.experiences.length" class="mb-8 animate-fade-in-up animation-delay-200">
        <h2 class="text-2xl font-semibold border-b-2 border-teal-500 pb-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-500">Experiência Profissional</h2>
        <div v-for="exp in curriculum.experiences" :key="exp._id" class="mb-6 bg-gray-800/30 p-4 rounded-lg border border-gray-700 shadow-md transform hover:scale-[1.005] transition-all duration-300">
          <h3 class="text-xl font-bold text-white">{{ exp.jobTitle }}</h3>
          <p class="text-lg text-gray-400">{{ exp.company }}</p>
          <p class="text-sm text-gray-500 mb-2">
            {{ formatDate(exp.startDate) }} - {{ exp.endDate ? formatDate(exp.endDate) : 'Presente' }}
          </p>
          <p class="text-gray-300 whitespace-pre-wrap">{{ exp.description }}</p>
        </div>
      </section>

      <section v-if="curriculum.education && curriculum.education.length" class="mb-8 animate-fade-in-up animation-delay-300">
        <h2 class="text-2xl font-semibold border-b-2 border-purple-500 pb-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">Formação Acadêmica</h2>
        <div v-for="edu in curriculum.education" :key="edu._id" class="mb-4 bg-gray-800/30 p-4 rounded-lg border border-gray-700 shadow-md transform hover:scale-[1.005] transition-all duration-300">
          <h3 class="text-xl font-bold text-white">{{ edu.degree }}</h3>
          <p class="text-lg text-gray-400">{{ edu.institution }}</p>
          <p class="text-sm text-gray-500">
            {{ edu.fieldOfStudy }} | {{ formatDate(edu.startDate) }} - {{ edu.endDate ? formatDate(edu.endDate) : 'Concluído' }}
          </p>
        </div>
      </section>

      <section v-if="curriculum.skills && curriculum.skills.length" class="animate-fade-in-up animation-delay-400">
        <h2 class="text-2xl font-semibold border-b-2 border-blue-500 pb-2 mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Habilidades</h2>
        <div class="flex flex-wrap gap-3">
          <span v-for="skill in curriculum.skills" :key="skill" class="bg-blue-800/50 text-blue-300 text-base font-medium px-4 py-2 rounded-full border border-blue-700 shadow-sm transform hover:scale-105 transition-transform duration-200">
            {{ skill }}
          </span>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf';
import axios from 'axios';
import { ArrowDownTrayIcon, EnvelopeIcon, PhoneIcon, LinkIcon } from '@heroicons/vue/24/solid'; 

export default {
  components: {
    ArrowDownTrayIcon,
    EnvelopeIcon,
    PhoneIcon,
    LinkIcon
  },
  props: {
    curriculum: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      
      return new Intl.DateTimeFormat('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' }).format(date);
    },

    generatePdfDocument() {
      const doc = new jsPDF('p', 'pt', 'a4');
      const margin = 40;
      const pageWidth = doc.internal.pageSize.getWidth();
      const usableWidth = pageWidth - (margin * 2);
      let y = margin;

      
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(50, 50, 50); 
      doc.text(this.curriculum.personalData.fullName, pageWidth / 2, y, { align: 'center' });
      y += 20;

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100); 
      const contactInfo = `${this.curriculum.personalData.email} | ${this.curriculum.personalData.phone}`;
      doc.text(contactInfo, pageWidth / 2, y, { align: 'center' });
      y += 30;

      
      if (this.curriculum.summary) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 50, 50); 
        doc.text('Resumo Profissional', margin, y);
        y += 15;
        doc.setDrawColor(200, 200, 200); 
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(70, 70, 70); 
        const summaryLines = doc.splitTextToSize(this.curriculum.summary, usableWidth);
        doc.text(summaryLines, margin, y);
        y += (summaryLines.length * 12) + 20;
      }

      
      if (this.curriculum.experiences && this.curriculum.experiences.length) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text('Experiência Profissional', margin, y);
        y += 15;
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        this.curriculum.experiences.forEach(exp => {
          if (y > doc.internal.pageSize.getHeight() - 100) {
            doc.addPage();
            y = margin;
          }
          
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(50, 50, 50);
          doc.text(exp.jobTitle, margin, y);
          y += 14;

          doc.setFontSize(11);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(100, 100, 100);
          doc.text(`${exp.company} | ${this.formatDate(exp.startDate)} - ${exp.endDate ? this.formatDate(exp.endDate) : 'Presente'}`, margin, y);
          y += 14;

          doc.setFontSize(11);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(70, 70, 70);
          const expLines = doc.splitTextToSize(exp.description, usableWidth);
          doc.text(expLines, margin, y);
          y += (expLines.length * 12) + 20;
        });
      }

      
      if (this.curriculum.education && this.curriculum.education.length) {
        if (y > doc.internal.pageSize.getHeight() - 100) {
            doc.addPage();
            y = margin;
        }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text('Formação Acadêmica', margin, y);
        y += 15;
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        this.curriculum.education.forEach(edu => {
          if (y > doc.internal.pageSize.getHeight() - 100) {
            doc.addPage();
            y = margin;
          }
          doc.setFontSize(12);
          doc.setFont('helvetica', 'bold');
          doc.setTextColor(50, 50, 50);
          doc.text(edu.degree, margin, y);
          y += 14;

          doc.setFontSize(11);
          doc.setFont('helvetica', 'italic');
          doc.setTextColor(100, 100, 100);
          doc.text(`${edu.institution} | ${edu.fieldOfStudy} | ${this.formatDate(edu.startDate)} - ${edu.endDate ? this.formatDate(edu.endDate) : 'Concluído'}`, margin, y);
          y += 14;
        });
        y += 10;
      }

      
      if (this.curriculum.skills && this.curriculum.skills.length) {
        if (y > doc.internal.pageSize.getHeight() - 100) {
            doc.addPage();
            y = margin;
        }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(50, 50, 50);
        doc.text('Habilidades', margin, y);
        y += 15;
        doc.setDrawColor(200, 200, 200);
        doc.line(margin, y, pageWidth - margin, y);
        y += 15;

        doc.setFontSize(11);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(70, 70, 70);
        const skillsText = this.curriculum.skills.join(', ');
        const skillsLines = doc.splitTextToSize(skillsText, usableWidth);
        doc.text(skillsLines, margin, y);
        y += (skillsLines.length * 12) + 20;
      }
      
      return doc;
    },

    exportToPDF() {
      const doc = this.generatePdfDocument();
      doc.save(`curriculo_${this.curriculum.personalData.fullName.replace(/\s+/g, '_')}.pdf`);
    },

    async sendPDFByEmail() {
      try {
        const doc = this.generatePdfDocument();
        const pdfBlob = doc.output('blob');

        const formData = new FormData();
        formData.append('pdf', pdfBlob, `curriculo_${this.curriculum.personalData.fullName.replace(/\s+/g, '_')}.pdf`);
        formData.append('recipientEmail', this.curriculum.personalData.email);
        formData.append('fullName', this.curriculum.personalData.fullName);

        alert('Preparando para enviar... Por favor, aguarde.'); 

        const response = await axios.post('/api/send-curriculum-email', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (response.status === 200) {
          alert('Currículo enviado para o seu e-mail com sucesso!');
        } else {
          alert('Ocorreu um erro ao enviar o currículo. Tente novamente.');
        }
      } catch (error) {
        console.error('Erro ao enviar o PDF por e-mail:', error);
        alert('Ocorreu um erro ao enviar o currículo. Verifique o console para mais detalhes.');
      }
    }
  }
};
</script>

<style>

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

.animate-fade-in-up.animation-delay-100 { animation-delay: 0.1s; }
.animate-fade-in-up.animation-delay-200 { animation-delay: 0.2s; }
.animate-fade-in-up.animation-delay-300 { animation-delay: 0.3s; }
.animate-fade-in-up.animation-delay-400 { animation-delay: 0.4s; }

</style>