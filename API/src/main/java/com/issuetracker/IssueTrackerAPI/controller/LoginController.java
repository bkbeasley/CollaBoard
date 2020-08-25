package com.issuetracker.IssueTrackerAPI.controller;

import java.util.ArrayList;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.issuetracker.IssueTrackerAPI.model.BoardWrapper;
import com.issuetracker.IssueTrackerAPI.model.DroppableColumn;
import com.issuetracker.IssueTrackerAPI.model.Issue;
import com.issuetracker.IssueTrackerAPI.model.User;
import com.issuetracker.IssueTrackerAPI.repository.BoardRepository;
import com.issuetracker.IssueTrackerAPI.repository.DroppableColumnRepository;
import com.issuetracker.IssueTrackerAPI.repository.IssueRepository;
import com.issuetracker.IssueTrackerAPI.repository.UserRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	BoardRepository boardRepository;
	
	@Autowired
	DroppableColumnRepository droppableColumnRepository;
	
	@Autowired
	IssueRepository issueRepository;
	
	@PostMapping("/api/login")
	public @ResponseBody ResponseEntity<?> getDroppableColumns(HttpServletRequest request, @RequestBody User user) {
				
		String username = null;
		Long userId = null;
		Long boardId = null;
		
		List<DroppableColumn> columns = null;
		List<Long> columnIds = new ArrayList<>();
		List<Issue> issues = null;
		
		BoardWrapper boardWrapper = new BoardWrapper();
		
		//Retrieve the user name
		username = user.getUsername();
		
		HttpSession session = request.getSession();
        session.setAttribute("user", username);
        
		
		//Error handling in the case of a "bad" user name
		//TODO: 
		
		//Retrieve the user_id
		userId = this.getUserId(username);

		//TODO: Error Handling
		if (userId == null) {

		}
		
		//Retrieve Board primary key, board_id that is associated with the user
		boardId = this.getBoardId(userId);
		
		//TODO: Error Handling
		if (boardId == null) {
			
		}
		
		
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
		
		//TODO: Error Handling
		if (issues == null) {
			
		}
	
		boardWrapper.setColumns(columns);
		boardWrapper.setIssues(issues);	
		
		ResponseEntity<?> responseEntity = new ResponseEntity<>(boardWrapper, HttpStatus.OK);
		return responseEntity;
	}
	
	public Long getUserId(String name) {
		//Retrieve the user_id
		return userRepository.findByUsername(name);
	}
	
	public Long getBoardId(Long userId) {
		//Retrieve Board primary key board_id, associated with the user
		return boardRepository.findByUserId(userId);
	}
	
}
