<template>
  <div class="min-h-screen flex flex-col bg-gray-950 text-white font-sans relative overflow-hidden">
    
    <div class="absolute inset-0 z-0 opacity-30">
      <div class="absolute w-[40vw] h-[40vw] bg-purple-600 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow left-1/4 top-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
      <div class="absolute w-[35vw] h-[35vw] bg-teal-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow animation-delay-2000 right-1/4 bottom-1/4 transform translate-x-1/2 translate-y-1/2"></div>
      <div class="absolute w-[50vw] h-[50vw] bg-pink-500 rounded-full mix-blend-screen filter blur-3xl animate-pulse-slow animation-delay-4000 left-1/2 bottom-1/2 transform -translate-x-1/2 translate-y-1/2"></div>
    </div>

    <nav class="bg-gray-900/80 backdrop-blur-md text-white p-4 flex justify-between items-center shadow-lg relative z-20 animate-fade-in-down-nav border-b border-gray-800">
      <div class="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 tracking-wide">Sistema Basico de cadastro</div>
      
      <button @click="toggleMenu" class="md:hidden p-2 rounded-full hover:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none"
          viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <ul
        :class="{'block': menuOpen, 'hidden': !menuOpen}"
        class="md:flex md:space-x-8 md:items-center md:block absolute md:relative top-full left-0 w-full md:w-auto bg-gray-900/90 md:bg-transparent shadow-lg md:shadow-none py-4 md:py-0 px-4 md:px-0 mt-2 md:mt-0 rounded-b-lg md:rounded-none transition-all duration-300 ease-in-out"
      >
        <li><router-link to="/" class="block py-3 md:py-0 text-lg text-gray-300 hover:text-white hover:bg-gray-800 md:hover:bg-transparent transition-all duration-300 rounded px-3 md:px-0 group relative overflow-hidden">
            Início
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </router-link></li>
        <li><router-link to="/about" class="block py-3 md:py-0 text-lg text-gray-300 hover:text-white hover:bg-gray-800 md:hover:bg-transparent transition-all duration-300 rounded px-3 md:px-0 group relative overflow-hidden">
            Sobre
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </router-link></li>
        <li><router-link to="/register" class="block py-3 md:py-0 text-lg text-gray-300 hover:text-white hover:bg-gray-800 md:hover:bg-transparent transition-all duration-300 rounded px-3 md:px-0 group relative overflow-hidden">
            Registrar-se
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </router-link></li>
        <li><router-link to="/curriculum" class="block py-3 md:py-0 text-lg text-gray-300 hover:text-white hover:bg-gray-800 md:hover:bg-transparent transition-all duration-300 rounded px-3 md:px-0 group relative overflow-hidden">
            Currículo
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </router-link></li>
        <li v-if="isAuthenticated">
          <router-link to="/profile" class="block py-3 md:py-0 text-lg text-gray-300 hover:text-white hover:bg-gray-800 md:hover:bg-transparent transition-all duration-300 rounded px-3 md:px-0 group relative overflow-hidden">
            Perfil
            <span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </router-link>
        </li>
        <li v-else>
          <button @click="goToLogin" class="block py-3 px-6 rounded-full bg-gradient-to-r from-teal-500 to-emerald-600 text-white text-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 relative overflow-hidden mt-4 md:mt-0">
            <span class="absolute right-0 top-0 h-full w-8 bg-white/20 transform translate-x-full group-hover:-translate-x-20 transition-transform duration-500 ease-in-out skew-x-12"></span>
            Login
          </button>
        </li>
        <li v-if="isAuthenticated">
          <button @click="logout" class="block py-3 px-6 rounded-full bg-gradient-to-r from-red-600 to-orange-500 text-white text-lg font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 relative overflow-hidden ml-0 md:ml-4 mt-4 md:mt-0">
            <span class="absolute right-0 top-0 h-full w-8 bg-white/20 transform translate-x-full group-hover:-translate-x-20 transition-transform duration-500 ease-in-out skew-x-12"></span>
            Sair
          </button>
        </li>
      </ul>
    </nav>

    <main class="flex-grow container mx-auto px-4 py-8 relative z-10">
      <router-view />
    </main>

    <footer class="bg-gray-900/80 backdrop-blur-md text-center py-6 text-gray-400 border-t border-gray-800 relative z-20 animate-fade-in-up-footer">
      &copy; 2025 Sistema Básico de Cadastro. Todos os direitos reservados.
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuOpen: false,
      isAuthenticated: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    goToLogin() {
      this.$router.push('/login');
    },
    logout() {
      localStorage.removeItem('token');
      this.updateAuth();
      this.$router.push('/');
    },
    updateAuth() {
      this.isAuthenticated = !!localStorage.getItem('token');
    }
  },
  mounted() {
    this.updateAuth();
  },
  watch: {
    $route() {
      this.updateAuth();
    }
  }
};
</script>

<style>
/* Keyframes para animações */
@keyframes fade-in-down-nav {
  from {
    opacity: 0;
    transform: translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fade-in-up-footer {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse-slow {
  0%, 100% {
    transform: scale(1) translate(-50%, -50%);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.05) translate(-50%, -50%);
    opacity: 0.5;
  }
}

/* Para as blobs no canto, garantindo que o translate(-50%,-50%) se aplica ao centro delas */
.animate-pulse-slow.left-1\/4.top-1\/4 {
  animation: pulse-slow 6s infinite ease-in-out;
}
.animate-pulse-slow.right-1\/4.bottom-1\/4 {
  animation: pulse-slow 6s infinite ease-in-out;
}
.animate-pulse-slow.left-1\/2.bottom-1\/2 {
  animation: pulse-slow 6s infinite ease-in-out;
}

/* Aplicação das animações */
.animate-fade-in-down-nav {
  animation: fade-in-down-nav 0.8s ease-out forwards;
}

.animate-fade-in-up-footer {
  animation: fade-in-up-footer 0.8s ease-out 0.2s forwards;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
.animation-delay-4000 {
  animation-delay: 4s;
}

/* Garante que o texto dos links seja o único a receber o background-clip */
.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
}
</style>