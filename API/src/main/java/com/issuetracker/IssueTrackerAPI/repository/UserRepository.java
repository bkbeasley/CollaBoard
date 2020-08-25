package com.issuetracker.IssueTrackerAPI.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.issuetracker.IssueTrackerAPI.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	//Returns the primary key, user_id
	@Query(value = "select user_id from app_user where username = :username", nativeQuery = true)
	Long findByUsername(@Param("username") String username);
	
	@Query(value = "SELECT board_id FROM app_user WHERE username = :username", nativeQuery = true)
	Long findBoardByUsername(@Param("username") String username);
	
	@Query(value = "SELECT username FROM app_user WHERE username = :username", nativeQuery = true)
	String findByName(@Param("username") String username);
	
	@Query(value = "SELECT password FROM app_user WHERE password = :password", nativeQuery = true)
	String findByPassword(@Param("password") String password);
	
	@Query(value = "SELECT username FROM app_user WHERE username = :username AND password = :password", nativeQuery = true)
	String findIfUserExists(@Param("username") String username, @Param("password") String password);
	
	@Query(value = "SELECT username FROM app_user WHERE username = :username AND board_member = 1", nativeQuery = true)
	String findIfBoardMember(@Param("username") String username);
	
	@Query(value = "SELECT board_id FROM app_user WHERE username = :username", nativeQuery = true)
	Long findBoardIdByUsername(@Param("username") String username);
	
	@Query(value = "SELECT team_member FROM app_user WHERE username = :username", nativeQuery = true)
	Boolean isTeamMember(@Param("username") String username);
	
	@Query(value = "SELECT team_owner FROM app_user WHERE username = :username", nativeQuery = true)
	Boolean isTeamOwner(@Param("username") String username);
	
	@Query(value = "SELECT board_owner FROM app_user WHERE username = :username", nativeQuery = true)
	Boolean isBoardOwner(@Param("username") String username);
	
	@Query(value = "SELECT * FROM app_user WHERE team_name = :teamName", nativeQuery = true)
	List<User> findTeamMembers(@Param("teamName") String teamName);
	
	@Query(value = "SELECT team_name FROM app_user WHERE username = :username", nativeQuery = true)
	String findTeamName(@Param("username") String username);
	
	@Query(value = "SELECT avatar FROM app_user WHERE username = :username", nativeQuery = true)
	String findAvatar(@Param("username") String username);
	
	@Query(value = "SELECT board_id FROM app_user WHERE username = :username", nativeQuery = true)
	String findBoardId(@Param("username") String username);
	
/*	@Query(value="SELECT username, avatar FROM app_user WHERE team_name = :teamName", nativeQuery = true)
	String findTeamMembers(@Param("teamName") String teamName)*/
	
	
}
