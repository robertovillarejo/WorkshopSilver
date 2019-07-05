package io.github.robertovillarejo.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Model.
 */
@Entity
@Table(name = "model")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Model implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(max = 30)
    @Column(name = "name", length = 30, nullable = false)
    private String name;

    @OneToMany(mappedBy = "model")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Photo> photos = new HashSet<>();

    @ManyToMany(mappedBy = "models")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Mold> molds = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Model name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Photo> getPhotos() {
        return photos;
    }

    public Model photos(Set<Photo> photos) {
        this.photos = photos;
        return this;
    }

    public Model addPhotos(Photo photo) {
        this.photos.add(photo);
        photo.setModel(this);
        return this;
    }

    public Model removePhotos(Photo photo) {
        this.photos.remove(photo);
        photo.setModel(null);
        return this;
    }

    public void setPhotos(Set<Photo> photos) {
        this.photos = photos;
    }

    public Set<Mold> getMolds() {
        return molds;
    }

    public Model molds(Set<Mold> molds) {
        this.molds = molds;
        return this;
    }

    public Model addMolds(Mold mold) {
        this.molds.add(mold);
        mold.getModels().add(this);
        return this;
    }

    public Model removeMolds(Mold mold) {
        this.molds.remove(mold);
        mold.getModels().remove(this);
        return this;
    }

    public void setMolds(Set<Mold> molds) {
        this.molds = molds;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Model)) {
            return false;
        }
        return id != null && id.equals(((Model) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Model{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
