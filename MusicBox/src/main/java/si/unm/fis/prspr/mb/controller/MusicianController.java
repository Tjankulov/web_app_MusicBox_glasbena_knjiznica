package si.unm.fis.prspr.mb.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import si.unm.fis.prspr.mb.entity.Musician;
import si.unm.fis.prspr.mb.service.MusicianService;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/musicians")
public class MusicianController {

    private final MusicianService musicianService;

    public MusicianController(MusicianService musicianService) {
        this.musicianService = musicianService;
    }

    @PostMapping
    public Musician createMusician(@RequestBody Musician musician) {
        return musicianService.createMusician(musician);
    }

    @GetMapping
    public Page<Musician> getAllMusicians(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return musicianService.getMusiciansPaginated(page, size);
    }

    @GetMapping("/byGenre/{genreName}")
    public List<Musician> getMusiciansByGenre(@PathVariable String genreName) {
        return musicianService.getMusiciansByGenre(genreName);
    }

    @GetMapping("/{id}")
    public Musician getMusicianById(@PathVariable int id) {
        return musicianService.getMusicianById(id);
    }

    @PutMapping("/{id}")
    public Musician updateMusician(@PathVariable int id, @RequestBody Musician musician) {
        return musicianService.updateMusician(id, musician);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMusician(@PathVariable int id) {
        musicianService.deleteMusician(id);
        return ResponseEntity.noContent().build();
    }
}
