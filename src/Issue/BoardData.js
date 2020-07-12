import React, { Component } from 'react';
import axios from 'axios';

async function BoardData(boardId) {
    if (boardId === null) {
        console.log("Error: boardId is cannot be null");
        return;
    }
    //let boardData = localStorage.getItem('BoardData');
    //console.log(p);

    await axios.post('http://localhost:8080/api/boards/get', {
            boardId: boardId,
        })
        .then(response => {
            console.log("Data: ", response.data);
            return(2);
            
        })

}

export default BoardData
