package com.issuetracker.IssueTrackerAPI.model;

import java.util.List;

public class BoardWrapper {
	
	private List<DroppableColumn> columns;
	private List<Issue> issues;
	private Long boardId;
	
	/* Can remove if causes errors */
	private String boardName;
	
	public List<DroppableColumn> getColumns() {
		return columns;
	}
	public void setColumns(List<DroppableColumn> droppableColumns) {
		this.columns = droppableColumns;
	}
	public List<Issue> getIssues() {
		return issues;
	}
	public void setIssues(List<Issue> issueList) {
		this.issues = issueList;
	}
	public Long getBoardId() {
		return boardId;
	}
	public void setBoardId(Long boardId) {
		this.boardId = boardId;
	}
	
	
	/* Can remove if causes errors */
	public String getBoardName() {
		return boardName;
	}
	public void setBoardName(String boardName) {
		this.boardName = boardName;
	}

}
