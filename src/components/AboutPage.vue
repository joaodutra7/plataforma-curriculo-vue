<template>
  <div class="flex flex-col items-center justify-center h-full w-full relative z-10 p-4 animate-fade-in">
    
    <div class="bg-gray-900/40 backdrop-blur-lg rounded-xl shadow-2xl p-8 md:p-12 max-w-2xl w-full border border-gray-700 transform hover:scale-[1.01] transition-all duration-500 ease-in-out animate-scale-in">
      
      <div class="text-center mb-8">
        <h1 class="text-4xl md:text-5xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-fade-in-down">
          Sobre Nós
        </h1>
        <p class="text-lg text-gray-300 leading-relaxed animate-fade-in-up">
          Este sistema foi desenvolvido para facilitar o cadastro e a gestão de usuários de forma simples e eficiente.
          <br>
          Se quiser saber mais ou enviar sugestões, utilize o formulário abaixo.
        </p>
      </div>

      <form @submit.prevent="sendMessage" class="flex flex-col gap-6 animate-fade-in-up animation-delay-300">
        <label for="message-input" class="font-semibold text-lg text-gray-200">Envie sua mensagem:</label>
        <textarea
          id="message-input"
          v-model="message"
          placeholder="Escreva sua mensagem aqui..."
          class="border border-gray-600 rounded-lg p-4 bg-gray-800 text-white resize-y h-32 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 transition-all duration-300"
        ></textarea>
        <button
          type="submit"
          class="group flex items-center justify-center w-full py-4 px-6 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-xl font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-400 ease-in-out transform hover:-translate-y-1 hover:scale-105 active:scale-95 relative overflow-hidden"
        >
          <span class="absolute right-0 top-0 h-full w-12 bg-white/20 transform translate-x-full group-hover:-translate-x-40 transition-transform duration-500 ease-in-out skew-x-12"></span>
          Enviar Mensagem
          <PaperAirplaneIcon class="h-6 w-6 ml-3 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </form>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import { PaperAirplaneIcon } from '@heroicons/vue/24/solid'; 

export default {
  components: {
    PaperAirplaneIcon 
  },
  data() {
    return {
      message: "",
    };
  },
  methods: {
    async sendMessage() {
      if (!this.message.trim()) {
        alert("Por favor, digite uma mensagem antes de enviar.");
        return;
      }
      try {
        await axios.post("/api/messages", { message: this.message }); 
        this.message = "";
        alert("Mensagem enviada com sucesso! Agradecemos seu feedback.");
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
        alert("Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.");
      }
    },
  },
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


.animate-fade-in-down {
  animation: fade-in-down 0.8s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out 0.2s forwards;
}

.animate-fade-in-up.animation-delay-300 { 
  animation-delay: 0.3s;
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
}


.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>