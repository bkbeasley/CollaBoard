package com.issuetracker.IssueTrackerAPI.model;

import javax.persistence.*;


@Entity
@Table(name = "app_user")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id")
	private Long userId;
	
	@Column(name="username")
	private String username;
	
	@Column(name="board_id")
	private Long boardId;
	
	@Column(name="team_member")
	private boolean teamMember;
	
	@Column(name="team_owner")
	private boolean teamOwner;
	
	@Column(name="team_name")
	private String teamName;
	
	@Column(name="board_owner")
	private boolean boardOwner;
	
	@Column(name="avatar")
	private String avatar;
	
	@Column(name="board_member")
	private boolean boardMember;

	public Long getUserID() {
		return userId;
	}

	public void setUserID(Long userID) {
		this.userId = userID;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
	
	public Long getBoardId() {
		return boardId;
	}

	public void setBoardId(Long boardId) {
		this.boardId = boardId;
	}

	public boolean isTeamMember() {
		return teamMember;
	}

	public void setTeamMember(boolean teamMember) {
		this.teamMember = teamMember;
	}

	public boolean isTeamOwner() {
		return teamOwner;
	}

	public void setTeamOwner(boolean teamOwner) {
		this.teamOwner = teamOwner;
	}

	public String getTeamName() {
		return teamName;
	}

	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}

	public boolean isBoardOwner() {
		return boardOwner;
	}

	public void setBoardOwner(boolean boardOwner) {
		this.boardOwner = boardOwner;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public boolean isBoardMember() {
		return boardMember;
	}

	public void setBoardMember(boolean boardMember) {
		this.boardMember = boardMember;
	}
	
	
}
