export const initialBoardData = {
    issues: {
        'issue-1': { 
            id: 'issue-1', 
            content: 'Finish homework', 
        },
        'issue-2': {
            id: 'issue-2', 
            content: 'Clean room',
        },
        'issue-3': {
            id: 'issue-3', 
            content: 'Go to the gym',
        },
        'issue-4': {
            id: 'issue-4', 
            content: 'Mow the lawn',
        }
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'User Story',
            issueIds: ['issue-1', 'issue-2', 'issue-3', 'issue-4'],
        },
        'column-2': {
            id: 'column-2',
            title: 'To do',
            issueIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'In Progress',
            issueIds: [],
        },
        'column-4': {
            id: 'column-4',
            title: 'Done',
            issueIds: [],
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3', 'column-4'],
};  