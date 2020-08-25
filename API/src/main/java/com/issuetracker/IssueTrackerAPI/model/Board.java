package com.issuetracker.IssueTrackerAPI.model;

import javax.persistence.*;

@Entity
@Table(name="board")
public class Board {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="board_id")
	private Long boardId;
	
	@Column(name="user_id")
	private Long userId;
	
	@Column(name="issue_index")
	private String issueIndex;
	
	@Column(name="name")
	private String name;

	public Long getBoardId() {
		return boardId;
	}

	public void setBoardId(Long boardId) {
		this.boardId = boardId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getIssueIndex() {
		return issueIndex;
	}

	public void setIssueIndex(String issueIndex) {
		this.issueIndex = issueIndex;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
}
