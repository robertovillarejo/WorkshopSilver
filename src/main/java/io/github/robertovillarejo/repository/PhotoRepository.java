package io.github.robertovillarejo.repository;

import io.github.robertovillarejo.domain.Photo;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Photo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {
	
	List<Photo> findAllByModelId(Long id);

}
