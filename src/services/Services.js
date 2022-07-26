import axios from 'axios';

let userName = "isahan"

export const GetCityListWithoutAuthorization = (SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName};
        axios.post('/api/GetCityListWithoutAuthorization', body)
            .then(response => {
                SuccessOperation({ RETRIEVED_CITY_LIST: response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

export const RetrieveTariffListWithoutAuthorization = (SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName};
        axios.post('/api/RetrieveTariffListWithoutAuthorization', body)
            .then(response => {
                SuccessOperation({ TARIFF_LIST: response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

export const RetrieveExemptionsWithoutAuthorization = (SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName};
        axios.post('/api/RetrieveExemptionsWithoutAuthorization', body)
            .then(response => {
                SuccessOperation({ EXEMPTIONS_LIST: response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

export const GetHolidays = (SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName};
        axios.post('/api/GetHolidays', body)
            .then(response => {
                SuccessOperation({ HOLIDAYS: response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

export const CreateHoliday = (holiday, SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName, holiday};
        axios.post('/api/CreateHoliday', body)
            .then(response => {
                SuccessOperation({ RESPONSE: response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

export const UpdateHoliday = (holiday, SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName, holiday};
        axios.post('/api/UpdateHoliday', body)
            .then(response => {
                SuccessOperation({ RESPONSE: response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

export const RetrieveConstructionTypes = (SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName};
        axios.post('/api/RetrieveConstructionTypes', body)
            .then(response => {
                SuccessOperation({ RESPONSE: response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

export const CreateConstructionType = (SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName};
        axios.post('/api/CreateConstructionType', body)
            .then(response => {
                SuccessOperation({ RESPONSE: response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

export const UpdateConstructionType = (SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName};
        axios.post('/api/UpdateConstructionType', body)
            .then(response => {
                SuccessOperation({ RESPONSE: response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}