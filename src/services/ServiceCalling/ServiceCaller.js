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

    GetHolidays: (props) => {
        return new Promise((response, reject) => {
            props.GetHolidays(
                ({ HOLIDAYS }) => {
                    if (typeof (HOLIDAYS) === 'string') {
                        reject(new RangeError(HOLIDAYS))
                    }
                    response(HOLIDAYS);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

    CreateHoliday: (props,holiday) => {
        return new Promise((response, reject) => {
            props.CreateHoliday( holiday,
                ({ RESPONSE }) => {
                    if (typeof (RESPONSE) === 'string') {
                        reject(new RangeError(RESPONSE))
                    }
                    response(RESPONSE);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

    UpdateHoliday: (props,holiday) => {
        return new Promise((response, reject) => {
            props.UpdateHoliday( holiday,
                ({ RESPONSE }) => {
                    if (typeof (RESPONSE) === 'string') {
                        reject(new RangeError(RESPONSE))
                    }
                    response(RESPONSE);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

    RetrieveConstructionTypes: (props) => {
        return new Promise((response, reject) => {
            props.RetrieveConstructionTypes( 
                ({ RESPONSE }) => {
                    if (typeof (RESPONSE) === 'string') {
                        reject(new RangeError(RESPONSE))
                    }
                    response(RESPONSE);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

    CreateConstructionType: (props, constructionType) => {
        return new Promise((response, reject) => {
            props.CreateConstructionType(
                constructionType,
                ({ RESPONSE }) => {
                    if (typeof (RESPONSE) === 'string') {
                        reject(new RangeError(RESPONSE))
                    }
                    response(RESPONSE);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },
///////////////////////////////

    RetrieveParametersWithoutAuthorization: (props, parameterTypeCode) => {
        return new Promise((response, reject) => {
            props.RetrieveParametersWithoutAuthorization(
                parameterTypeCode,
                ({ RESPONSE }) => {
                    if (typeof (RESPONSE) === 'string') {
                        reject(new RangeError(RESPONSE))
                    }
                    response(RESPONSE);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

    RetrieveExpenseRatioList: (props, expenseType) => {
        return new Promise((response, reject) => {
            props.RetrieveExpenseRatioList(
                expenseType,
                ({ RESPONSE }) => {
                    if (typeof (RESPONSE) === 'string') {
                        reject(new RangeError(RESPONSE))
                    }
                    response(RESPONSE);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

    SaveExpenseRatio: (props, expenseRatio) => {
        return new Promise((response, reject) => {
            props.SaveExpenseRatio(
                expenseRatio,
                ({ RESPONSE }) => {
                    if (typeof (RESPONSE) === 'string') {
                        reject(new RangeError(RESPONSE))
                    }
                    response(RESPONSE);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

    UpdateExpenseRatio: (props, expenseRatio) => {
        return new Promise((response, reject) => {
            props.UpdateExpenseRatio(
                expenseRatio,
                ({ UPDATED_EXPENSE_RATIO }) => {
                    if (typeof (UPDATED_EXPENSE_RATIO) === 'string') {
                        reject(new RangeError(UPDATED_EXPENSE_RATIO))
                    }
                    response(UPDATED_EXPENSE_RATIO);
                },
                ({ ERROR_MESSAGE }) => {
                    reject(new URIError(ERROR_MESSAGE))
                }
            );
        })
    },

}


export default ServiceCaller;