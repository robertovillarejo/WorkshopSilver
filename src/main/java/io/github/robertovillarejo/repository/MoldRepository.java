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
    
    @Query(nativeQuery=true, value="SELECT id, jhi_number, jhi_size FROM mold_model INNER JOIN mold ON mold_model.molds_id = mold.id WHERE mold_model.models_id = ?")
    List<Mold> findAllByModelId(@Param("id") Long id);

}
