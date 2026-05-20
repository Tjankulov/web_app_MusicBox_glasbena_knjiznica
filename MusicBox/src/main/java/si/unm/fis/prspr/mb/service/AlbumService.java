package si.unm.fis.prspr.mb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import si.unm.fis.prspr.mb.entity.Album;
import si.unm.fis.prspr.mb.repository.AlbumRepository;

@Service
public class AlbumService {
	// avtomatski dependancy injection
	@Autowired
	private AlbumRepository albumRepository;
	
	
	// CRUD OPERACIJE
	
	// CREATE
	public Album createAlbum(Album album) {
		return albumRepository.save(album);
	}
	
	
	// RETRIEVE
	// ALL
	public List<Album> getAllAlbums() {
		return albumRepository.findAll();
	}

	
	// UPDATE
	public Album updateAlbum(Album album) {
		return albumRepository.save(album);
	}
	
	
	// DELETE
	public String deleteAlbum(int id) {
		albumRepository.deleteById(id);
		return "Album je odstranjen.";
	}
}
