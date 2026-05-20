package si.unm.fis.prspr.mb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import si.unm.fis.prspr.mb.entity.Genre;
import si.unm.fis.prspr.mb.repository.GenreRepository;

@Service
public class GenreService {

    private final GenreRepository genreRepository;

    public GenreService(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    public Genre createGenre(Genre genre) {
        return genreRepository.save(genre);
    }

    public List<Genre> getAllGenres() {
        return genreRepository.findAll();
    }

    public Genre getGenreById(int id) {
        return genreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zvrst z ID " + id + " ne obstaja."));
    }

    public Genre updateGenre(int id, Genre genre) {
        Genre existing = genreRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Zvrst z ID " + id + " ne obstaja."));
        existing.setName(genre.getName());
        return genreRepository.save(existing);
    }

    public void deleteGenre(int id) {
        genreRepository.deleteById(id);
    }
}
