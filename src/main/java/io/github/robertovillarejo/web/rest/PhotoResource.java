package io.github.robertovillarejo.web.rest;

import io.github.robertovillarejo.domain.Photo;
import io.github.robertovillarejo.repository.PhotoRepository;
import io.github.robertovillarejo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.robertovillarejo.domain.Photo}.
 */
@RestController
@RequestMapping("/api")
public class PhotoResource {

    private final Logger log = LoggerFactory.getLogger(PhotoResource.class);

    private static final String ENTITY_NAME = "photo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final PhotoRepository photoRepository;

    public PhotoResource(PhotoRepository photoRepository) {
        this.photoRepository = photoRepository;
    }

    /**
     * {@code POST  /photos} : Create a new photo.
     *
     * @param photo the photo to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new photo, or with status {@code 400 (Bad Request)} if the photo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/photos")
    public ResponseEntity<Photo> createPhoto(@Valid @RequestBody Photo photo) throws URISyntaxException {
        log.debug("REST request to save Photo : {}", photo);
        if (photo.getId() != null) {
            throw new BadRequestAlertException("A new photo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Photo result = photoRepository.save(photo);
        return ResponseEntity.created(new URI("/api/photos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /photos} : Updates an existing photo.
     *
     * @param photo the photo to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated photo,
     * or with status {@code 400 (Bad Request)} if the photo is not valid,
     * or with status {@code 500 (Internal Server Error)} if the photo couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/photos")
    public ResponseEntity<Photo> updatePhoto(@Valid @RequestBody Photo photo) throws URISyntaxException {
        log.debug("REST request to update Photo : {}", photo);
        if (photo.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Photo result = photoRepository.save(photo);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, photo.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /photos} : get all the photos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of photos in body.
     */
    @GetMapping("/photos")
    public List<Photo> getAllPhotos() {
        log.debug("REST request to get all Photos");
        return photoRepository.findAll();
    }

    /**
     * {@code GET  /photos/:id} : get the "id" photo.
     *
     * @param id the id of the photo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the photo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/photos/{id}")
    public ResponseEntity<Photo> getPhoto(@PathVariable Long id) {
        log.debug("REST request to get Photo : {}", id);
        Optional<Photo> photo = photoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(photo);
    }

    /**
     * {@code DELETE  /photos/:id} : delete the "id" photo.
     *
     * @param id the id of the photo to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/photos/{id}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Long id) {
        log.debug("REST request to delete Photo : {}", id);
        photoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    /**
     * {@code GET  /models/:id/photos} : get all the photos of the specified model.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of photos in body.
     */
    @GetMapping("/models/{id}/photos")
    public List<Photo> getAllPhotosByModel(@PathVariable Long id) {
        log.debug("REST request to get all Photos of Model : {}", id);
        return photoRepository.findAllByModelId(id);
    }
    
    /**
     * {@code GET  /images/:id} : get the photo as image.
     *
     * @param id the id of the photo to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the photo, or with status {@code 404 (Not Found)}.
     */
    @GetMapping(path = "/images/{id}", produces = "image/jpeg")
    public ResponseEntity<StreamingResponseBody> getPhotoAsImage(@PathVariable Long id) {
        log.debug("REST request to get Photo as Image: {}", id);
        Optional<Photo> photo = photoRepository.findById(id);
        return ResponseEntity.ok().body(os -> {
            if (photo.isPresent()) {
                os.write(photo.get().getPhoto());
            }
        });
    }
}
