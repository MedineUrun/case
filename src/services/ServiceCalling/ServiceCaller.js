const ServiceCaller = {

    RetrieveExemptionsWithoutAuthorization: (props) => {
        return new Promise((response, reject) => {
            props.RetrieveExemptionsWithoutAuthorization(
                ({ EXEMPTIONS_LIST }) => {
                    if (typeof (EXEMPTIONS_LIST) === 'string') {
                        reject(new RangeError(EXEMPTIONS_LIST))
                    }
                    response(EXEMPTIONS_LIST);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

    RetrieveTariffListWithoutAuthorization: (props) => {
        return new Promise((response, reject) => {
            props.RetrieveTariffListWithoutAuthorization(
                ({ TARIFF_LIST }) => {
                    if (typeof (TARIFF_LIST) === 'string') {
                        reject(new RangeError(TARIFF_LIST))
                    }
                    response(TARIFF_LIST);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

    GetCityListWithoutAuthorization: (props) => {
        return new Promise((response, reject) => {
            props.GetCityListWithoutAuthorization(
                ({ RETRIEVED_CITY_LIST }) => {
                    if (typeof (RETRIEVED_CITY_LIST) === 'string') {
                        reject(new RangeError(RETRIEVED_CITY_LIST))
                    }
                    response(RETRIEVED_CITY_LIST);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

}

export default ServiceCaller;