package si.unm.fis.prspr.mb.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Genre {
	// LASTNOSTI
	@Id
	@GeneratedValue
	private int id;
	private String name;
	
	@OneToMany(mappedBy = "genre")
	@JsonIgnore
	private List<Musician> musicians;
	
	@OneToMany(mappedBy = "genre")
	@JsonIgnore
	private List<Album> albums;
	

	
	
	// KONSTRUKTORJI
	public Genre(String name) {
		super();
		this.name = name;
	}

	public Genre() {
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

	
	public List<Musician> getMusicians() {
		return musicians;
	}
	public void setMusicians(List<Musician> musicians) {
		this.musicians = musicians;
	}
	
	
	public List<Album> getAlbums() {
		return albums;
	}
	public void setAlbums(List<Album> albums) {
		this.albums = albums;
	}
}
