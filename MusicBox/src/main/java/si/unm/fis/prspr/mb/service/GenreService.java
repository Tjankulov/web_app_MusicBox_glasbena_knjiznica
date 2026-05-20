package si.unm.fis.prspr.mb.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import si.unm.fis.prspr.mb.entity.Genre;
import si.unm.fis.prspr.mb.repository.GenreRepository;


@Service
public class GenreService {
	// avtomatski dependancy injection
	@Autowired
	private GenreRepository genreRepository;
	
	// CRUD OPERACIJE
	
	// CREATE
	public Genre createGenre(Genre genre) {
		return genreRepository.save(genre);
    }


	
	// RETRIEVE
	// ALL
	public List<Genre> getAllGenres() {
		return genreRepository.findAll();
	}
	
	// BY ID
	public Genre getGenreById(int id) {
		Optional<Genre> Genre = genreRepository.findById(id);
		if(Genre.isPresent()) {
			return Genre.get();
		} else {
			// če ne najde, vrni null
			return null;
		}
	}
	
	
	// UPDATE
	public Genre updateGenre(Genre genre) {
		return genreRepository.save(genre);
	}
	
	
	// DELETE
	public String deleteGenre(int id) {
		genreRepository.deleteById(id);
		return "Zvrst je odstranjena.";
	}
}
