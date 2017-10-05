package io.github.robertovillarejo.repository;

import io.github.robertovillarejo.domain.Mold;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import java.util.List;

/**
 * Spring Data JPA repository for the Mold entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MoldRepository extends JpaRepository<Mold, Long> {
    @Query("select distinct mold from Mold mold left join fetch mold.models")
    List<Mold> findAllWithEagerRelationships();

    @Query("select mold from Mold mold left join fetch mold.models where mold.id =:id")
    Mold findOneWithEagerRelationships(@Param("id") Long id);

}
