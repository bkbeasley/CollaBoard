package com.issuetracker.IssueTrackerAPI.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.issuetracker.IssueTrackerAPI.model.DroppableColumn;

@Repository
public interface DroppableColumnRepository extends JpaRepository<DroppableColumn, Long>{
	
	//Returns a List of DroppableColumns for a particular Board
	@Query(value = "SELECT * FROM droppable_column d WHERE board_id = :boardId ORDER BY d.position ASC", nativeQuery = true)
	List<DroppableColumn> findColumnsByBoardId(@Param("boardId") Long boardId);
	
}
