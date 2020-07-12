export default function transformResponseData(obj) {
    if (obj === null) {
        console.log("Error: Board data cannot be null.");
        return;
    }
    const initialColumns = obj.columns;
    const initialIssues = obj.issues;
    let finalColumns, finalIssues = {};
    let transformedObj = {};

    //If there are  issues
    if (obj.issues.length !== 0) {
        finalIssues = transformIssues(initialIssues);
        createIssueIds(initialColumns, initialIssues);
        finalColumns = transformColumns(initialColumns, initialIssues);
    }
    else {
        createIssueIds(initialColumns, initialIssues);
        finalColumns = transformColumns(initialColumns, initialIssues);
        
    }

    transformedObj = {
        ...transformedObj,
        columns: finalColumns,
        issues: finalIssues,
        columnOrder: [],
        boardId: obj.boardId,
    }

    createColumnOrder(initialColumns, transformedObj);

    return transformedObj;
}


function transformIssues(issues) {
    let keys = [];
    let finalIssues = {};
    let currentObj = {};

    

    for (let i = 0; i < issues.length; i++) {
        keys[i] = 'issue-' + issues[i]['issue_id'];
    }

    for (let i = 0; i < issues.length; i++) {
        currentObj = issues[i];

        finalIssues = {
            ...finalIssues,
            [keys[i]]: {
                issueId: keys[i],
                summary: currentObj.summary,
                description: currentObj.description,
                position: currentObj.position,
                columnId: currentObj.column_id,
                type: currentObj.type,
                index: currentObj.issueIndex.toString(),
                //comments: currentObj.comments,
                priority: currentObj.priority,
                reporter_username: currentObj.reporter_username,
                reporter_avatar: currentObj.reporter_avatar,
                assignee_username: currentObj.assignee_username,
                assignee_avatar: currentObj.assignee_avatar,
            }
        }
    }

    return finalIssues;
}

function transformColumns(columns) {
    let keys = [];
    let currentObj = {};

    let finalColumns = {};

    for (let i = 0; i < columns.length; i++) {
        keys[i] = 'column-' + columns[i]['column_id'];
    }

    for (let i = 0; i < columns.length; i++) {
        for (let j = 0; j < columns.length; j++) {
            if (columns[i].position === j) {
                currentObj = columns[i];
            }
        }

        finalColumns = {
            ...finalColumns,
            [keys[i]]: {
                columnId: keys[i],
                title: currentObj.title,
                issueIds: currentObj.issueIds,
                position: currentObj.position,
            } 
        }
    }

    return finalColumns;
}

function createIssueIds(columns, issues) {

    let currentColId;
    let prevColId = currentColId;
    let current;

    if (issues.length !== 0) {
        currentColId = issues[0]['column_id'];
    }

    for (let i = 0; i < columns.length; i++) {
        columns[i].issueIds = [];
    }

    //Testing
    if (issues.length === 0) {
        return;
    }

    for (let i = 0; i < issues.length; i++) {
        currentColId = issues[i]['column_id'];
        current = columns.find(column => column['column_id'] === currentColId);
        
        if (prevColId !== currentColId) {
            prevColId = currentColId;
            current = columns.find(column => column['column_id'] === currentColId);
        }

        current.issueIds.push("issue-" + issues[i]['issue_id']);
    }
}

function createColumnOrder(columns, obj) {
    for (let i = 0; i < columns.length; i++) {
        obj.columnOrder.push("column-" + columns[i]['column_id']);
    }
}

