package si.unm.fis.prspr.mb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import si.unm.fis.prspr.mb.entity.Musician;

@Repository
public interface MusicianRepository extends JpaRepository<Musician, Integer> {
	List<Musician> findByGenreName(String genreName);
}

// JpaRepository - Java Persistence Api (ogrodje za mapiranje Java objektov v tabele v relacijski podatkovni bazi)