package com.issuetracker.IssueTrackerAPI.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.issuetracker.IssueTrackerAPI.model.Request;

public interface RequestRepository extends JpaRepository<Request, Long>{
	boolean existsByRequestorAndOwner(String requestor, String owner);
	
	@Query(value = "SELECT * FROM request WHERE owner = :owner", nativeQuery = true)
	List<Request> findRequests(@Param("owner") String owner);
	
	@Query(value = "SELECT * FROM request WHERE requestor = :requestor", nativeQuery = true)
	Request findByRequestor(@Param("requestor") String requestor);
}
