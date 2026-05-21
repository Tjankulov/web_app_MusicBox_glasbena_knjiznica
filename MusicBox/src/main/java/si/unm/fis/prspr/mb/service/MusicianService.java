package si.unm.fis.prspr.mb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import si.unm.fis.prspr.mb.entity.Musician;
import si.unm.fis.prspr.mb.repository.MusicianRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
public class MusicianService {

    private final MusicianRepository musicianRepository;

    public MusicianService(MusicianRepository musicianRepository) {
        this.musicianRepository = musicianRepository;
    }

    public Musician createMusician(Musician musician) {
        return musicianRepository.save(musician);
    }

    public List<Musician> getAllMusicians() {
        return musicianRepository.findAll();
    }

    public Musician getMusicianById(int id) {
        return musicianRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Glasbenik z ID " + id + " ne obstaja."));
    }

    public List<Musician> getMusiciansByGenre(String genreName) {
        if (genreName == null || genreName.isEmpty()) {
            return musicianRepository.findAll();
        }
        return musicianRepository.findByGenreNameIgnoreCase(genreName);
    }

    public Musician updateMusician(int id, Musician musician) {
        Musician existing = musicianRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Glasbenik z ID " + id + " ne obstaja."));
        existing.setName(musician.getName());
        existing.setGenre(musician.getGenre());
        return musicianRepository.save(existing);
    }

    public void deleteMusician(int id) {
        musicianRepository.deleteById(id);
    }
    
    public Page<Musician> getMusiciansPaginated(int page, int size) {
        return musicianRepository.findAll(PageRequest.of(page, size));
    }
}
