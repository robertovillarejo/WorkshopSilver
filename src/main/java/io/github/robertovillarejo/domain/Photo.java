package io.github.robertovillarejo.domain;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Photo.
 */
@Entity
@Table(name = "photo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Photo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    @Lob
    @Column(name = "photo", nullable = false)
    private byte[] photo;

    @Column(name = "photo_content_type", nullable = false)
    private String photoContentType;

    @Size(max = 25)
    @Column(name = "footer", length = 25)
    private String footer;

    @ManyToOne
    @JsonIgnoreProperties("photos")
    private Model model;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public Photo photo(byte[] photo) {
        this.photo = photo;
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public Photo photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getFooter() {
        return footer;
    }

    public Photo footer(String footer) {
        this.footer = footer;
        return this;
    }

    public void setFooter(String footer) {
        this.footer = footer;
    }

    public Model getModel() {
        return model;
    }

    public Photo model(Model model) {
        this.model = model;
        return this;
    }

    public void setModel(Model model) {
        this.model = model;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Photo)) {
            return false;
        }
        return id != null && id.equals(((Photo) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Photo{" +
            "id=" + getId() +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", footer='" + getFooter() + "'" +
            "}";
    }
}
