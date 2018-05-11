package io.github.robertovillarejo.silverworkshop.repository;

import io.github.robertovillarejo.silverworkshop.domain.Photo;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Photo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

}
