package si.unm.fis.prspr.mb.service;

import java.util.List;

import org.springframework.stereotype.Service;

import si.unm.fis.prspr.mb.entity.Album;
import si.unm.fis.prspr.mb.repository.AlbumRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

@Service
public class AlbumService {

    private final AlbumRepository albumRepository;

    public AlbumService(AlbumRepository albumRepository) {
        this.albumRepository = albumRepository;
    }

    public Album createAlbum(Album album) {
        return albumRepository.save(album);
    }

    public List<Album> getAllAlbums() {
        return albumRepository.findAll();
    }

    public Album getAlbumById(int id) {
        return albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Album z ID " + id + " ne obstaja."));
    }

    public Album updateAlbum(int id, Album album) {
        Album existing = albumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Album z ID " + id + " ne obstaja."));
        existing.setName(album.getName());
        existing.setGenre(album.getGenre());
        existing.setMusician(album.getMusician());
        return albumRepository.save(existing);
    }

    public void deleteAlbum(int id) {
        albumRepository.deleteById(id);
    }
    
    public Page<Album> getAlbumsPaginated(int page, int size) {
        return albumRepository.findAll(PageRequest.of(page, size));
    }
}
