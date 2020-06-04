import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const AuthForm = ({ worksheetId, onBtnClick, onDisconnect, onInputChange, worksheets, onWorksheetChange, headers, onHeaderChange, onValueChange, onLoadData }) => {
    return(
        <Card style={{ width: '400px' }}>
            <Card.Header>Configuration</Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group>
                        <Form.Label>Google Spreadsheet ID:</Form.Label>
                        <Form.Control disabled={ Array.from(worksheets).length > 0 ? true : false } type="text" placeholder="Enter Google Spreadsheet ID"  value={worksheetId} onChange={(event) => onInputChange(event.target.value)} />
                    </Form.Group>
                    <Button variant="primary" disabled={ Array.from(worksheets).length > 0 ? true : false } type="submit" onClick={(e) => onBtnClick(e)}>Connect</Button>{' '}
                    {Array.from(worksheets).length > 0 && (
                        <Button variant="secondary" onClick={(e) => onDisconnect(e)}>Disconnect</Button>
                    )}

                    <hr/>
                    {Array.from(worksheets).length > 0 && (
                        <Form.Group>
                            <Form.Label>Worksheets</Form.Label>
                            <Form.Control as="select" custom onChange={(e) => onWorksheetChange(e.target.value)}>
                                <option>Select Sheet</option>
                                {worksheets && Array.from(worksheets).map(sheet => {
                                    return <option key={sheet.index} value={sheet.sheetId}>{sheet.title}</option>
                                })}
                            </Form.Control>
                        </Form.Group>
                    )}

                    {Array.from(headers).length > 0 && (
                        <React.Fragment>
                            <Form.Group>
                                <Form.Label>Select Chart Config:</Form.Label>
                                <Form.Control as="select" custom onChange={(e) => onHeaderChange(e.target.value)}>
                                    <option>Select Header</option>
                                    {headers && Array.from(headers).map((e, index) => {
                                        return <option key={index} value={e}>{e}</option>
                                    })}
                                </Form.Control>
                                <Form.Control className="mt-2" as="select" custom onChange={(e) => onValueChange(e.target.value)}>
                                    <option>Select Value</option>
                                    {headers && Array.from(headers).map((e, index) => {
                                        return <option key={index} value={e}>{e}</option>
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Button variant="primary" onClick={(e) => onLoadData(e)}>Load Data</Button>
                        </React.Fragment>
                    )}
                    
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AuthForm;