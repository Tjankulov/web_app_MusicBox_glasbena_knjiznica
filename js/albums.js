import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const API = "https://web-app-musicbox-glasbena-knjiznica-1.onrender.com";

createApp({
    data() {
        return {
            genres: [],
            musicians: [],
            albums: [],

            currentPage: 0,
            totalPages: 0,
            pageSize: 10,

            formAlbum: {
                id: null,
                name: '',
                genre: null,
                musician: null
            }
        }
    },

    created() {
        this.loadAlbums();
        this.loadGenres();
        this.loadMusicians();
    },

    methods: {

        loadAlbums(page = 0) {
            axios.get(`${API}/albums?page=${page}&size=${this.pageSize}`)
                .then((response) => {

                    if (response.data.content) {
                        this.albums = response.data.content;
                        this.currentPage = response.data.number;
                        this.totalPages = response.data.totalPages;

                    } else {
                        this.albums = response.data;
                        this.currentPage = 0;
                        this.totalPages = 1;
                    }

        })
        .catch(console.error);
},
        loadMusicians() {
            axios.get(`${API}/musicians?page=0&size=100`)
                .then((response) => {
                    this.musicians = response.data.content;
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

        postAlbum() {
            axios.post(`${API}/albums`, this.formAlbum)
                .then(() => {
                    this.loadAlbums(this.currentPage);
                    this.cleanForm();
                })
                .catch(console.error);
        },

        deleteAlbum(id) {
            axios.delete(`${API}/albums/${id}`)
                .then(() => {
                    this.loadAlbums(this.currentPage);
                })
                .catch(console.error);
        },

        populateForm(album) {
            this.formAlbum = {
                id: album.id,
                name: album.name,
                genre: album.genre,
                musician: album.musician
            };
        },

        cleanForm() {
            this.formAlbum = {
                id: null,
                name: '',
                genre: null,
                musician: null
            };
        },

        nextPage() {
            if (this.currentPage < this.totalPages - 1) {
                this.loadAlbums(this.currentPage + 1);
            }
        },

        previousPage() {
            if (this.currentPage > 0) {
                this.loadAlbums(this.currentPage - 1);
            }
        }
    }

}).mount('#albums');
