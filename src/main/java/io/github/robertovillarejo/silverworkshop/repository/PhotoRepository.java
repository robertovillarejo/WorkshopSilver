package io.github.robertovillarejo.silverworkshop.repository;

import io.github.robertovillarejo.silverworkshop.domain.Photo;
import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.*;

/**
 * Spring Data JPA repository for the Photo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PhotoRepository extends JpaRepository<Photo, Long> {

    @Query(value = "SELECT * FROM PHOTO WHERE model_id = ?", nativeQuery = true)
    public List<Photo> findAllPhotosById(Long id);

}
