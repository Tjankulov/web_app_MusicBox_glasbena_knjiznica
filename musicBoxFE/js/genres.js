import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      genres: [],
      formGenre: {
        id: null,
        name: ''
      }
    };
  },
  created() {
    this.loadGenres();
  },
  methods: {
    // vrne seznam zvrsti
    loadGenres() {
      axios.get("http://localhost:8080/genres/getAll")
        .then((response) => {
          this.genres = response.data;
        })
        .catch((error) => console.error(error));
    },
    deleteGenre(id) {
      axios.delete("http://localhost:8080/genres/delete/"+id)
        .then((response) => {
          this.loadGenres();
          this.cleanForm();
        })
        .catch((error) => console.error(error));
    },
    // za formular, kjer uporabnik vnese podatke za novo zvrst
    postGenre() {
      axios.post("http://localhost:8080/genres/create", this.formGenre)
        .then((response) => {
          this.loadGenres();
          this.cleanForm();
        })
        .catch((error) => console.error(error));
    },
    // s klikom na polje v tabeli, se izpolni tudi formular z enakimi podatki, ki ga lahko spremenimo
    populateForm(genre) {
      this.formGenre.id = genre.id;
      this.formGenre.name = genre.name;
    },
    // funkcija počisti obrazec, dodali smo ga k funkciji PostGenre, da se obrazec počisti, potem ko se shrani nova zvrst
    cleanForm() {
      this.formGenre.id = null;
      this.formGenre.name = '';
    }
  }
}).mount('#genres');

