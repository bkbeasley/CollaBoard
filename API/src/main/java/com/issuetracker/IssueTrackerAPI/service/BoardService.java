package com.issuetracker.IssueTrackerAPI.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.issuetracker.IssueTrackerAPI.model.Board;
import com.issuetracker.IssueTrackerAPI.repository.BoardRepository;

@Service
public class BoardService {
	
	@Autowired
	BoardRepository boardRepository;
	
	public Board createBoard(Board board) {
		return boardRepository.save(board);
	}
	
	public List<Board> getAllBoards(){
		return boardRepository.findAll();
	}
	
	public Optional<Board> getBoardById(Long boardId) {
		return boardRepository.findById(boardId);
	}
	
	public Board updateBoard(@PathVariable(value = "id") Long boardId, @RequestBody Board board) {
		Optional<Board> potentialBoard = boardRepository.findById(boardId);
		Board updatedBoard = null;
		
		if (potentialBoard.isPresent()){
			updatedBoard = potentialBoard.get();
		}
		else {
			return updatedBoard;
		}
		
		boardRepository.save(updatedBoard);
		
		return updatedBoard;
	}
	
	@DeleteMapping("boards/{id}")
	public ResponseEntity<?> deleteBoard(@PathVariable(value = "id") Long boardId) {
		boardRepository.deleteById(boardId);
		
		return ResponseEntity.ok().build();
	}
	
	

}
