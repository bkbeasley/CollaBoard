package com.issuetracker.IssueTrackerAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.issuetracker.IssueTrackerAPI.model.Team;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long> {
	@Query(value = "SELECT team_id FROM team WHERE name = :teamName", nativeQuery = true)
	Long nameExists(@Param("teamName") String teamName);
	
	@Query(value = "SELECT owner FROM team WHERE name = :teamName", nativeQuery = true)
	String findOwner(@Param("teamName") String teamName);

}
