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