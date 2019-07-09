package io.github.robertovillarejo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import io.github.robertovillarejo.domain.Mold;

/**
 * Spring Data  repository for the Mold entity.
 */
@Repository
public interface MoldRepository extends JpaRepository<Mold, Long> {

    @Query(value = "select distinct mold from Mold mold left join fetch mold.models",
        countQuery = "select count(distinct mold) from Mold mold")
    Page<Mold> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct mold from Mold mold left join fetch mold.models")
    List<Mold> findAllWithEagerRelationships();

    @Query("select mold from Mold mold left join fetch mold.models where mold.id =:id")
    Optional<Mold> findOneWithEagerRelationships(@Param("id") Long id);
    
    @Query("select mold from Mold mold join mold.models model where model.id = :modelId")
    List<Mold> findAllByModelId(@Param("modelId") Long modelId);

}
