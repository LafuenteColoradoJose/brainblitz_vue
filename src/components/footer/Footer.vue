<template>
<footer
    id="Contact"
    class="flex flex-col items-center justify-between tex-[#EAF2E3] bg-[#35AFAE] w-screen h-16 px-4 py-2  md:flex-row md:justify-evenly"
  >
    <div class="opacity-60 text-center text-xs">
      <a
        href="https://www.joselafuente.dev/"
        target="_blank"
      >
        <p>© 2023 José Lafuente <span>- Developer Web</span></p>
      </a>
    </div>
    <div class="flex flex-row justify-between items-center lg:mx-10">
      <span class="footer-title mx-5">Contacta:</span>
      <div class="flex flex-row gap-4">
        <a
          href="mailto:joselafuente77@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <article>
            <img
              src="/img/icons/email-svgrepo-com.svg"
              alt="logo email"
              class="logo"
            >
          </article>
        </a>
        <a
          href="https://www.linkedin.com/in/JoseLafuenteColorado"
          target="_blank"
          rel="noopener noreferrer"
        >
          <article>
            <img
              src="/img/icons/linkedin-icon-logo-svgrepo-com.svg"
              alt="logo Linkedin"
              class="logo"
            >
          </article>
        </a>
        <a
          href="https://github.com/LafuenteColoradoJose"
          target="_blank"
          rel="noopener noreferrer"
        >
          <article>
            <img
              src="/img/icons/github.svg"
              alt="logo GitHub"
              class="logo"
            >
          </article>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.logo {
    width: 20px;
    height: auto;
}

</style>
