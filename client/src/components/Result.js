import React from 'react';
import { Card } from 'react-bootstrap';

const Result = ({data}) => {
    return(
        <Card className="ml-2 result" style={{ width: '400px' }}>
            <Card.Header>Result</Card.Header>
            <Card.Body className="result-body">
                <pre>{ data ? JSON.stringify(data,null,2) : '{}' }</pre>
            </Card.Body>
        </Card>
    );
}

export default Result;