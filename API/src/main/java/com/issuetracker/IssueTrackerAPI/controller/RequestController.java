package com.issuetracker.IssueTrackerAPI.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issuetracker.IssueTrackerAPI.model.Request;
import com.issuetracker.IssueTrackerAPI.model.RequestWrapper;
import com.issuetracker.IssueTrackerAPI.model.User;
import com.issuetracker.IssueTrackerAPI.repository.RequestRepository;
import com.issuetracker.IssueTrackerAPI.repository.TeamRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class RequestController {
	
	@Autowired
	TeamRepository teamRepository;
	
	@Autowired
	RequestRepository requestRepository;

	@PostMapping("/request")
	public Boolean validRequest(@RequestBody RequestWrapper request) {
		
		//Determine if the team name sent is valid
		String teamName = request.getTeamName();
		String requestor = request.getRequestor();
		String avatar = request.getRequestor_avatar();
		
		Long val = teamRepository.nameExists(teamName);
		
		//Val is equal to null if the name is invalid (doesn't exist)
		if (val == null) {
			return false;
		}
		else {
			
			//Find the team owner
			String owner = teamRepository.findOwner(teamName);
			
			//If the requestor has not already submitted a request to join this team,
			//insert a new request
			if (!requestRepository.existsByRequestorAndOwner(requestor, owner)) {
				Request newRequest = new Request();
				
				newRequest.setRequestor(requestor);
				newRequest.setOwner(owner);
				newRequest.setRequestor_avatar(avatar);
				
				requestRepository.save(newRequest);
			}
			
			return true;
		}	
	}
	
	@PostMapping("/request/view")
	public List<Request> getRequests(@RequestBody Request request) {
		return requestRepository.findRequests(request.getOwner());
	}
	
	@DeleteMapping("/request")
	public void deleteRequest(@RequestBody Request request) {
		
		Request potentialRequest = requestRepository.findByRequestor(request.getRequestor());
		
		requestRepository.delete(potentialRequest);
	}
	
}
