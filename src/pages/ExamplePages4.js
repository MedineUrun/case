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
import { GetNextExemptionCode, SaveExemption, UpdateExemption, RetrieveExemptions, RetrieveParametersWithoutAuthorization } from '../services/Services'
import moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
import Select from 'react-select'
import ParameterConstants from '../actions/Constants/ParameterConstants';

function ExportPages4(props) {

    const [expenseRatios, setExpenseRatios] = useState([]); //rowdata gibi düşün
    const [selectedExpenseRatio, setSelectedExpenseRatio] = useState(null)
    const [txtExemptionCode, setTxtExemptionCode] = useState("")
    const [txtExemptionName, setTxtExemptionName] = useState("")
    const [txtExemptionRatio, setTxtExemptionRatio] = useState("")
    const [cboExpenseType, setCboExpenseType] = useState({ selectedExpenseType: null, expenseTypeList: [] }) //select için yazılan useState.
    const [chkIsActive, setChkIsActive] = useState("")
    const [chkCanBeTransferred, setChkCanBeTransferred] = useState("")
    const [chkIsForCertainPeriod, setChkIsForCertainPeriod] = useState("")
    const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true)
    const [isUpdateBtnDisabled, setIsUpdateBtnDisabled] = useState(true)


    const [columnDefs, setColumnDefs] = useState([

        { headerName: 'Muhafiyet Kodu', field: "ExemptionCode", sortable: true, filter: true, width: 195 },//fielda gelen isimler aspx de dataındex ile alınmalı yani konsoldaki veri adları da olabilir
        { headerName: 'Muhafiyet Adı', field: "ExemptionName", sortable: true, filter: true, width: 195 },
        { headerName: 'Muhafiyet Oranı', field: "ExemptionRatio", sortable: true, filter: true, width: 195 },
        { headerName: 'Muhafiyet Tipi', field: "ExemptionType", sortable: true, filter: true, width: 195 },
        { headerName: 'Aktif Muhafiyet', field: "IsActive", sortable: true, filter: true, width: 195 },
        { headerName: 'Devredilebilir', field: "CanBeTransferred", sortable: true, filter: true, width: 195 },
        { headerName: 'Belirli Süreli mi', field: "IsForCertainPeriod", sortable: true, filter: true, width: 195 },

    ]);

    useEffect(() => {

        async function PageLoad() {
            let expense = await ServiceCaller.RetrieveExemptions(props)
            console.log("expense", expense[0])
            setExpenseRatios(expense[0])

            let exemptionType = await ServiceCaller.RetrieveParametersWithoutAuthorization(props, ParameterConstants.PARAMETER_TYPE_CODE_EXEMPTION_TYPES)
            console.log("exemptionType", exemptionType[0])
            setCboExpenseType(x => ({ ...x, expenseTypeList: exemptionType[0] }))
        }
        PageLoad()
    }, [props])


    const defaultColDef = {
        width: 'auto',
        editable: true,
    };

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            borderBottom: '1px dotted pink',
            color: state.isSelected ? 'red' : 'green',
            padding: 20,
            width: '100%'
        }),
        control: (styles) => ({ ...styles, backgroundColor: 'white', width: '62%' }),
        singleValue: (provided, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';

            return { ...provided, opacity, transition };
        }
    }


    const ClearFields = () => {
        txtExemptionCode.Clear();
        txtExemptionName.Clear();
        txtExemptionRatio.Clear();
        chkIsActive.Checked = true;
        cboExpenseType.ClearValue();
        chkCanBeTransferred.Checked = false;
        chkIsForCertainPeriod.Checked = true;
    }

    const onCellClicked = (e) => {
        console.log("onCellClicked", e.data)
        let data = e.data
        setSelectedExpenseRatio(data)

        setTxtExemptionCode(data.ExemptionCode)
        setTxtExemptionName(data.ExemptionName)
        setTxtExemptionRatio(data.ExemptionRatio)
        setCboExpenseType(x => ({ ...x, selectedExpenseType: data.ExemptionType }))
        setChkIsActive(data.IsActive)
        setChkCanBeTransferred(data.CanBeTransferred)
        setChkIsForCertainPeriod(data.IsForCertainPeriod)
        setIsSaveBtnDisabled(true)
        setIsUpdateBtnDisabled(false)
    }


    const ClearConstructionFields = () => {
        setIsSaveBtnDisabled(false)
        setIsUpdateBtnDisabled(true)
    }

    const CreateExemption = async () => {
        try {
            let exemption = {};
            exemption.ExemptionCode = parseInt(txtExemptionCode);
            exemption.ExemptionName = txtExemptionName;
            exemption.ExemptionRatio = parseFloat(txtExemptionRatio);
            exemption.IsActive = chkIsActive;

            if(!cboExpenseType.selectedExpenseType) {
                alert("Muafiyet tipi seçmediniz.")
                return;
            }

            let selectedExemptionType = cboExpenseType.selectedExpenseType.ParameterCode;
            exemption.ExemptionType = selectedExemptionType;
            exemption.IsForCertainPeriod = chkIsForCertainPeriod;
            if (selectedExemptionType === ParameterConstants.PARAMETER_CODE_PROTOCOL_BASED_EXEMPTION_TYPE) {
                exemption.CanBeTransferred = chkCanBeTransferred;
            } else {
                exemption.CanBeTransferred = false;
            }

            let result = await ServiceCaller.SaveExemption(props, exemption);
            setExpenseRatios(result[0]);

            //ClearFields();
            // DisableFields();*/
        } catch (error) {
            console.log(error)
            alert("Hata")
        }
    }


    return (
        <div className='container' style={{ width: '100%', }}>
            <Grid container xs={12} className='divStyle' style={{ borderWidth: 0.5, width: '100%', marginTop: '0.75vw', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                <Grid item xs={12} className='divStyle' style={{ borderRadius: '6px', backgroundColor: '#42A5F5' }}>
                    <div style={{ marginLeft: '0.5%', marginTop: '-1.5%', marginBottom: '3.2%' }}>
                        <h6 style={{ color: 'white' }}>Yetki Devir İşlemleri</h6>
                    </div>
                    <Card style={{ height: 'auto', width: '100%', borderRadius: '8px', overflow: 'visible', marginTop: '-3%' }}>
                        <Grid container xs={12} className='divStyle'  >
                            <Grid item xs={4} className='divStyle' style={{ marginTop: '1%' }} >

                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex' }}>
                                    <Typography style={pageStyle.labelStyle}>Muhafiyet Kodu:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <input value={txtExemptionCode} onChange={(e) => setTxtExemptionCode(e.target.value)} style={pageStyle.inputStyle} />
                                    </div>
                                </div>

                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex', marginBottom: '1%' }}>
                                    <Typography style={pageStyle.labelStyle}>Muhafiyet Adı:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <input value={txtExemptionName} onChange={(e) => setTxtExemptionName(e.target.value)} style={pageStyle.inputStyle} />
                                    </div>
                                </div>
                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex' }}>
                                    <Typography style={pageStyle.labelStyle}>Muhafiyet Tipi:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <Select
                                            styles={customStyles}
                                            value={cboExpenseType.selectedTestSelect}
                                            onChange={e => setCboExpenseType(x => ({ ...x, selectedExpenseType: e }))}
                                            options={cboExpenseType.expenseTypeList}
                                            getOptionLabel={x => x.ParameterName}
                                            getOptionValue={x => x.ParameterCode}
                                        />
                                    </div>
                                </div>

                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex', marginBottom: '1%', marginTop: '0.80%' }}>
                                    <Typography style={pageStyle.labelStyle}>Muhafiyet Oranı:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <input value={txtExemptionRatio} onChange={(e) => setTxtExemptionRatio(e.target.value)} style={pageStyle.inputStyle} />
                                    </div>
                                </div>

                            </Grid>

                            <Grid item xs={4} className='divStyle' style={{ borderRadius: '6px', marginTop: '1%' }}>
                                <div style={{ marginTop: '0.90%', flexDirection: 'row', width: '100%', display: 'flex', marginBottom: '-1%', marginLeft: '8%' }}>
                                    <Typography style={pageStyle.labelStyle}>Muhafiyet Listesi:</Typography>
                                    <input checked={chkIsActive} onChange={(e) => setChkIsActive(e.target.checked)} style={{ marginLeft: '-0.90%' }} type='checkbox' />
                                </div>

                                <div style={{ marginTop: '0.90%', flexDirection: 'row', width: '100%', display: 'flex', marginBottom: '-1%', marginLeft: '8%' }}>
                                    <Typography style={pageStyle.labelStyle}>Devredilebilir:</Typography>
                                    <input checked={chkCanBeTransferred} onChange={(e) => setChkCanBeTransferred(e.target.checked)} style={{ marginLeft: '-0.90%' }} type='checkbox' />
                                </div>
                                <div style={{ marginTop: '0.90%', flexDirection: 'row', width: '100%', display: 'flex', marginBottom: '-1%', marginLeft: '8%' }}>
                                    <Typography style={pageStyle.labelStyle}>Belirli Süreli mi?</Typography>
                                    <input checked={chkIsForCertainPeriod} onChange={(e) => setChkIsForCertainPeriod(e.target.checked)} style={{ marginLeft: '-0.90%' }} type='checkbox' />
                                </div>
                            </Grid>

                            <Grid item xs={4} className='divStyle' style={{ borderRadius: '6px', marginTop: '1%' }}>

                                <Button
                                    onClick={ClearConstructionFields}
                                    style={{ color: ' #fff', width: '100px', marginBottom: '8%', marginLeft: '3%', marginTop: '3%', backgroundColor: 'blue', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                                    <Typography style={{ width: '30%', fontSize: '10px', marginRight: '13px' }}>Yeni</Typography>
                                </Button>
                                <Button
                                    onClick={CreateExemption}
                                    disabled={isSaveBtnDisabled}
                                    style={{ opacity: isSaveBtnDisabled ? 0.6 : 1, color: ' #fff', width: '100px', marginBottom: '8%', marginLeft: '3%', marginTop: '3%', backgroundColor: '#ff0000', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                                    <Typography style={{ width: '30%', fontSize: '10px', marginRight: '13px' }}>Kaydet</Typography>
                                </Button>
                                <Button
                                    disabled={isUpdateBtnDisabled}
                                    style={{ opacity: isUpdateBtnDisabled ? 0.6 : 1, color: ' #fff', width: '100px', marginBottom: '8%', marginLeft: '3%', marginTop: '3%', backgroundColor: '#388E3C', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                                    <Typography style={{ width: '30%', fontSize: '10px', marginRight: '13px' }}>Güncelle</Typography>
                                </Button>

                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
            <Grid container className='divStyle' style={{ borderWidth: 0.5, width: '100%', marginTop: '1%', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                <Grid item xs={12} className='divStyle' style={{ fontWeight: '600', textAlign: 'left', borderRadius: '6px 6px 0 0 ', backgroundColor: '#42A5F5' }}>
                    <div style={{ marginLeft: '0.5%', marginTop: '-1.5%', marginBottom: '3.2%' }}>
                        <h6 style={{ color: 'white' }}>Masraf Oranları</h6>
                    </div>
                </Grid>
                <Grid item xs={12} container>
                    <div className="ag-theme-alpine" style={{ height: 400, width: '100%', marginTop: '-3%' }}>
                        <AgGridReact
                            rowData={expenseRatios}
                            defaultColDef={defaultColDef}
                            rowSelection={'single'}
                            onCellClicked={onCellClicked}
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
        width: '60%',
        height: '1.5vw',
        borderRadius: 3,
        boxShadow: '0 0 5px 0 #aeaeae',
        borderWidth: 0.5,
        borderColor: '#aeaeae',
        marginRight: '1%',
        marginTop: '1%'
    },
    labelStyle: {
        width: '25%',
        fontSize: '0.90vw',
        textAlign: 'left',
        marginLeft: '3%',
        marginRight: '3%',
        marginTop: '1%'
    }
}
export default connect(null, {
    GetNextExemptionCode,
    SaveExemption,
    UpdateExemption,
    RetrieveExemptions,
    RetrieveParametersWithoutAuthorization
})(ExportPages4);
