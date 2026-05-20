package si.unm.fis.prspr.mb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import si.unm.fis.prspr.mb.entity.Genre;
import si.unm.fis.prspr.mb.service.GenreService;

@RestController
@RequestMapping("/genres")
public class GenreController {
	@Autowired
	private GenreService genreService;
	
	// CREATE
	@PostMapping("/create")
    public Genre createGenre(@RequestBody Genre genre) {
		return genreService.createGenre(genre);
	}
		
	
	// GET mapping
	// ALL
	@GetMapping("/getAll")
	public List<Genre> getAllGenres() {
		return genreService.getAllGenres();
	}

	
	// PUT mapping
	// UPDATE
	@PutMapping("/update")
	public Genre updateMusician(@PathVariable Genre genre) {
		return genreService.updateGenre(genre);
	}
	
	
	// DELETE mapping
	@DeleteMapping("/delete/{id}")
	public String deleteGenre(@PathVariable int id) {
		return genreService.deleteGenre(id);
	}
}
