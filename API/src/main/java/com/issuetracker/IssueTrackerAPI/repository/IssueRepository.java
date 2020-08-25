package com.issuetracker.IssueTrackerAPI.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.issuetracker.IssueTrackerAPI.model.Issue;

@Repository
public interface IssueRepository extends JpaRepository<Issue, Long>{
	
	//Find all issues in all of the DroppableColumns
	@Query(value = "SELECT * FROM issue i WHERE column_id IN :columnList ORDER BY i.column_id ASC, i.position ASC", nativeQuery = true)
	List<Issue> findIssuesInColumns(@Param("columnList") List<Long> columnIds);
}
