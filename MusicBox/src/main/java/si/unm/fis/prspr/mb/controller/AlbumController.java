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

import si.unm.fis.prspr.mb.entity.Album;
import si.unm.fis.prspr.mb.service.AlbumService;

@RestController
@RequestMapping("/albums")
public class AlbumController {
	@Autowired
	private AlbumService albumService;
	
	
	// POST mapping
	@PostMapping("/create")
	public Album createAlbum(@RequestBody Album album) {
		return albumService.createAlbum(album);
	}
		
	
	// GET mapping
	// ALL
	@GetMapping("/getAll")
	public List<Album> getAllAlbums() {
		return albumService.getAllAlbums();
	}
	
	
	// UPDATE 
	@PutMapping("/update")
	public Album updateAlbum(@PathVariable Album album) {
		return albumService.updateAlbum(album);
	}

	
	// DELETE mapping
	@DeleteMapping("/delete/{id}")
	public String deleteAlbum(@PathVariable int id) {
		return albumService.deleteAlbum(id);
	}
}
