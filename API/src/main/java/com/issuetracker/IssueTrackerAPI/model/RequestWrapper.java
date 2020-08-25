package com.issuetracker.IssueTrackerAPI.model;

public class RequestWrapper {
	
	private String requestor;
	private String teamName;
	private String requestor_avatar;
	
	public String getRequestor() {
		return requestor;
	}
	public void setRequestor(String requestor) {
		this.requestor = requestor;
	}
	public String getTeamName() {
		return teamName;
	}
	public void setTeamName(String teamName) {
		this.teamName = teamName;
	}
	public String getRequestor_avatar() {
		return requestor_avatar;
	}
	public void setRequestor_avatar(String requestor_avatar) {
		this.requestor_avatar = requestor_avatar;
	}

}
