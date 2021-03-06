import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import randomColor from 'randomcolor';

import Navbar from './components/Navbar';
import Chart from './components/Chart';
import AuthForm from './components/AuthForm';
import Result from './components/Result';

import { getWorksheets, getWorksheetId, getHeaders, getRows } from './services/gsheet.service';
const App = () => {
  const [ worksheetId, setWorksheetId ] = useState('');
  const [ worksheets, setWorksheets ] = useState([]);
  const [ headers, setHeaders ] = useState([]);
  const [selectedHeader, setSelectedHeader] = useState('');
  const [selectedChartData, setSelectedChartData] = useState({ header: '', value: '' })
  
  const [data, setData] = useState([])
  const [dataLoading, setDataLoading] = useState(false);

  useEffect(() =>{
    //1Gt6Z_c2OsxZaE4P0qyJUJ8v4PjdF1DcQO-HiH6XQjQw'
    let wsId = getWorksheetId();
    setWorksheetId(wsId)
    if(wsId){
      loadWorksheets(wsId)
    }
  },[])
  
  const loadWorksheets = async (id) => {
    try {
      let response = await getWorksheets(id);
      setWorksheets(response.data);
    } catch (error) {
      alert(error.response.data.message);
    }
  }

  const loadHeaders = async (worksheetId, sheetId) => {
    try {
      let response = await getHeaders(worksheetId, sheetId);
      setHeaders(response.data);
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  const loadRows = async (worksheetId, sheetId, headers) => {
    try {
      setDataLoading(true)
      let response = await getRows(worksheetId, sheetId, headers)
      
      let result = response.data.map(e => {
        return {
          title: e.title,
          value: parseInt(e.value),
          color: randomColor({ luminosity: 'dark', format: 'rgb' })
        }
      })
      setData(result);
    } catch (error) {
      alert(error.response.data.message);
    }
    finally{
      setDataLoading(false)
    }
  }

  const onBtnClick = (e) => {
    e.preventDefault();
    localStorage.setItem('worksheetid', worksheetId);
    loadWorksheets(worksheetId)
  }

  const onWorksheetChange = (value) => {
    if(value === 'Select Sheet'){
      setSelectedHeader('')
      setHeaders([]);
    }else{
      loadHeaders(worksheetId, value)
      setSelectedHeader(value)
    }
  }

  const onHeaderChange = (e) => {
    if(e !== 'Select Header'){
      setSelectedChartData({...selectedChartData, header: e })
    }else{
      setSelectedChartData({...selectedChartData, header: '' })
    }
  }

  const onValueChange = (e) => {
    if(e !== 'Select Value'){
      setSelectedChartData({...selectedChartData, value: e })
    }else{
      setSelectedChartData({...selectedChartData, value: '' })
    }
  }

  const onLoadData = (e) => {
    e.preventDefault();
    if(selectedChartData.header === '' || selectedChartData.value === ''){
      alert("Please select header or value for chart config!")
    }else{
      let columnHeaders = Object.values(selectedChartData)
      loadRows(worksheetId,selectedHeader,columnHeaders)
    }
  }

  const onDisconnect = (e) => {
    e.preventDefault();

    localStorage.clear();
    setWorksheetId('');
    setWorksheets([]);
    setHeaders([]);
    setSelectedHeader('');
    setSelectedChartData([]);
    setData([]);
  }

  return(
    <React.Fragment>
      <Navbar fixed dark={true} color="primary"/>
      <Container fluid>
        <Row  className="py-3 px-3">
          <AuthForm
            onDisconnect={onDisconnect}
            onInputChange={setWorksheetId}
            onBtnClick={onBtnClick}
            worksheetId={worksheetId}
            worksheets={worksheets}
            onWorksheetChange={onWorksheetChange}
            headers={headers}
            onHeaderChange={onHeaderChange}
            onValueChange={onValueChange}
            onLoadData={onLoadData}
            dataLoading={dataLoading}
          />
          <Result data={data} />
          <Chart data={data}/>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default App;
