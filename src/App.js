
import React, { useEffect, useState } from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';



function App() {

const [todo, setTodo] = useState();

useEffect(() => {
  fetch('https://belsoftintern.miktatcento.repl.co/countries')
  .then((response) => response.json())
  .then((data) => (console.log(data)))
  
}
)


/*
  useEffect(() => {
    fetch('https://belsoftintern.miktatcento.repl.co/countries')
    .then(response => response.json())
    .then(data => console.log(data.total));

  }, []);*/


  const urlEntry = 'https://belsoftintern.miktatcento.repl.co/insertCountry'
  const urlUpdate = 'https://belsoftintern.miktatcento.repl.co/updateCountry'
  const urlData = 'https://belsoftintern.miktatcento.repl.co/countries'


  const columnDefs = [
    { headerName: "Ülke Adı", field: "country" },
    { headerName: "Başkenti", field: "capital", },
    { headerName: "Nüfus", field: "population", },
    { headerName: "Şehir Sayısı", field: "citiesNumber" },
  ]
  const rowData = [
    { country: "Türkiye", capital: "Ankara", citiesNumber: 81, population: 80000000 },
    { country: "Almanya", capital: "Berlin", citiesNumber: 75, population: 850000000 },
    { country: "Fransa", capital: "Paris", citiesNumber: 55, population: 45000000 },
    { country: "Amerika", capital: "New York", citiesNumber: 106, population: 3000000000 },
  ]



  return (
    <div className="App">

      <h1 align="center">Belsoft Case</h1>
      <Grid item xs={12} container>
        <Grid item xs={5} style={{ fontWeight: '600', textAlign: 'left', borderRadius: '6px', marginLeft: '8%' }}>
          <div style={{ height: '12vw', display: 'flex', msFlexDirection: 'row', width: '100%', marginTop: '2%', marginLeft: '5%' }}>
          </div>
          <div style={{ flexDirection: 'row', display: 'flex', marginTop: '-28.7%' }}>
            <Typography style={pageStyle.labelStyle}>Ülke Adı:</Typography>
            <input style={pageStyle.inputStyle} />
          </div>
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <Typography style={pageStyle.labelStyle}>Nüfusu:</Typography>
            <input style={pageStyle.inputStyle} />
          </div>
        </Grid>

        <Grid item xs={5} style={{ fontWeight: '600', textAlign: 'left', borderRadius: '6px' }}>
          <div style={{ height: '12vw', display: 'flex', flexDirection: 'column', width: '100%', marginTop: '2%', marginRight: '10%' }}>

            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <Typography style={pageStyle.labelStyle}>Başkenti:</Typography>
              <input style={pageStyle.inputStyle} />
            </div>

            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <Typography style={pageStyle.labelStyle}>Şehir Sayısı:</Typography>
              <input style={pageStyle.inputStyle} />
            </div>
          </div>
        </Grid>

      </Grid>
      <div style={{ height: '12vw', width: '100%' }}>

        <Button style={{ color: ' #fff', width: '185px', backgroundColor: ' #18FFFF', boxShadow: '0 0 0.6vw 0 #aeaeae', marginLeft: '22%' }}>
          <Typography style={{ width: '60%', fontSize: '12px' }}>Yeni</Typography>
        </Button>


        <Button style={{ color: ' #fff', width: '185px', backgroundColor: ' #00ACC1', boxShadow: '0 0 0.6vw 0 #aeaeae', marginLeft: '10%' }}>
          <Typography style={{ width: '60%', fontSize: '12px' }}>Kaydet</Typography>
        </Button>


        <Button style={{ color: ' #fff', width: '185px', backgroundColor: ' #2E7D32', boxShadow: '0 0 0.6vw 0 #aeaeae', marginLeft: '10%' }}>
          <Typography style={{ width: '60%', fontSize: '12px' }}>Güncelle</Typography>
        </Button>

      </div>

      <div className="ag-theme-alpine" style={{ height: '250px', width: '90%', marginLeft: '5%', marginTop: '-7%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          defaultColDef={{ flex: 1, minWidth: 100 }}>
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;

const pageStyle = {
  inputStyle: {
    borderWidth: 0.5,
    fontSize: '1.05vw',
    borderRadius: '0.60vw',
    padding: '0px 3px',
    border: '0.07vw solid',
    boxShadow: 'none',
    overflow: 'visible',
    height: '38px',
    width: '50%',
    marginLeft: '5%',
    marginBottom: '1%',
    marginTop: '3%',


  },
  labelStyle: {
    width: '18%',
    fontSize: '1.20vw',
    textAlign: 'left',
    marginLeft: '10%',
    marginTop: '1.85vw'

  }


}