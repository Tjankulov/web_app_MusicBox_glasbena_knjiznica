import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

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
        genre: {
          name: '',
        }
      },
      options: []
    }
  },
  created() {
    this.loadMusicians();
    this.loadGenres();
    this.loadMusiciansByGenre();
  },
  methods: {
    // vrne seznam glasbenikov (plus paginacija)
    loadMusicians(page = 0) {
      axios.get("https://web-app-musicbox-glasbena-knjiznica-1.onrender.com/musicians?page=" + page + "&size=" + this.pageSize)
        .then((response) => {
          this.musicians = response.data.content;
          this.currentPage = response.data.number;
          this.totalPages = response.data.totalPages;
        })
        .catch((error) => console.error(error));
    },
    loadGenres() {
      axios.get("http://localhost:8080/genres/getAll")
        .then((response) => {
          this.genres = response.data;
        })
        .catch((error) => console.error(error));
    },
    loadMusiciansByGenre() {
      axios.get("http://localhost:8080/musicians/byGenre/" + this.inputGenre)
        .then((response) => {
          this.musicians = response.data;
        })
        .catch((error) => console.error(error));
    },
    // za formular, kjer uporabnik vnese podatke za novega glasbenika
    postMusician() {
      axios.post("http://localhost:8080/musicians/create", this.formMusician)
        .then((response) => {
          this.loadMusicians();
          this.formMusician.name = '';
          this.formMusician.genre = null;
        })
        .catch((error) => console.error(error));
    },
    deleteMusician(id) {
      axios.delete("http://localhost:8080/musicians/delete/" + id)
        .then((response) => {
          this.loadMusicians();
        })
        .catch((error) => console.error(error));
    },
    // s klikom na polje v tabeli, se izpolni tudi formular z enakimi podatki, ki ga lahko spremenimo
    populateForm(musician) {
      this.formMusician.id = musician.id;
      this.formMusician.name = musician.name;
      this.formMusician.genre = musician.genre;
    },
    // funkcija počisti obrazec, dodali smo ga k funkciji PostMusician, da se obrazec počisti, potem ko se shrani nov glasbenik
    cleanForm() {
      this.formMusician.id = null;
      this.formMusician.name = '';
      this.formMusician.genre = '';

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
    },
  }
}).mount('#musicians');
