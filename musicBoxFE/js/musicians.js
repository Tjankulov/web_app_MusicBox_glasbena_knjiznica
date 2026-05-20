import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
  data() {
    return {
      genres: [],
      inputGenre: '',
      musicians: [],
      formMusician: {
        id: null,
        name: '',
        genre: {
          name: '',
        }
      },
      options: [],
    }
  },
  created() {
    this.loadGenres();

    const genre =
      new URLSearchParams(window.location.search)
      .get('genre');

    if (genre) {
      this.inputGenre = genre;
      this.loadMusiciansByGenre();
    } else {
      this.loadMusicians();
    }
  },
  methods: {
    // vrne seznam glasbenikov
    loadMusicians() {
      axios.get("http://localhost:8080/musicians")
        // arrow notation: response, ki mi ga vrne axios.get, mi omogoča da preberem podatke, ki me zanimajo (response.data) in jih vrnem v lokalno spremenljivko 'musicians' (kot bi mi napisali notri)
        .then((response) => {
          this.musicians = response.data;
        })
        .catch((error) => console.error(error));
    },
    loadGenres() {
      axios.get("http://localhost:8080/genres")
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
      if (this.formMusician.id) {
        axios.put("http://localhost:8080/musicians/" + this.formMusician.id, this.formMusician)
          .then((response) => {
            this.loadMusicians();
            this.cleanForm();
          })
          .catch((error) => console.error(error));
      } else {
        axios.post("http://localhost:8080/musicians", this.formMusician)
          .then((response) => {
            this.loadMusicians();
            this.cleanForm();
          })
          .catch((error) => console.error(error));
      }
    },
    deleteMusician(id) {
      axios.delete("http://localhost:8080/musicians/" + id)
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
    }
  }
}).mount('#musicians');
