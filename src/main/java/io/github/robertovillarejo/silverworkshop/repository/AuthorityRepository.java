package io.github.robertovillarejo.silverworkshop.repository;

import io.github.robertovillarejo.silverworkshop.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
