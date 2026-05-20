import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

createApp({
    data() {
        return {
            genres: [],
            musicians: [],
            albums: [],
            formAlbum: {
                id: null,
                name: '',
                genre: {
                    name: '',
                },
                musician: {
                    name: ''
                }
            },
            options: []
        }
    },
    created() {
        this.loadMusicians();
        this.loadGenres();
        this.loadAlbums();
    },
    methods: {
        // vrne seznam glasbenikov
        loadAlbums() {
            axios.get("http://localhost:8080/albums/getAll")
                .then((response) => {
                    this.albums = response.data;
                })
                .catch((error) => console.error(error));
        },
        loadMusicians() {
            axios.get("http://localhost:8080/musicians/getAll")
                // arrow notation: response, ki mi ga vrne axios.get, mi omogoča da preberem podatke, ki me zanimajo (response.data) in jih vrnem v lokalno spremenljivko 'musicians' (kot bi mi napisali notri)
                .then((response) => {
                    this.musicians = response.data;
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
        // za formular, kjer uporabnik vnese podatke za nov album
        postAlbum() {
            axios.post("http://localhost:8080/albums/create", this.formAlbum)
                .then((response) => {
                    this.loadAlbums();
                    this.formMusician.name = '';
                    this.formMusician.genre = null;
                    this.formMusician.musician = null;
                })
                .catch((error) => console.error(error));
        },
        deleteAlbum(id) {
            axios.delete("http://localhost:8080/albums/delete/" + id)
                .then((response) => {
                    this.loadAlbums();
                })
                .catch((error) => console.error(error));
        },
        // s klikom na polje v tabeli, se izpolni tudi formular z enakimi podatki, ki ga lahko spremenimo
        populateForm(album) {
            this.formAlbum.id = album.id;
            this.formAlbum.name = album.name;
            this.formAlbum.genre = album.genre;
            this.formAlbum.musician = album.musician;
        },
        // funkcija počisti obrazec, dodali smo ga k funkciji PostAlbum, da se obrazec počisti, potem ko se shrani nov glasbenik
        cleanForm() {
            this.formAlbum.id = null;
            this.formAlbum.name = '';
            this.formAlbum.genre = '';

        }
    }
}).mount('#albums');