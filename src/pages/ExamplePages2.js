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
import { RetrieveConstructionTypes, CreateConstructionType, UpdateConstructionType } from '../services/Services'
import moment from 'moment';
import Checkbox from '@mui/material/Checkbox';


function MaterialUiPage(props) {

    const [columnDefs, setColumnDefs] = useState([

        { headerName: 'Emlak inşaat sınıf kodu', field: "ConstructionTypeCode", sortable: true, filter: true, width: 678 },
        { headerName: 'Emlak inşaat sınıf adı', field: "ConstructionTypeName", sortable: true, filter: true, width: 678 },

    ]);

    const [constructionList, setConstructionList] = useState([])
    const [txtConstructionTypeCode, setTxtConstructionTypeCode] = useState("")
    const [txtConstructionTypeName, setTxtConstructionTypeName] = useState("")
    const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true)
    const [isUpdateBtnDisabled, setIsUpdateBtnDisabled] = useState(true)
    const [chkIsConstructionTypeActive, setChkIsConstructionTypeActive] = useState(false)
    

    useEffect(() => {
        async function PageLoad() {
            let construction = await ServiceCaller.RetrieveConstructionTypes(props)
            setConstructionList(construction[0])
            console.log("construction", construction)
        }
        PageLoad()
    }, [props])

    const defaultColDef = {
        width: 'auto',
        editable: true,
    };

    const onCellClicked = (e) => {
        console.log("onCellClicked", e.data)
        let data = e.data
        setTxtConstructionTypeCode(data.ConstructionTypeCode)
        setTxtConstructionTypeName(data.ConstructionTypeName)
        setChkIsConstructionTypeActive(data.IsActive)
    }


    const ClearConstructionFields = () => {
        setIsSaveBtnDisabled(false)
        setIsUpdateBtnDisabled(true)
    }

    const CreateConstructionType = async () => {

        let constructionType = {}
        constructionType.ConstructionTypeName = txtConstructionTypeName;
        constructionType.IsActive = chkIsConstructionTypeActive;

        try {
            let strConstructionTypes = await ServiceCaller.CreateConstructionType(props, constructionType);
            console.log("strConstructionTypes", strConstructionTypes)
            strConstructionTypes(strConstructionTypes[0])
            alert("Emlak sınıf türü başarıyla kaydedildi.")


        }
        catch (error) {
            alert("Hata")
        }
    }

    return (
        <div className='container' style={{ width: '100%', }}>
            <Grid container xs={12} className='divStyle' style={{ borderWidth: 0.5, width: '100%', marginTop: '0.75vw', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                <Grid item xs={12} className='divStyle' style={{ borderRadius: '6px', backgroundColor: '#42A5F5' }}>
                    <div style={{ marginLeft: '0.5%', marginTop: '-1.5%', marginBottom: '3.2%' }}>
                        <h6 style={{ color: 'white' }}>Emlak İnşaat Türü</h6>
                    </div>
                    <Card style={{ height: 'auto', width: '100%', borderRadius: '8px', overflow: 'visible', marginTop: '-3%' }}>
                        <div style={{ flexDirection: 'row', width: '100%', display: 'flex' }}>
                            <Typography style={pageStyle.labelStyle}>Emlak İnşaat Türü Kodu:</Typography>
                            <div style={{ width: '65%', }}>
                                <input value={txtConstructionTypeCode} onChange={(e) => setTxtConstructionTypeCode(e.target.value)} style={pageStyle.inputStyle} />
                            </div>
                        </div>
                        <div style={{ flexDirection: 'row', width: '100%', display: 'flex', marginBottom: '-1%' }}>
                            <Typography style={pageStyle.labelStyle}>Emlak İnşaat Türü Adı:</Typography>
                            <div style={{ width: '65%', }}>
                                <input value={txtConstructionTypeName} onChange={(e) => setTxtConstructionTypeName(e.target.value)} style={pageStyle.inputStyle} />
                            </div>
                        </div>
                        <div style={{ marginTop: '0.90%', flexDirection: 'row', width: '100%', display: 'flex', marginBottom: '-1%' }}>
                            <Typography style={pageStyle.labelStyle}>Aktif:</Typography>
                            <input checked={chkIsConstructionTypeActive} onChange={(e)=>setChkIsConstructionTypeActive(e.target.checked)} style={{ marginLeft: '-0.90%' }} type='checkbox'/>
                        </div>
                        <Button
                            onClick={ClearConstructionFields}
                            style={{ color: ' #fff', width: '160px', marginBottom: '1%', marginLeft: '3%', marginTop: '1%', backgroundColor: '#536DFE', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                            <Typography style={{ width: '40%', fontSize: '10px', marginRight: '13px' }}>Yeni</Typography>
                        </Button>
                        <Button
                            onClick={CreateConstructionType}
                            disabled={isSaveBtnDisabled}
                            style={{ opacity: isSaveBtnDisabled ? 0.6 : 1, color: ' #fff', width: '160px', marginBottom: '1%', marginLeft: '3%', marginTop: '1%', backgroundColor: '#ff0000', boxShadow: '0 0 0.6vw 0 #aeaeae' }}
                        >
                            <Typography style={{ width: '40%', fontSize: '10px', marginRight: '13px' }}>Kaydet</Typography>
                        </Button>
                        <Button
                            style={{ opacity: isUpdateBtnDisabled ? 0.6 : 1, color: ' #fff', width: '160px', marginBottom: '1%', marginLeft: '3%', marginTop: '1%', backgroundColor: '#388E3C', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                            <Typography style={{ width: '40%', fontSize: '10px', marginRight: '13px' }}>Güncelle</Typography>
                        </Button>
                    </Card>
                </Grid>
            </Grid>
            <Grid container className='divStyle' style={{ borderWidth: 0.5, width: '100%', marginTop: '1%', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                <Grid item xs={12} className='divStyle' style={{ fontWeight: '600', textAlign: 'left', borderRadius: '6px 6px 0 0 ', backgroundColor: '#42A5F5' }}>
                    <div style={{ marginLeft: '0.5%', marginTop: '-1.5%', marginBottom: '3.2%' }}>
                        <h6 style={{ color: 'white' }}>Emlak İnşaat Türleri</h6>
                    </div>
                </Grid>
                <Grid item xs={12} container>
                    <div className="ag-theme-alpine" style={{ height: 400, width: '100%', marginTop: '-3%' }}>
                        <AgGridReact
                            rowData={constructionList}
                            defaultColDef={defaultColDef}
                            rowSelection={'single'}
                            onRowClicked={onCellClicked}
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
    RetrieveConstructionTypes,
    CreateConstructionType,
    UpdateConstructionType,
})(MaterialUiPage);
