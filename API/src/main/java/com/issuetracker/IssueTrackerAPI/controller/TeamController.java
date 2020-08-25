package com.issuetracker.IssueTrackerAPI.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issuetracker.IssueTrackerAPI.model.Team;
import com.issuetracker.IssueTrackerAPI.model.TeamWrapper;
import com.issuetracker.IssueTrackerAPI.model.User;
import com.issuetracker.IssueTrackerAPI.repository.TeamRepository;
import com.issuetracker.IssueTrackerAPI.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TeamController {
	
	@Autowired
	TeamRepository teamRepository;
	
	@Autowired
	UserRepository userRepository;
	
	//Returns true if the team name already exists, and false otherwise
	@PostMapping("/teams")
	public Boolean createTeam(@RequestBody TeamWrapper team) {
		String name = team.getTeamName();
		String owner = team.getOwner();
		Long val = teamRepository.nameExists(name);
		
		//Make sure the name doesn't already exist
		if (val == null) {
			Team newTeam = new Team();
			newTeam.setName(team.getTeamName());
			newTeam.setOwner(owner);
			teamRepository.save(newTeam);
			return false;
		}
		else {
			return true;
		}
	}
	
	@PostMapping("/teams/members")
	public List<User> getMembers(@RequestBody Team team) {
		List<String> members2 = null;
		
		//Testing 
		List<User> members = null;
		
		String teamName = team.getName();
		
		members = userRepository.findTeamMembers(teamName);
		
		return members;
	}

}
