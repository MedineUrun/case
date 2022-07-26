import React, { useState, useEffect, Component, CSSProperties } from 'react';
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import Button from '@mui/material/Button';
import NumberFormat from 'react-number-format';
import ServiceCaller from '../services/ServiceCalling/ServiceCaller';
import { GetHolidays, CreateHoliday,UpdateHoliday } from '../services/Services'
import moment from 'moment';

 function MaterialUiPage(props) {

    const [columnDefs, setColumnDefs] = useState([

        { headerName: 'Tatil Adı', field: "NameOfHoliday", sortable: true, filter: true, width: 678 },
        { headerName: 'Tatil Günü', field: "Holiday", sortable: true, filter: true, width: 678 },

    ]);

     const defaultColDef = {
       width: 'auto',
        editable: true,
    };
 
    const [selectedValue, setSelectedValue] = React.useState('a');
    const [txtHolidayName, setTxtHolidayName] = useState("")
    const [dtHoliday, setDtHoliday] = useState("")
    const [holidayList, setHolidayList] = useState([])
    const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true)
    const [isUpdateBtnDisabled, setIsUpdateBtnDisabled] = useState(true)
    const [selectedHoliday, setSelectedHoliday] = useState({})

    useEffect(()=>{
        async function PageLoad(){
            let holidays = await ServiceCaller.GetHolidays(props)
            setHolidayList(holidays[0])
            console.log("🚀 ~ file: ExamplePages.js ~ line 24 ~ PageLoad ~ holidays", holidays)
        }
        PageLoad()
    },[props])

    const ClearHolidayFields = () => {
        setIsSaveBtnDisabled(false)
        setIsUpdateBtnDisabled(true)
    }

     const AddNewHoliday = async() => {
         let concreteHoliday = {}
         concreteHoliday.NameOfHoliday = txtHolidayName;

         if (dtHoliday === "") {
             alert("Lütfen geçerli bir tarih giriniz")
             return;
         }
         concreteHoliday.Holiday = moment(dtHoliday, "DD.MM.YYYY").format();
         console.log("🚀 ~ file: ExamplePages.js ~ line 65 ~ AddNewHoliday ~ concreteHoliday", concreteHoliday)

         try {
             let strHoliday = await ServiceCaller.CreateHoliday(props,concreteHoliday);
             console.log("🚀 ~ file: ExamplePages.js ~ line 65 ~ AddNewHoliday ~ strHoliday", strHoliday)
             setHolidayList(strHoliday[0])

             setTxtHolidayName("")
             setDtHoliday("")
             setIsSaveBtnDisabled(true)
         }
         catch (error) {
             alert("Hata")
         }
     }

     const UpdateHoliday = async() => {
        let concreteHoliday = selectedHoliday
        concreteHoliday.NameOfHoliday = txtHolidayName;
        
        if (dtHoliday === "") {
            alert("Lütfen geçerli bir tarih giriniz")
            return;
        }
        concreteHoliday.Holiday = moment(dtHoliday, "DD.MM.YYYY").format();

        try
        {
            let strHoliday = await ServiceCaller.UpdateHoliday(props,concreteHoliday);
            console.log("🚀 ~ file: ExamplePages.js ~ line 92 ~ UpdateHoliday ~ strHoliday", strHoliday)
            setHolidayList(strHoliday[0])

            setTxtHolidayName("")
            setDtHoliday("")
            setIsUpdateBtnDisabled(true)
            setIsSaveBtnDisabled(true)
        }
        catch (error)
        {
            alert("hata")
        }
    }

     const handleSelectedHoliday = (e) =>{ //tabloda row tıklandığında inputlara girdi olarak data verilme işleminin yapıldığı yer.
        console.log("🚀 ~ file: ExamplePages.js ~ line 81 ~ handleSelectedHoliday ~ e", e.data)
        let data = e.data
        setSelectedHoliday(data)
        setTxtHolidayName(data.NameOfHoliday)
        setDtHoliday(moment(data.Holiday).format("DD.MM.YYYY"))
        setIsUpdateBtnDisabled(false)
        setIsSaveBtnDisabled(true)
     }
    
    return (
        <div className='container' style={{ width: '100%', }}>
            <Grid container xs={12} className='divStyle' style={{ borderWidth: 0.5, width: '100%', marginTop: '0.75vw', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                <Grid item xs={12} className='divStyle' style={{ borderRadius: '6px', backgroundColor: '#42A5F5' }}>
                    <div style={{ marginLeft: '0.5%', marginTop: '-1.5%', marginBottom: '3.2%' }}>
                        <h6 style={{ color: 'white' }}>Yetki Devir İşlemleri</h6>
                    </div>
                    <Card style={{ height: 'auto', width: '100%', borderRadius: '8px', overflow: 'visible', marginTop: '-3%' }}>
                        <div style={{ flexDirection: 'row', width: '100%', display: 'flex' }}>
                            <Typography style={pageStyle.labelStyle}>Tatil Adı:</Typography>
                            <div style={{ width: '65%', }}>
                                <input value={txtHolidayName} onChange={(e) => setTxtHolidayName(e.target.value)} style={pageStyle.inputStyle} />
                            </div>
                        </div>
                        <div style={{ flexDirection: 'row', width: '100%', display: 'flex', marginBottom: '-1%' }}>
                            <Typography style={pageStyle.labelStyle}>Tatil Günü:</Typography>
                            <div style={{ width: '65%', }}>
                                <NumberFormat style={pageStyle.inputStyle} value={dtHoliday} onChange={(e) => setDtHoliday(e.target.value)} format="##.##.####" />
                            </div>
                        </div>
                        <Button
                        onClick={ClearHolidayFields} 
                        style={{ color: ' #fff', width: '160px', marginBottom: '1%', marginLeft: '3%', marginTop: '2%', backgroundColor: '#536DFE', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                            <Typography style={{ width: '40%', fontSize: '10px', marginRight: '13px' }}>Yeni</Typography>
                        </Button>
                        <Button 
                        onClick={AddNewHoliday}
                        disabled={isSaveBtnDisabled}
                        style={{ opacity:isSaveBtnDisabled ? 0.6 : 1,color: ' #fff', width: '160px', marginBottom: '1%', marginLeft: '3%', marginTop: '2%', backgroundColor: '#ff0000', boxShadow: '0 0 0.6vw 0 #aeaeae' }}
                        >
                            <Typography style={{ width: '40%', fontSize: '10px', marginRight: '13px' }}>Kaydet</Typography>
                        </Button>
                        <Button 
                        onClick={UpdateHoliday}
                        disabled={isUpdateBtnDisabled}
                        style={{ opacity:isUpdateBtnDisabled ? 0.6 : 1, color: ' #fff', width: '160px', marginBottom: '1%', marginLeft: '3%', marginTop: '2%', backgroundColor: '#388E3C', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                            <Typography style={{ width: '40%', fontSize: '10px', marginRight: '13px' }}>Güncelle</Typography>
                        </Button>
                    </Card>
                </Grid>
            </Grid>
            <Grid container  className='divStyle' style={{ borderWidth: 0.5, width: '100%', marginTop: '1%', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                <Grid item xs={12} className='divStyle' style={{ fontWeight: '600', textAlign: 'left', borderRadius: '6px 6px 0 0 ', backgroundColor: '#42A5F5' }}>
                    <div style={{ marginLeft: '0.5%', marginTop: '-1.5%', marginBottom: '3.2%' }}>
                        <h6 style={{ color: 'white' }}>Tatiller</h6>
                    </div>
                </Grid>
                <Grid item xs={12} container>
                    <div className="ag-theme-alpine" style={{ height: 400, width: '100%', marginTop: '-3%' }}>
                        <AgGridReact
                            rowData={holidayList}
                            defaultColDef={defaultColDef}
                            onRowClicked={handleSelectedHoliday}
                            rowSelection={'single'}
                            columnDefs={columnDefs}>
                        </AgGridReact>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
const pageStyle = {
    inputStyle: {
        width: '40%',
        height: '1.5vw',
        borderRadius: 3,
        boxShadow: '0 0 5px 0 #aeaeae',
        borderWidth: 0.5,
        borderColor: '#aeaeae',
        marginRight: '1%',
        marginTop: '1%'
    },
    labelStyle: {
        width: '12%',
        fontSize: '0.90vw',
        textAlign: 'left',
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '1%'
    }
}

export default connect(null, {
    GetHolidays,
    CreateHoliday,
    UpdateHoliday
  })(MaterialUiPage);
