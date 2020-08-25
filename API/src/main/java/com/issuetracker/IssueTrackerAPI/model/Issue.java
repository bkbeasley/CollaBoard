package com.issuetracker.IssueTrackerAPI.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "issue")
public class Issue {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="issue_id")
	private Long issue_id;
	
	@Column(name="assignee_id")
	private Long assignee_id;
	
	@Column(name="reporter_id")
	private Long reporter_id;
	
	@Column(name="column_id")
	private int column_id;
	
	@Column(name="summary")
	private String summary;
	
	@Column(name="description")
	private String description;
	
	@Column(name="priority")
	private String priority;
	
	@Column(name="position")
	private int position;
	
	@Column(name="type")
	private String type;
	
	@Column(name="issue_index")
	private String issueIndex;
	
	@Column(name="reporter_username")
	private String reporter_username;
	
	@Column(name="reporter_avatar")
	private String reporter_avatar;
	
	@Column(name="assignee_username")
	private String assignee_username;
	
	@Column(name="assignee_avatar")
	private String assignee_avatar;
	
/*	@Transient
	private List<Comment> comments;*/

	public Long getIssue_id() {
		return issue_id;
	}

	public void setIssue_id(Long issue_id) {
		this.issue_id = issue_id;
	}

	public Long getAssignee_id() {
		return assignee_id;
	}

	public void setAssignee_id(Long assignee_id) {
		this.assignee_id = assignee_id;
	}

	public Long getReporter_id() {
		return reporter_id;
	}

	public void setReporter_id(Long reporter_id) {
		this.reporter_id = reporter_id;
	}

	public int getColumn_id() {
		return column_id;
	}

	public void setColumn_id(int column_id) {
		this.column_id = column_id;
	}

	public String getSummary() {
		return summary;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public int getPosition() {
		return position;
	}

	public void setPosition(int position) {
		this.position = position;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getIssueIndex() {
		return issueIndex;
	}

	public void setIssueIndex(String issueIndex) {
		this.issueIndex = issueIndex;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

/*	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}*/

	public String getReporter_username() {
		return reporter_username;
	}

	public void setReporter_username(String reporter_username) {
		this.reporter_username = reporter_username;
	}

	public String getReporter_avatar() {
		return reporter_avatar;
	}

	public void setReporter_avatar(String reporter_avatar) {
		this.reporter_avatar = reporter_avatar;
	}

	public String getAssignee_username() {
		return assignee_username;
	}

	public void setAssignee_username(String assignee_username) {
		this.assignee_username = assignee_username;
	}

	public String getAssignee_avatar() {
		return assignee_avatar;
	}

	public void setAssignee_avatar(String assignee_avatar) {
		this.assignee_avatar = assignee_avatar;
	}
	

}
