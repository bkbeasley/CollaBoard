package com.issuetracker.IssueTrackerAPI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.issuetracker.IssueTrackerAPI.model.Board;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long>{
	
	//Returns the primary key, board_id
	@Query(value = "SELECT b.board_id FROM board as b where b.user_id = :userId", nativeQuery = true)
	Long findByUserId(@Param("userId") Long userId);
	
	@Query(value = "SELECT issue_index FROM board WHERE board_id = :id", nativeQuery = true)
	String getIssueIndex(@Param("id") Long boardId);
	
	@Query(value = "SELECT name FROM board WHERE board_id = :id", nativeQuery = true)
	String getBoardName(@Param("id") Long boardId);

}
