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
import { RetrieveParametersWithoutAuthorization, RetrieveExpenseRatioList, SaveExpenseRatio, UpdateExpenseRatio, GetHolidays } from '../services/Services'
import moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
import Select from 'react-select'
import ParameterConstants from '../actions/Constants/ParameterConstants';

function ExportPages3(props) {

    const [columnDefs, setColumnDefs] = useState([

        { headerName: 'Tip', field: "ConstructionTypeCode", sortable: true, filter: true, width: 195 },
        { headerName: 'Tarih', field: "ValidDate", sortable: true, filter: true, width: 195 },
        { headerName: 'Oran', field: "Ratio", sortable: true, filter: true, width: 195 },
        { headerName: 'Aralık Başlangıç Değeri', field: "IntervalStartValue", sortable: true, filter: true, width: 195 },
        { headerName: 'Aralık Bitiş Değeri', field: "IntervalFinishValue", sortable: true, filter: true, width: 195 },
        { headerName: 'Minimum Değer', field: "MinimumValue", sortable: true, filter: true, width: 195 },
        { headerName: 'Maksimum Değer', field: "MaximumValue", sortable: true, filter: true, width: 195 },

    ]);

    const [expenseRatios, setExpenseRatios] = useState([]);
    const [selectedExpenseRatio, setSelectedExpenseRatio] = useState(null)
    const [isSaveBtnDisabled, setIsSaveBtnDisabled] = useState(true)
    const [isUpdateBtnDisabled, setIsUpdateBtnDisabled] = useState(false)
    const [selectedConstructionType, setSelectedConstructionType] = useState({})
    const [dtValidDate, setDtValidDate] = useState("")
    const [txtRatio, setTxtRatio] = useState("")
    const [numIntervalStartValue, setNumIntervalStartValue] = useState("")
    const [numIntervalFinishValue, setNumIntervalFinishValue] = useState("")
    const [numMinumumValue, setNumMinumumValue] = useState("")
    const [numMaksimumValue, setNumMaksimumValue] = useState("")

    const [cboExpenseType, setCboExpenseType] = useState({ selectedExpenseType: null, expenseTypeList: [] }) //select için yazılan useState.

    useEffect(() => {
        async function PageLoad() {
            let expense = await ServiceCaller.RetrieveParametersWithoutAuthorization(props, ParameterConstants.PARAMETER_TYPE_EXPENSE_TYPE)
            console.log("expense", expense[0])
            setCboExpenseType(x => ({ ...x, expenseTypeList: expense[0] }))
        }
        PageLoad()
    }, [props])

    const defaultColDef = {
        width: 'auto',
        editable: true,
    };

    const RetrieveExpenseRatios = async (e) => { // e seçilen veri select kısmında
        setCboExpenseType(x => ({ ...x, selectedExpenseType: e }))

        //burada yeni şeyler yapabilirsin

        try {
            let expenseRatios_ = await ServiceCaller.RetrieveExpenseRatioList(props, e.ParameterCode);
            console.log("🚀 ~ file: ExamplePages3.js ~ line 57 ~ RetrieveExpenseRatios ~ expenseRatios", expenseRatios_)
            setExpenseRatios(expenseRatios_)
        }
        catch (error) {
            alert(error)
        }
    }

    const ClearConstructionFields = () => {
        setIsSaveBtnDisabled(false)
        setIsUpdateBtnDisabled(true)
    }

    const onCellClicked = (e) => {
        console.log("onCellClicked", e.data)
        let data = e.data
        setSelectedExpenseRatio(data)

        setIsUpdateBtnDisabled(false)
        setIsSaveBtnDisabled(true)
        setSelectedConstructionType(e.data)

        setDtValidDate(moment(data.ValidDate).format("DD.MM.YYYY"))
        setTxtRatio(data.Ratio)
        setNumIntervalStartValue(data.IntervalStartValue)
        setNumIntervalFinishValue(data.IntervalFinishValue)
        setNumMinumumValue(data.MinimumValue)
        setNumMaksimumValue(data.MaximumValue)
    }

    const CreateExpenseRatio = async () => {
        try {
            let expenseRatio = {}
            expenseRatio = SetConcreteExpenseRatioFields();
            console.log("🚀 ~ file: ExamplePages3.js ~ line 98 ~ CreateExpenseRatio ~ expenseRatio", expenseRatio)
            let expenseRatios_ = await ServiceCaller.SaveExpenseRatio(props, expenseRatio);
            console.log("🚀 ~ file: ExamplePages3.js ~ line 100 ~ CreateExpenseRatio ~ expenseRatios", expenseRatios_)
            setExpenseRatios(expenseRatios_)
        }
        catch (error) {
            console.log(error)
            alert("Hata")
        }
    }

    const SetConcreteExpenseRatioFields = () => {
        let expenseRatio = {};

        if (dtValidDate === "") {
            alert("Lütfen geçerli bir tarih giriniz")
            return;
        }
        expenseRatio.ValidDate = moment(dtValidDate, "DD.MM.YYYY").format();

        expenseRatio.ExpenseType = cboExpenseType.selectedExpenseType.ParameterCode;
        expenseRatio.Ratio = parseFloat(txtRatio.toString().replace(',', '.'));

        if (numIntervalStartValue !== "") {
            expenseRatio.IntervalStartValue = parseFloat(numIntervalStartValue.toString().replace(',', '.'));
        } else {
            expenseRatio.IntervalStartValue = 0.0;
        }
        if (numIntervalFinishValue !== "") {
            expenseRatio.IntervalFinishValue = parseFloat(numIntervalFinishValue.toString().replace(',', '.'));
        }
        else {
            expenseRatio.IntervalFinishValue = 0.0;
        }
        if (numMinumumValue !== "") {
            expenseRatio.MinimumValue = parseFloat(numMinumumValue.toString().replace(',', '.')); //parseFloat(numMinumumValue)
        }
        else {
            expenseRatio.MinimumValue = 0.0;
        }
        if (numMaksimumValue !== "") {
            expenseRatio.MaximumValue = parseFloat(numMaksimumValue.toString().replace(',', '.'));
        }
        else {
            expenseRatio.MaximumValue = 0.0;
        }
        return expenseRatio;
    }

    const UpdateExpenseRatio = async (e) => {

        try {
            if (selectedExpenseRatio) {
                let expenseRatio = { ...selectedExpenseRatio, ...SetConcreteExpenseRatioFields() };
                let expenseRatios_ = await ServiceCaller.UpdateExpenseRatio(props, expenseRatio);
                setExpenseRatios(expenseRatios_)

            } else {
                alert("Lütfen bir kayıt seçiniz.");
            }
        }
        catch (error) {
            console.log(error)
            alert("Hata" + error)
        }
    }

    return (
        <div className='container' style={{ width: '100%', }}>
            <Grid container xs={12} className='divStyle' style={{ borderWidth: 0.5, width: '100%', marginTop: '0.75vw', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                <Grid item xs={12} className='divStyle' style={{ borderRadius: '6px', backgroundColor: '#42A5F5' }}>
                    <div style={{ marginLeft: '0.5%', marginTop: '-1.5%', marginBottom: '3.2%' }}>
                        <h6 style={{ color: 'white' }}>İcra Hesaplama Tanımları</h6>
                    </div>
                    <Card style={{ height: 'auto', width: '100%', borderRadius: '8px', overflow: 'visible', marginTop: '-3%' }}>
                        <Grid container xs={12} className='divStyle'  >
                            <Grid item xs={4} className='divStyle' style={{ marginTop: '1%' }} >

                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex' }}>
                                    <Typography style={pageStyle.labelStyle}>Masraf Tipi:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <Select
                                            value={cboExpenseType.selectedTestSelect}
                                            options={cboExpenseType.expenseTypeList}
                                            getOptionLabel={x => x.ParameterName}
                                            getOptionValue={x => x.ParameterCode}
                                            onChange={value => RetrieveExpenseRatios(value)}
                                        />
                                    </div>
                                </div>

                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex' }}>
                                    <Typography style={pageStyle.labelStyle}>Tarih:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <NumberFormat value={dtValidDate} onChange={(e) => setDtValidDate(e.target.value)} style={pageStyle.inputStyle} format="##.##.####" />
                                    </div>
                                </div>

                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex', marginBottom: '-1%' }}>
                                    <Typography style={pageStyle.labelStyle}>Oran:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <input value={txtRatio} onChange={(e) => setTxtRatio(e.target.value)} style={pageStyle.inputStyle} />
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={4} className='divStyle' style={{ borderRadius: '6px', marginTop: '1%' }}>
                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex' }}>
                                    <Typography style={pageStyle.labelStyle}>Başlangıç Değeri:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <input value={numIntervalStartValue} onChange={(e) => setNumIntervalStartValue(e.target.value)} style={pageStyle.inputStyle} />
                                    </div>
                                </div>

                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex' }}>
                                    <Typography style={pageStyle.labelStyle}>Bitiş Değeri:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <input value={numIntervalFinishValue} onChange={(e) => setNumIntervalFinishValue(e.target.value)} style={pageStyle.inputStyle} />
                                    </div>
                                </div>

                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex', marginBottom: '-1%' }}>
                                    <Typography style={pageStyle.labelStyle}>Minimum Değer:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <input value={numMinumumValue} onChange={(e) => setNumMinumumValue(e.target.value)} style={pageStyle.inputStyle} />
                                    </div>
                                </div>
                            </Grid>

                            <Grid item xs={4} className='divStyle' style={{ borderRadius: '6px', marginTop: '1%' }}>
                                <div style={{ flexDirection: 'row', width: '100%', display: 'flex' }}>
                                    <Typography style={pageStyle.labelStyle}>Maksimum Değer:</Typography>
                                    <div style={{ width: '65%', }}>
                                        <input value={numMaksimumValue} onChange={(e) => setNumMaksimumValue(e.target.value)} style={pageStyle.inputStyle} />
                                    </div>
                                </div>
                                <Button
                                    onClick={ClearConstructionFields}
                                    style={{ color: ' #fff', width: '100px', marginBottom: '8%', marginLeft: '3%', marginTop: '3%', backgroundColor: 'blue', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                                    <Typography style={{ width: '30%', fontSize: '10px', marginRight: '13px' }}>Yeni</Typography>
                                </Button>
                                <Button
                                    onClick={CreateExpenseRatio}
                                    disabled={isSaveBtnDisabled}
                                    style={{ opacity: isUpdateBtnDisabled ? 0.6 : 1, color: ' #fff', width: '100px', marginBottom: '8%', marginLeft: '3%', marginTop: '3%', backgroundColor: '#ff0000', boxShadow: '0 0 0.6vw 0 #aeaeae' }}>
                                    <Typography style={{ width: '30%', fontSize: '10px', marginRight: '13px' }}>Kaydet</Typography>
                                </Button>
                                <Button
                                    onClick={UpdateExpenseRatio}
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
    RetrieveParametersWithoutAuthorization,
    RetrieveExpenseRatioList,
    SaveExpenseRatio,
    UpdateExpenseRatio,
    GetHolidays,
})(ExportPages3);
