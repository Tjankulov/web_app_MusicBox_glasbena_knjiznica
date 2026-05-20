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

import si.unm.fis.prspr.mb.entity.Musician;
import si.unm.fis.prspr.mb.service.MusicianService;

@RestController
@RequestMapping("/musicians")
public class MusicianController {
	@Autowired
	private MusicianService musicianService;
	
	
	// POST mapping
	@PostMapping("/create")
	public Musician createMusician(@RequestBody Musician musician) {
		return musicianService.createMusician(musician);
	}
		
	
	// GET mapping
	// ALL
	@GetMapping("/getAll")
	public List<Musician> getAllMusicians() {
		return musicianService.getAllMusicians();
	}
	
	// BY GENRE NAME
	@GetMapping("/byGenre/{genreName}")
	public List<Musician> getMusiciansByGenre(@PathVariable String genreName) {
		return musicianService.getMusiciansByGenre(genreName);
	}
	
	// UPDATE 
	@PutMapping("/update")
	public Musician updateMusician(@PathVariable Musician musician) {
		return musicianService.updateMusician(musician);
	}

	
	// DELETE mapping
	@DeleteMapping("/delete/{id}")
	public String deleteMusician(@PathVariable int id) {
		return musicianService.deleteMusician(id);
	}
}
