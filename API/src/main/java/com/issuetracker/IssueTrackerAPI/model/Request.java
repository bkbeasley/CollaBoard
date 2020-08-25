package com.issuetracker.IssueTrackerAPI.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="request")
public class Request {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="request_id")
	private Long request_id;

	@Column(name="requestor")
	private String requestor;
	
	@Column(name="owner")
	private String owner;
	
	@Column(name="requestor_avatar")
	private String requestor_avatar;

	public Long getRequest_id() {
		return request_id;
	}

	public void setRequest_id(Long request_id) {
		this.request_id = request_id;
	}

	public String getRequestor() {
		return requestor;
	}

	public void setRequestor(String requstor) {
		this.requestor = requstor;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getRequestor_avatar() {
		return requestor_avatar;
	}

	public void setRequestor_avatar(String requestor_avatar) {
		this.requestor_avatar = requestor_avatar;
	}
	
	
}
