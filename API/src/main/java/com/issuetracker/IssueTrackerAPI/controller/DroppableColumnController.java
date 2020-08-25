package com.issuetracker.IssueTrackerAPI.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issuetracker.IssueTrackerAPI.model.DroppableColumn;
import com.issuetracker.IssueTrackerAPI.repository.DroppableColumnRepository;

@RestController
@RequestMapping("/api")
public class DroppableColumnController {
	
	@Autowired
	DroppableColumnRepository droppableColumnRepository;
	
	@PostMapping("/droppable-columns")
	public DroppableColumn createDroppableColumn(@RequestBody DroppableColumn droppableColumn) {
		return droppableColumnRepository.save(droppableColumn);
	}
	
	@GetMapping("/droppable-columns")
	public List<DroppableColumn> getAllDroppableColumns(){
		return droppableColumnRepository.findAll();
	}
	
	@GetMapping("/droppable-columns/{id}")
	public Optional<DroppableColumn> getDroppableColumnById(@PathVariable(value = "id") Long droppableColumnId) {
		return droppableColumnRepository.findById(droppableColumnId);
	}
	
	@PutMapping("/droppable-columns/{id}")
	public DroppableColumn updateDroppableColumn(@PathVariable(value = "id") Long droppableColumnId, @RequestBody DroppableColumn column) {
		Optional<DroppableColumn> potentialDroppableColumn = droppableColumnRepository.findById(droppableColumnId);
		DroppableColumn updatedColumn = null;
		
		if (potentialDroppableColumn.isPresent()){
			updatedColumn = potentialDroppableColumn.get();
		}
		else {
			return updatedColumn;
		}
		
		updatedColumn.setTitle(column.getTitle());
		updatedColumn.setPosition(column.getPosition());
		
		droppableColumnRepository.save(updatedColumn);
		
		return updatedColumn;
	}
	
	@DeleteMapping("droppable-columns/{id}")
	public ResponseEntity<?> deleteDroppableColumn(@PathVariable(value = "id") Long droppableColumnId) {
		droppableColumnRepository.deleteById(droppableColumnId);
		
		return ResponseEntity.ok().build();
	}

}
