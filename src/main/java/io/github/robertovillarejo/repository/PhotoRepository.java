package io.github.robertovillarejo.repository;

import io.github.robertovillarejo.domain.Photo;

import java.util.List;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Photo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    
    public List<Photo> findAllByModelId(Long idModel);

}
