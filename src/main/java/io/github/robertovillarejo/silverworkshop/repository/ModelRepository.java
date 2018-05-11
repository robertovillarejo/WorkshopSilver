package io.github.robertovillarejo.silverworkshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.robertovillarejo.silverworkshop.domain.Model;

/**
 * Spring Data JPA repository for the Model entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ModelRepository extends JpaRepository<Model, Long> {

}
