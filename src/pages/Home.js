import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { GetCityListWithoutAuthorization, RetrieveTariffListWithoutAuthorization } from '../services/Services'
import ServiceCaller from '../services/ServiceCalling/ServiceCaller';
import { ClientSideRowModelSteps } from 'ag-grid-community';
import axios from 'axios';

function Home(props) { //fonksiyonumuza bilgiler props ile geliyor
  const [cityList, setCityList] = useState([]) // servisimizi useState ile tanımlıyoruz.

  const [CityName, setCityName] = useState("")//tablo onclick için tanımlanan row usestateleri
  const [ISSCode, setISSCode] = useState("")

  useEffect(() => { //servisin ne zaman ve nasıl render edileceği
    async function PageLoad() {
      let cities = await ServiceCaller.GetCityListWithoutAuthorization(props)
      console.log("cities", cities)
      setCityList(cities[0])

      //let tariffs = await ServiceCaller.RetrieveTariffListWithoutAuthorization(props)
      //console.log("tariffs",tariffs)
    }
    PageLoad()
  }, [props])

//onclick işlemi için input parametrelerini tanımlıyoruz.
  const onCellClicked = params => {
    setCityName(params.data.CityName)
    setISSCode(params.data.ISSCode)
  }

  const columnDefs = [ //servisteki kolon adı bilgilerini tabloya veriyoruz
    { headerName: "Şehir Adı", field: "CityName", },
    { headerName: "Şehir Kodu", field: "ISSCode" },
  ]
  return (
    <div className="App">
      <h1 align="center">Şehir Listesi</h1>
      <Grid item xs={12} container>
        <Grid item xs={5} style={{ fontWeight: '600', textAlign: 'left', borderRadius: '6px', marginLeft: '8%' }}>
          <div style={{ height: '12vw', display: 'flex', msFlexDirection: 'row', width: '100%', marginTop: '2%', marginLeft: '5%' }}>
          </div>
          <div style={{ flexDirection: 'row', display: 'flex', marginTop: '-28.7%' }}>
            <Typography style={pageStyle.labelStyle}>Şehir Adı:</Typography>
            <input value={CityName} onChange={value => setCityName(value.target.value)} style={pageStyle.inputStyle} /> 
          </div>
        </Grid>
        <Grid item xs={5} style={{ fontWeight: '600', textAlign: 'left', borderRadius: '6px' }}>
          <div style={{ height: '12vw', display: 'flex', flexDirection: 'column', width: '100%', marginTop: '2%', marginRight: '10%' }}>

            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <Typography style={pageStyle.labelStyle}>Şehir Kodu:</Typography>
              <input value={ISSCode} onChange={value => setISSCode(value.target.value)} style={pageStyle.inputStyle} />
            </div>
          </div>
        </Grid>
      </Grid>
      <div style={{ height: '12vw', width: '100%' }}>
        <Button style={{ color: ' #fff', width: '185px', backgroundColor: ' #18FFFF', boxShadow: '0 0 0.6vw 0 #aeaeae', marginLeft: '22%', marginTop: '-8%' }}>
          <Typography style={{ width: '60%', fontSize: '12px' }}>Yeni</Typography>
        </Button>
      </div>
      <div className="ag-theme-alpine" style={{ height: '250px', width: '90%', marginLeft: '5%', marginTop: '-10%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          rowData={cityList}
          onCellClicked={onCellClicked}
          defaultColDef={{ flex: 1, minWidth: 100 }}>
        </AgGridReact>
      </div>
    </div>
  );
}
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
// servislerin isimlerini serviceCaller sayfasından alıp burada tanımlıyoruz.
export default connect(null, {
  GetCityListWithoutAuthorization,
  RetrieveTariffListWithoutAuthorization
})(Home);