import axios from 'axios';

export const getWorksheetId = () => {
    const worksheetid = localStorage.getItem('worksheetid');
    if(worksheetid){
        return worksheetid;
    }else{
        return ''
    }
}

export const getWorksheets = worksheetId => {
    return axios.get(`/api/gsheet/get-worksheets?worksheetId=${worksheetId}`);
}

export const getHeaders = (worksheetId, sheetId) => {
    return axios.get(`/api/gsheet/get-headers?worksheetId=${worksheetId}&sheetId=${sheetId}&removeEmptyVal=true`);
}

export const getRows = (worksheetId, sheetId, headers) => {
    const body = {
        headers
    }
    console.log(body)
    return axios.post(`/api/gsheet/get-rows?worksheetId=${worksheetId}&sheetId=${sheetId}`, body);
}