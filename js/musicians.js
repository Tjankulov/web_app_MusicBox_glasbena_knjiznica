import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const API = "https://web-app-musicbox-glasbena-knjiznica-1.onrender.com";

createApp({

  data() {
    return {
      genres: [],
      musicians: [],

      currentPage: 0,
      totalPages: 0,
      pageSize: 10,

      formMusician: {
        id: null,
        name: '',
        genre: null
      }
    }
  },

  created() {
    this.loadGenres();

    const params = new URLSearchParams(window.location.search);
    const genre = params.get("genre");

    if (genre) {
      this.loadMusiciansByGenre(genre);
    } else {
      this.loadMusicians();
    }
  },

  methods: {

    // Naloži vse glasbenike (paginacija)
    loadMusicians(page = 0) {
      axios
        .get(`${API}/musicians?page=${page}&size=${this.pageSize}`)
        .then((response) => {
          this.musicians = response.data.content;
          this.currentPage = response.data.number;
          this.totalPages = response.data.totalPages;
        })
        .catch(console.error);
    },

    // Naloži zvrsti
    loadGenres() {
      axios
        .get(`${API}/genres`)
        .then((response) => {
          this.genres = response.data;
        })
        .catch(console.error);
    },

    // Iskanje glasbenikov po zvrsti iz URL-ja
    loadMusiciansByGenre(genre) {
      if (genre.trim() === '') {
        this.loadMusicians(0);
        return;
      }
      axios.get(`${API}/musicians/byGenre/${encodeURIComponent(genre.trim())}`)
        .then((response) => {
          this.musicians = response.data;
          this.currentPage = 0;
          this.totalPages = 1;
        })
        .catch(console.error);
    },

    // Dodaj ali posodobi glasbenika
    postMusician() {
      axios
        .post(`${API}/musicians`, this.formMusician)
        .then(() => {
          this.loadMusicians(this.currentPage);
          this.cleanForm();
        })
        .catch(console.error);
    },

    // Briši glasbenika
    deleteMusician(id) {
      axios
        .delete(`${API}/musicians/${id}`)
        .then(() => {
          this.loadMusicians(this.currentPage);
        })
        .catch(console.error);
    },

    // Izpolni obrazec za spremembo
    populateForm(musician) {
      this.formMusician = {
        id: musician.id,
        name: musician.name,
        genre: musician.genre
      };
    },

    // Počisti obrazec
    cleanForm() {
      this.formMusician = {
        id: null,
        name: '',
        genre: null
      };
    },

    // Naslednja stran
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.loadMusicians(this.currentPage + 1);
      }
    },

    // Prejšnja stran
    previousPage() {
      if (this.currentPage > 0) {
        this.loadMusicians(this.currentPage - 1);
      }
    }
  }

}).mount('#musicians');
