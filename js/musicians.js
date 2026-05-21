import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const API = "https://web-app-musicbox-glasbena-knjiznica-1.onrender.com";

createApp({
  data() {
    return {
      genres: [],
      inputGenre: '',
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
    this.loadMusicians();
    this.loadGenres();
  },

  methods: {

    loadMusicians(page = 0) {
      axios.get(`${API}/musicians?page=${page}&size=${this.pageSize}`)
        .then((response) => {
          this.musicians = response.data.content;
          this.currentPage = response.data.number;
          this.totalPages = response.data.totalPages;
        })
        .catch(console.error);
    },

    loadGenres() {
      axios.get(`${API}/genres`)
        .then((response) => {
          this.genres = response.data;
        })
        .catch(console.error);
    },

    loadMusiciansByGenre() {
      axios.get(`${API}/musicians/byGenre/${this.inputGenre}`)
        .then((response) => {
          this.musicians = response.data;
        })
        .catch(console.error);
    },

    postMusician() {
      axios.post(`${API}/musicians`, this.formMusician)
        .then(() => {
          this.loadMusicians(this.currentPage);
          this.cleanForm();
        })
        .catch(console.error);
    },

    deleteMusician(id) {
      axios.delete(`${API}/musicians/${id}`)
        .then(() => {
          this.loadMusicians(this.currentPage);
        })
        .catch(console.error);
    },

    populateForm(musician) {
      this.formMusician = {
        id: musician.id,
        name: musician.name,
        genre: musician.genre
      };
    },

    cleanForm() {
      this.formMusician = {
        id: null,
        name: '',
        genre: null
      };
    },

    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.loadMusicians(this.currentPage + 1);
      }
    },

    previousPage() {
      if (this.currentPage > 0) {
        this.loadMusicians(this.currentPage - 1);
      }
    }
  }

}).mount('#musicians');
