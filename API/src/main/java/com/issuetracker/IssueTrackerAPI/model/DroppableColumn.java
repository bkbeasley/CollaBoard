package com.issuetracker.IssueTrackerAPI.model;

import javax.persistence.*;

@Entity
@Table(name="droppable_column")
public class DroppableColumn {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="column_id")
	private Long columnId;
	
	@Column(name="board_id")
	private Long boardId;
	
	@Column(name="title")
	private String title;
	
	@Column(name="position")
	private int position;

	public Long getColumn_id() {
		return columnId;
	}

	public void setColumn_id(Long columnID) {
		this.columnId = columnID;
	}

	public Long getBoard_id() {
		return boardId;
	}

	public void setBoard_id(Long boardID) {
		this.boardId = boardID;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}
	
}
