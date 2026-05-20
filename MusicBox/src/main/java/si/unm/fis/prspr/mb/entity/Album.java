package si.unm.fis.prspr.mb.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;


@Entity
public class Album {
	// LASTNOSTI
	@Id
	@GeneratedValue
	private int id;
	private String name;
	
	@ManyToOne
	private Genre genre;
	
	@ManyToOne
	private Musician musician;


	
	// KONSTRUKTORJI
	public Album(String name, Genre genre, Musician musician) {
		super();                                       // super pokliče parent class, da dobi njegove lastnosti in funkcije
		this.name = name;
		this.genre = genre;
		this.musician = musician;
	}


	public Album() {
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


	public Musician getMusician() {
		return musician;
	}
	public void setMusician(Musician musician) {
		this.musician = musician;
	}
}
