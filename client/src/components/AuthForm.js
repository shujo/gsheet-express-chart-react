import React from 'react';
import { Card, Button, Form, Col, Row, Alert } from 'react-bootstrap';

const AuthForm = ({ worksheetId, onBtnClick, onDisconnect, onInputChange, worksheets, onWorksheetChange, headers, onHeaderChange, onValueChange, onLoadData, dataLoading }) => {
    return(
        <Card style={{ width: '420px' }}>
            <Card.Header>Configuration</Card.Header>
            <Card.Body>
                <Alert variant="warning" style={{ fontSize: '10.5px' }}>
                    <strong>gsheet-react-demo@gsheet-react-demo.iam.gserviceaccount.com</strong><br/>
                    Dont forget to add this email in your share settings in your spreadsheet.
                </Alert>
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
                            <Form.Label>Select Column for Chart Config:</Form.Label>
                            <Form.Group as={Row}>
                                <Form.Label column >Header:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control as="select" custom onChange={(e) => onHeaderChange(e.target.value)}>
                                        <option>Select Header</option>
                                        {headers && Array.from(headers).map((e, index) => {
                                            return <option key={index} value={e}>{e}</option>
                                        })}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Form.Group as={Row}>
                                <Form.Label column>Value:</Form.Label>
                                <Col sm={9}>
                                    <Form.Control className="mt-2" as="select" custom onChange={(e) => onValueChange(e.target.value)}>
                                        <option>Select Value</option>
                                        {headers && Array.from(headers).map((e, index) => {
                                            return <option key={index} value={e}>{e}</option>
                                        })}
                                    </Form.Control>
                                </Col>
                            </Form.Group>
                            <Button block variant="success" disabled={ dataLoading ? true : false } onClick={(e) => onLoadData(e)}>{ dataLoading ? "Loading..." : "Load Data" }</Button>
                        </React.Fragment>
                    )}
                    
                </Form>
            </Card.Body>
        </Card>
    )
}

export default AuthForm;