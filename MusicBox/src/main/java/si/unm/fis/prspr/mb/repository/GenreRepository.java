package si.unm.fis.prspr.mb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import si.unm.fis.prspr.mb.entity.Genre;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Integer> {
}
