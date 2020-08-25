package com.issuetracker.IssueTrackerAPI.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;



/*@Repository
public interface CommentRepository extends JpaRepository<Comment, Long>{
	
	//Find all comments for an Issue
		@Query(value = "SELECT * FROM comment WHERE issue_id = :id", nativeQuery = true)
		List<Comment> getCommentsByIssue(@Param("id") Long id);

}*/
