package io.github.robertovillarejo.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.robertovillarejo.domain.Mold;

import io.github.robertovillarejo.repository.MoldRepository;
import io.github.robertovillarejo.web.rest.util.HeaderUtil;
import io.github.robertovillarejo.web.rest.util.PaginationUtil;
import io.swagger.annotations.ApiParam;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Mold.
 */
@RestController
@RequestMapping("/api")
public class MoldResource {

    private final Logger log = LoggerFactory.getLogger(MoldResource.class);

    private static final String ENTITY_NAME = "mold";

    private final MoldRepository moldRepository;

    public MoldResource(MoldRepository moldRepository) {
        this.moldRepository = moldRepository;
    }

    /**
     * POST  /molds : Create a new mold.
     *
     * @param mold the mold to create
     * @return the ResponseEntity with status 201 (Created) and with body the new mold, or with status 400 (Bad Request) if the mold has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/molds")
    @Timed
    public ResponseEntity<Mold> createMold(@Valid @RequestBody Mold mold) throws URISyntaxException {
        log.debug("REST request to save Mold : {}", mold);
        if (mold.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new mold cannot already have an ID")).body(null);
        }
        Mold result = moldRepository.save(mold);
        return ResponseEntity.created(new URI("/api/molds/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /molds : Updates an existing mold.
     *
     * @param mold the mold to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated mold,
     * or with status 400 (Bad Request) if the mold is not valid,
     * or with status 500 (Internal Server Error) if the mold couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/molds")
    @Timed
    public ResponseEntity<Mold> updateMold(@Valid @RequestBody Mold mold) throws URISyntaxException {
        log.debug("REST request to update Mold : {}", mold);
        if (mold.getId() == null) {
            return createMold(mold);
        }
        Mold result = moldRepository.save(mold);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, mold.getId().toString()))
            .body(result);
    }

    /**
     * GET  /molds : get all the molds.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of molds in body
     */
    @GetMapping("/molds")
    @Timed
    public ResponseEntity<List<Mold>> getAllMolds(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of Molds");
        Page<Mold> page = moldRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/molds");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /molds/:id : get the "id" mold.
     *
     * @param id the id of the mold to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the mold, or with status 404 (Not Found)
     */
    @GetMapping("/molds/{id}")
    @Timed
    public ResponseEntity<Mold> getMold(@PathVariable Long id) {
        log.debug("REST request to get Mold : {}", id);
        Mold mold = moldRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(mold));
    }

    /**
     * DELETE  /molds/:id : delete the "id" mold.
     *
     * @param id the id of the mold to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/molds/{id}")
    @Timed
    public ResponseEntity<Void> deleteMold(@PathVariable Long id) {
        log.debug("REST request to delete Mold : {}", id);
        moldRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
