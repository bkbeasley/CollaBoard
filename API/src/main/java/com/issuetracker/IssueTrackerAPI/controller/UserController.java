package com.issuetracker.IssueTrackerAPI.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.issuetracker.IssueTrackerAPI.model.User;
import com.issuetracker.IssueTrackerAPI.repository.UserRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/users")
	public User createUser(@RequestBody User user) {
		User newUser = new User();
		newUser.setUsername(user.getUsername());
		newUser.setAvatar(user.getAvatar());
		
		return userRepository.save(user);
	}
	
	@GetMapping("/users")
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	@PostMapping("/users/team-owner")
	public Boolean isTeamOwner(@RequestBody User user) {
		return userRepository.isTeamOwner(user.getUsername());
	}
	
	@PostMapping("/users/team-member")
	public Boolean isTeamMember(@RequestBody User user) {
		return userRepository.isTeamMember(user.getUsername());
	}
	
	@PostMapping("/users/board-owner")
	public Boolean isBoardOwner(@RequestBody User user) {
		return userRepository.isBoardOwner(user.getUsername());
	}
	
	@PostMapping("users/team-name")
	public String getTeamName(@RequestBody User user) {
		return userRepository.findTeamName(user.getUsername());
	}
	
	@PostMapping("users/avatar")
	public String getAvatar(@RequestBody User user) {
		return userRepository.findAvatar(user.getUsername());
	}
	
	@PostMapping("/users/member")
	public @ResponseBody Boolean isBoardMember(@RequestBody User user) {
		String username = user.getUsername();
		
		String foundUser = "";
		
		foundUser = userRepository.findIfBoardMember(username);
		
		if (foundUser == null) {
			return false;
		}
		else {
			return true;
		}
		
	}
	
	@PostMapping("/users/board-id")
	public @ResponseBody String getBoardId(@RequestBody User user) {
		return userRepository.findBoardId(user.getUsername());
	}
	
	@PostMapping("/users/members/team-members")
	public @ResponseBody ResponseEntity<?> getTeamMembers(@RequestBody User user) {
		String teamName = user.getTeamName();
		
		List<User> users = new ArrayList<User>();
		
		users = userRepository.findTeamMembers(teamName);
		
		ResponseEntity<?> responseEntity = new ResponseEntity<>(users, HttpStatus.OK);
		
		return responseEntity;
	}
	
	@GetMapping("users/{id}")
	public Optional<User> getUserById(@PathVariable(value = "id") Long userId) {
		return userRepository.findById(userId);
	}
	
	@PutMapping("users/board-owner")
	public void updateBoardOwner(@RequestBody User user) {
		Long userId = userRepository.findByUsername(user.getUsername());
		Optional<User> potentialUser = userRepository.findById(userId);
		
		User updatedUser = null;
		
		if (potentialUser.isPresent()){
			updatedUser = potentialUser.get();
		}
		else {
			System.out.println("Error: uh oh");
		}
		
		updatedUser.setBoardOwner(true);
		
		userRepository.save(updatedUser);
	}
	
	@PutMapping("users/board-member")
	public void updateBoardMember(@RequestBody User user) {
		Long userId = userRepository.findByUsername(user.getUsername());
		Optional<User> potentialUser = userRepository.findById(userId);
		
		User updatedUser = null;
		
		if (potentialUser.isPresent()){
			updatedUser = potentialUser.get();
		}
		else {
			System.out.println("Error: uh oh");
		}
		
		updatedUser.setBoardMember(true);
		
		userRepository.save(updatedUser);
	}
	
	@PutMapping("users/team-owner")
	public void updateTeamOwner(@RequestBody User user) {
		Long userId = userRepository.findByUsername(user.getUsername());
		Optional<User> potentialUser = userRepository.findById(userId);
		
		User updatedUser = null;
		
		if (potentialUser.isPresent()){
			updatedUser = potentialUser.get();
		}
		else {
			System.out.println("Error: uh oh");
		}
		
		updatedUser.setTeamOwner(true);
		
		userRepository.save(updatedUser);
	}
	
	@PutMapping("users/team-member")
	public void updateTeamMember(@RequestBody User user) {
		Long userId = userRepository.findByUsername(user.getUsername());
		Optional<User> potentialUser = userRepository.findById(userId);
		
		User updatedUser = null;
		
		if (potentialUser.isPresent()){
			updatedUser = potentialUser.get();
		}
		else {
			System.out.println("Error: uh oh");
		}
		
		updatedUser.setTeamMember(true);
		
		userRepository.save(updatedUser);
	}
	
	@PutMapping("users/team-name")
	public void updateTeamName(@RequestBody User user) {
		Long userId = userRepository.findByUsername(user.getUsername());
		Optional<User> potentialUser = userRepository.findById(userId);
		
		User updatedUser = null;
		
		if (potentialUser.isPresent()){
			updatedUser = potentialUser.get();
		}
		else {
			System.out.println("Error: uh oh");
		}
		
		updatedUser.setTeamName(user.getTeamName());
		
		userRepository.save(updatedUser);
	}
	
	@PutMapping("users/board-id")
	public void updateBoardId(@RequestBody User user) {
		Long userId = userRepository.findByUsername(user.getUsername());
		Optional<User> potentialUser = userRepository.findById(userId);
		
		User updatedUser = null;
		
		if (potentialUser.isPresent()){
			updatedUser = potentialUser.get();
		}
		else {
			System.out.println("Error: uh oh");
		}
		
		updatedUser.setBoardId(user.getBoardId());
		
		userRepository.save(updatedUser);
	}
	
	@PutMapping("/users/{id}")
	public User updateUser(@PathVariable(value = "id") Long userId, @RequestBody User username) {
		Optional<User> potentialUser = userRepository.findById(userId);
		User updatedUser = null;
		
		if (potentialUser.isPresent()){
			updatedUser = potentialUser.get();
		}
		else {
			return updatedUser;
		}
		
		updatedUser.setUsername(username.getUsername());
		
		userRepository.save(updatedUser);
		return updatedUser;
	}
	
	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteNote(@PathVariable(value = "id") Long userId) {
		userRepository.deleteById(userId);
		
		return ResponseEntity.ok().build();
	}
	
}
