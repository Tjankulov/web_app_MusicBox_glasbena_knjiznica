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
            axios.get("https://web-app-musicbox-glasbena-knjiznica-1.onrender.com/albums")
                .then((response) => {
                    this.albums = response.data;
                })
                .catch((error) => console.error(error));
        },
        loadMusicians() {
            axios.get("https://web-app-musicbox-glasbena-knjiznica-1.onrender.com/musicians")
                // arrow notation: response, ki mi ga vrne axios.get, mi omogoča da preberem podatke, ki me zanimajo (response.data) in jih vrnem v lokalno spremenljivko 'musicians' (kot bi mi napisali notri)
                .then((response) => {
                    this.musicians = response.data;
                })
                .catch((error) => console.error(error));
        },
        loadGenres() {
            axios.get("https://web-app-musicbox-glasbena-knjiznica-1.onrender.com/genres")
                .then((response) => {
                    this.genres = response.data;
                })
                .catch((error) => console.error(error));
        },
        // za formular, kjer uporabnik vnese podatke za nov album
        postAlbum() {
            if (this.formAlbum.id) {
                axios.put("https://web-app-musicbox-glasbena-knjiznica-1.onrender.com/albums/" + this.formAlbum.id, this.formAlbum)
                    .then((response) => {
                        this.loadAlbums();
                        this.cleanForm();
                    })
                    .catch((error) => console.error(error));
            } else {
                axios.post("https://web-app-musicbox-glasbena-knjiznica-1.onrender.com/albums", this.formAlbum)
                    .then((response) => {
                        this.loadAlbums();
                        this.cleanForm();
                    })
                    .catch((error) => console.error(error));
            }
        },
        deleteAlbum(id) {
            axios.delete("https://web-app-musicbox-glasbena-knjiznica-1.onrender.com/albums/" + id)
                .then((response) => {
                    this.loadAlbums();
                })
                .catch((error) => console.error(error));
        },
        // s klikom na polje v tabeli, se izpolni tudi formular z enakimi podatki, ki ga lahko spremenimo
        populateForm(album) {
            this.formAlbum.id = album.id;
            this.formAlbum.name = album.name;
            this.formAlbum.genre = this.genres.find(g => g.id === album.genre.id);
            this.formAlbum.musician = this.musicians.find(m => m.id === album.musician.id);
        },
        // funkcija počisti obrazec, dodali smo ga k funkciji PostAlbum, da se obrazec počisti, potem ko se shrani nov glasbenik
        cleanForm() {
            this.formAlbum.id = null;
            this.formAlbum.name = '';
            this.formAlbum.genre = '';
            this.formAlbum.musician = '';
        }
    }
}).mount('#albums');
