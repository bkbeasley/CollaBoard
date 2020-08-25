package com.issuetracker.IssueTrackerAPI.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.issuetracker.IssueTrackerAPI.model.Board;
import com.issuetracker.IssueTrackerAPI.model.BoardWrapper;
import com.issuetracker.IssueTrackerAPI.model.DroppableColumn;
import com.issuetracker.IssueTrackerAPI.model.Issue;
import com.issuetracker.IssueTrackerAPI.model.User;
import com.issuetracker.IssueTrackerAPI.repository.BoardRepository;
import com.issuetracker.IssueTrackerAPI.repository.DroppableColumnRepository;
import com.issuetracker.IssueTrackerAPI.repository.IssueRepository;
import com.issuetracker.IssueTrackerAPI.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class BoardController {
	
	@Autowired
	BoardRepository boardRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	DroppableColumnRepository droppableColumnRepository;
	
	@Autowired
	IssueRepository issueRepository;
	
/*	@Autowired
	CommentRepository commentRepository;*/

	@PostMapping("/boards")
	public Long createBoard(@RequestBody BoardWrapper boardWrapper) {
		//Insert a new row in the Boards table
		Board board = new Board();
		
		//Remove this, use Cognito attribute instead
		board.setUserId((long)10);
		
		board.setName(boardWrapper.getBoardName());
		board.setIssueIndex("100");
		
		boardRepository.save(board);
		
		Long boardId = board.getBoardId();
		
		//Insert the new columns in the DroppableColumns table
		List<DroppableColumn> columns = boardWrapper.getColumns();
		
		for (DroppableColumn column : columns) {
			column.setBoard_id(boardId);
			droppableColumnRepository.save(column);
		}
		
		return boardId;
	}
	
	/*@GetMapping("/boards")
	public List<Board> getAllBoards(){
		return boardRepository.findAll();
	}*/
	
	@PostMapping("/boards/get")
	public @ResponseBody ResponseEntity<?> getBoard(@RequestBody Board board){
		Long id = Long.valueOf(board.getBoardId());
		List<DroppableColumn> columns = null;
		List<Long> columnIds = new ArrayList<>();
		List<Issue> issues = null;
		
		BoardWrapper boardWrapper = new BoardWrapper();
		
		boardWrapper.setBoardId(id);
		
		//Added later
		String name = "";
		name = boardRepository.getBoardName(id);
		
		if (name != null) {
			boardWrapper.setBoardName(name);
		}
		else {
			boardWrapper.setBoardName("");
		}
		
		//Retrieve Columns associated with the Board
		columns = droppableColumnRepository.findColumnsByBoardId(id);
		
		//TODO: Error Handling
		if (columns == null) {
			
		}
		
		//Create a list containing the columnIds
		for (DroppableColumn column : columns) {
			columnIds.add(column.getColumn_id());
		}
		
		//Retrieve Issues associated with all Columns
		issues = issueRepository.findIssuesInColumns(columnIds);
		
		//Retrieve all Comments associated with each Issue
		/*List<Comment> comments = null;
		for (Issue issue : issues) {
			comments = commentRepository.getCommentsByIssue(issue.getIssue_id());
			
			if (!comments.isEmpty()) {
				issue.setComments(comments);
			}
			
		}*/
		
		//TODO: Error Handling
		if (issues == null) {
			
		}
	
		boardWrapper.setColumns(columns);
		boardWrapper.setIssues(issues);	
		
		ResponseEntity<?> responseEntity = new ResponseEntity<>(boardWrapper, HttpStatus.OK);
		return responseEntity;
	}
	
	@PostMapping("boards/index")
	public String getIndex(@RequestBody Board board) {
		String index = "";
		index = boardRepository.getIssueIndex(board.getBoardId());
		return index;
	}
	
	@PutMapping("boards/index/update")
	public String updateIndex(@RequestBody Board board) {
		
		Optional<Board> potentialBoard = boardRepository.findById(board.getBoardId());
		Board updatedBoard = null;
		
		if (potentialBoard.isPresent()) {
			updatedBoard = potentialBoard.get();
		}
		else {
			return null;
		}
		
		int val = Integer.parseInt(updatedBoard.getIssueIndex());
		
		val += 1;
		
		String str = Integer.toString(val);
		
		updatedBoard.setIssueIndex(str);
		
		boardRepository.save(updatedBoard);
		
		return str;
	}
	
	@GetMapping("/boards/{id}")
	public Optional<Board> getBoardById(@PathVariable(value = "id") Long boardId) {
		return boardRepository.findById(boardId);
	}
	
	@PutMapping("/boards/{id}")
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
	
	@PostMapping("/boards/name")
	public String getBoardName(@RequestBody Board board) {
		String name = "";
		name = boardRepository.getBoardName(board.getBoardId());
		return name;
	}
	
	@DeleteMapping("boards/{id}")
	public ResponseEntity<?> deleteBoard(@PathVariable(value = "id") Long boardId) {
		boardRepository.deleteById(boardId);
		
		return ResponseEntity.ok().build();
	}
	
	//For future reference
	@PostMapping("/boards/get2")
	public @ResponseBody ResponseEntity<?> getBoard(@RequestBody User user){
		String username = null;
		Long boardId = null;
		
		List<DroppableColumn> columns = null;
		List<Long> columnIds = new ArrayList<>();
		List<Issue> issues = null;
		
		BoardWrapper boardWrapper = new BoardWrapper();
		
		//Retrieve the user name
		username = user.getUsername();
		
		//Error handling in the case of a "bad" user name
		//TODO: 
		
		//Retrieve Board primary key, board_id that is associated with the user
		boardId = userRepository.findBoardIdByUsername(username);
		
		//TODO: Error Handling
		if (boardId == null) {
			
		}
		
		boardWrapper.setBoardId(boardId);
		
		//Retrieve Columns associated with the Board
		columns = droppableColumnRepository.findColumnsByBoardId(boardId);
		
		
		//TODO: Error Handling
		if (columns == null) {
			
		}
		
		//Create a list containing the columnIds
		for (DroppableColumn column : columns) {
			columnIds.add(column.getColumn_id());
		}
		
		//Retrieve Issues associated with all Columns
		issues = issueRepository.findIssuesInColumns(columnIds);
		
		//Retrieve all Comments associated with each Issue
/*		List<Comment> comments = null;
		for (Issue issue : issues) {
			comments = commentRepository.getCommentsByIssue(issue.getIssue_id());
			
			if (!comments.isEmpty()) {
				issue.setComments(comments);
			}
			
		}*/
		
		//TODO: Error Handling
		if (issues == null) {
			
		}
	
		boardWrapper.setColumns(columns);
		boardWrapper.setIssues(issues);	
		
		ResponseEntity<?> responseEntity = new ResponseEntity<>(boardWrapper, HttpStatus.OK);
		return responseEntity;
	}
	
	
}
