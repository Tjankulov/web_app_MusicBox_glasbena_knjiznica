package si.unm.fis.prspr.mb.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import si.unm.fis.prspr.mb.entity.Musician;
import si.unm.fis.prspr.mb.repository.MusicianRepository;

@Service
public class MusicianService {
	// avtomatski dependancy injection
	@Autowired
	private MusicianRepository musicianRepository;
	
	
	// CRUD OPERACIJE
	
	// CREATE
	public Musician createMusician(Musician musician) {
		return musicianRepository.save(musician);
	}
	
	
	// RETRIEVE
	// ALL
	public List<Musician> getAllMusicians() {
		return musicianRepository.findAll();
	}
	// BY GENRE (ZANIMIVO ISKANJE)
	public List<Musician> getMusiciansByGenre(String genreName) {
		if (genreName == null || genreName.isEmpty()) {
            return musicianRepository.findAll();
        }
        return musicianRepository.findByGenreName(genreName);
    }

	
	// UPDATE
	public Musician updateMusician(Musician musician) {
		return musicianRepository.save(musician);
	}
	
	
	// DELETE
	public String deleteMusician(int id) {
		musicianRepository.deleteById(id);
		return "Glasbenik je odstranjen.";
	}
}
