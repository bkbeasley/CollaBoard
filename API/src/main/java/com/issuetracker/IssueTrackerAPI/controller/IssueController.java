package com.issuetracker.IssueTrackerAPI.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.issuetracker.IssueTrackerAPI.error_handling.RestExceptionHandler;
import com.issuetracker.IssueTrackerAPI.model.Issue;
import com.issuetracker.IssueTrackerAPI.repository.IssueRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class IssueController {
	
	@Autowired
	IssueRepository issueRepository;
	
	RestExceptionHandler handler;
	
	@PostMapping("/issues")
	public @ResponseBody Issue createIssue(@RequestBody Issue issue) {
		return issueRepository.save(issue);
	}
	
	//This endpoint is used to update an Issue
	//after it has been dragged, but within the same DroppableColumn
	@PutMapping("/issues/single-column")
	public Issue updateIssueSameColumn(@RequestBody Issue issue) {
		Optional<Issue> potentialIssue = issueRepository.findById(issue.getIssue_id());
		Issue updatedIssue = null;
		
		if (potentialIssue.isPresent()) {
			updatedIssue = potentialIssue.get();
		}
		else {
			return updatedIssue;
		}
		
		updatedIssue.setPosition(issue.getPosition());
		
		issueRepository.save(updatedIssue);
		
		return updatedIssue;
	}
	
	//This endpoint is used to update an Issue
	//after it has been dragged to a different DroppableColumn
	@PutMapping("/issues/multiple-columns")
	public Issue updateIssueNewColumn(@RequestBody Issue issue) {
		Optional<Issue> potentialIssue = issueRepository.findById(issue.getIssue_id());
		Issue updatedIssue = null;
		
		if (potentialIssue.isPresent()) {
			updatedIssue = potentialIssue.get();
		}
		else {
			return updatedIssue;
		}
		
		updatedIssue.setPosition(issue.getPosition());
		updatedIssue.setColumn_id(issue.getColumn_id());
		
		issueRepository.save(updatedIssue);
		
		return updatedIssue;
	}
	
	@PutMapping("/issues/edit")
	public void editIssue(@RequestBody Issue issue) {
		Optional<Issue> potentialIssue = issueRepository.findById(issue.getIssue_id());
		Issue updatedIssue = null;
		
		if (potentialIssue.isPresent()) {
			updatedIssue = potentialIssue.get();
		}
		
		updatedIssue.setType(issue.getType());
		updatedIssue.setSummary(issue.getSummary());
		updatedIssue.setDescription(issue.getDescription());
		updatedIssue.setPriority(issue.getPriority());
		updatedIssue.setAssignee_username(issue.getAssignee_username());
		updatedIssue.setAssignee_avatar(issue.getAssignee_avatar());
		//updatedIssue.setIssueIndex(issue.getIssueIndex());
		issueRepository.save(updatedIssue);
	}
	
	@GetMapping("/issues")
	public List<Issue> getAllIssues(){
		return issueRepository.findAll();
	}
	
	@GetMapping("/issues/{id}")
	public Optional<Issue> getIssueById(@PathVariable(value = "id") Long issueId) {
		return issueRepository.findById(issueId);
	}
	
	@PutMapping("/issues/{id}")
	public Issue updateIssue(@PathVariable(value = "id") Long issueId, @RequestBody Issue issue) {
		Optional<Issue> potentialIssue = issueRepository.findById(issueId);
		Issue updatedIssue = null;
		
		if (potentialIssue.isPresent()){
			updatedIssue = potentialIssue.get();
		}
		else {
			return updatedIssue;
		}
		
		updatedIssue.setPosition(issue.getPosition());
		
		issueRepository.save(updatedIssue);
		
		return updatedIssue;
	}
	
	
	@DeleteMapping("issues/{id}")
	public ResponseEntity<?> deleteIssue(@PathVariable(value = "id") Long issueId) {
		issueRepository.deleteById(issueId);
		
		return ResponseEntity.ok().build();
	}
	
}
