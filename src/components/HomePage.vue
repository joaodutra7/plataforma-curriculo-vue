<template>
  <div class="flex flex-col items-center justify-center h-full w-full relative z-10 p-4">
    
    <div class="w-full max-w-5xl mx-auto flex flex-col justify-center items-center relative p-8 md:p-12 animate-fade-in">
      
      <div class="w-full text-center mb-16 animate-fade-in-down">
        <h1 class="text-5xl md:text-6xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          Bem-vindo ao Sistema
        </h1>
        <p class="mt-6 text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
          Explore nossos recursos navegando pelo menu abaixo.
        </p>
      </div>

      <div class="flex flex-col sm:flex-row gap-8 w-full max-w-lg animate-fade-in-up">
        
        <router-link
          to="/about"
          class="group flex-1 flex items-center justify-center py-5 px-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xl font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-400 ease-in-out transform hover:-translate-y-2 hover:scale-105 active:scale-95 relative overflow-hidden"
        >
          <span class="absolute right-0 top-0 h-full w-12 bg-white/20 transform translate-x-full group-hover:-translate-x-40 transition-transform duration-500 ease-in-out skew-x-12"></span>
          <InformationCircleIcon class="h-8 w-8 mr-4 transition-transform duration-300 group-hover:rotate-[30deg] transform-gpu" />
          Sobre Nós
        </router-link>
        
        <router-link
          to="/register"
          class="group flex-1 flex items-center justify-center py-5 px-8 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-xl font-bold shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-400 ease-in-out transform hover:-translate-y-2 hover:scale-105 active:scale-95 relative overflow-hidden"
        >
          <span class="absolute left-0 top-0 h-full w-12 bg-white/20 transform -translate-x-full group-hover:translate-x-40 transition-transform duration-500 ease-in-out -skew-x-12"></span>
          <UserPlusIcon class="h-8 w-8 mr-4 transition-transform duration-300 group-hover:scale-125 transform-gpu" />
          Criar Conta
        </router-link>
      </div>

    </div>

    </div>
</template>

<script setup>
import { InformationCircleIcon, UserPlusIcon } from '@heroicons/vue/24/solid';
</script>

<style>

@keyframes fade-in-down {
  from {
    opacity: 0;
    transform: translateY(-40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(40px);
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


.animate-fade-in-down {
  animation: fade-in-down 1s ease-out forwards;
}

.animate-fade-in-up {
  animation: fade-in-up 1s ease-out 0.4s forwards; 
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}


.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>