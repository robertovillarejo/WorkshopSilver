package io.github.robertovillarejo.web.rest;

import io.github.robertovillarejo.domain.Mold;
import io.github.robertovillarejo.repository.MoldRepository;
import io.github.robertovillarejo.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link io.github.robertovillarejo.domain.Mold}.
 */
@RestController
@RequestMapping("/api")
public class MoldResource {

    private final Logger log = LoggerFactory.getLogger(MoldResource.class);

    private static final String ENTITY_NAME = "mold";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MoldRepository moldRepository;

    public MoldResource(MoldRepository moldRepository) {
        this.moldRepository = moldRepository;
    }

    /**
     * {@code POST  /molds} : Create a new mold.
     *
     * @param mold the mold to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new mold, or with status {@code 400 (Bad Request)} if the mold has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/molds")
    public ResponseEntity<Mold> createMold(@Valid @RequestBody Mold mold) throws URISyntaxException {
        log.debug("REST request to save Mold : {}", mold);
        if (mold.getId() != null) {
            throw new BadRequestAlertException("A new mold cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Mold result = moldRepository.save(mold);
        return ResponseEntity.created(new URI("/api/molds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /molds} : Updates an existing mold.
     *
     * @param mold the mold to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated mold,
     * or with status {@code 400 (Bad Request)} if the mold is not valid,
     * or with status {@code 500 (Internal Server Error)} if the mold couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/molds")
    public ResponseEntity<Mold> updateMold(@Valid @RequestBody Mold mold) throws URISyntaxException {
        log.debug("REST request to update Mold : {}", mold);
        if (mold.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Mold result = moldRepository.save(mold);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, mold.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /molds} : get all the molds.
     *
     * @param pageable the pagination information.
     * @param queryParams a {@link MultiValueMap} query parameters.
     * @param uriBuilder a {@link UriComponentsBuilder} URI builder.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of molds in body.
     */
    @GetMapping("/molds")
    public ResponseEntity<List<Mold>> getAllMolds(Pageable pageable, @RequestParam MultiValueMap<String, String> queryParams, UriComponentsBuilder uriBuilder, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Molds");
        Page<Mold> page;
        if (eagerload) {
            page = moldRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = moldRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(uriBuilder.queryParams(queryParams), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /molds/:id} : get the "id" mold.
     *
     * @param id the id of the mold to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the mold, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/molds/{id}")
    public ResponseEntity<Mold> getMold(@PathVariable Long id) {
        log.debug("REST request to get Mold : {}", id);
        Optional<Mold> mold = moldRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(mold);
    }

    /**
     * {@code DELETE  /molds/:id} : delete the "id" mold.
     *
     * @param id the id of the mold to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/molds/{id}")
    public ResponseEntity<Void> deleteMold(@PathVariable Long id) {
        log.debug("REST request to delete Mold : {}", id);
        moldRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
