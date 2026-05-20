package si.unm.fis.prspr.mb.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;


@Entity
public class Musician {
	// LASTNOSTI
	@Id
	@GeneratedValue
	private int id;
	private String name;
	
	@OneToMany(mappedBy = "musician")
	@JsonIgnore
	private List<Album> albums;
	
	
	@ManyToOne
	private Genre genre;


	
	// KONSTRUKTORJI
	public Musician(String name, Genre genre) {
		super();                                       // super pokliče parent class, da dobi njegove lastnosti in funkcije
		this.name = name;
		this.genre = genre;
	}


	public Musician() {
		super();
	}


	// GETTERS & SETTERS
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}


	public Genre getGenre() {
		return genre;
	}
	public void setGenre(Genre genre) {
		this.genre = genre;
	}
	
	
	public List<Album> getAlbums() {
		return albums;
	}
	public void setAlbums(List<Album> albums) {
		this.albums = albums;
	}
}
