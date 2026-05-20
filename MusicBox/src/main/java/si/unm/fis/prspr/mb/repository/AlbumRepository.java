package si.unm.fis.prspr.mb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import si.unm.fis.prspr.mb.entity.Album;

@Repository
public interface AlbumRepository extends JpaRepository<Album, Integer> {
}
