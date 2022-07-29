import axios from 'axios';

let userName = "isahan"

export const GetCityListWithoutAuthorization = (SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName };
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
        const body = { userName };
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
        const body = { userName };
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
        const body = { userName };
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
        const body = { userName, holiday };
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
        const body = { userName, holiday };
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
        const body = { userName };
        axios.post('/api/RetrieveConstructionTypes', body)
            .then(response => {
                SuccessOperation({ RESPONSE: response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

export const CreateConstructionType = (constructionType, SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName, constructionType };
        axios.post('/api/CreateConstructionType', body)
            .then(async response => {
                SuccessOperation({ RESPONSE: await response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

export const UpdateConstructionType = (constructionType, SuccessOperation, FailedOperation) => {
    return () => {
        const body = { userName,constructionType };
        axios.post('/api/UpdateConstructionType', body)
            .then(async response => {
                SuccessOperation({ RESPONSE: await response.data });
            }).catch(async error => {
                FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
            });
    }
}

///////// examplepages3
/*
export const RetrieveParametersWithoutAuthorization = (PARAMETER_TYPE_CODE, SuccessOperation, FailedOperation) => {
    return () => {
      const body = { userName: userName, parameterTypeCode: PARAMETER_TYPE_CODE };
      axios.post('/api/RetrieveParametersWithoutAuthorization', body)
        .then(async response => {
          SuccessOperation({ RESPONSE: await response.data });
        }).catch(async error => {
          FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
        });
    }
  }
*/
  export const RetrieveExpenseRatioList = (EXPENSE_TYPE, SuccessOperation, FailedOperation) => {
    return () => {
      const body = { userName: userName, expenseType: EXPENSE_TYPE };
      axios.post('/api/RetrieveExpenseRatioList', body)
        .then(async response => {
          SuccessOperation({ RESPONSE: await response.data });
        }).catch(async error => {
          FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
        });
    }
  }

  export const SaveExpenseRatio = (EXPENSE_RATIO, SuccessOperation, FailedOperation) => {
    return () => {
      const body = { userName: userName, expenseRatio: EXPENSE_RATIO };
      axios.post('/api/SaveExpenseRatio', body)
        .then(async response => {
          SuccessOperation({ RESPONSE: await response.data });
        }).catch(async error => {
          FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
        });
    }
  }

  export const UpdateExpenseRatio = (EXPENSE_RATIO, SuccessOperation, FailedOperation) => {
    return () => {
      const body = { userName: userName, expenseRatio: EXPENSE_RATIO };
      axios.post('/api/UpdateExpenseRatio', body)
        .then(async response => {
          SuccessOperation({ UPDATED_EXPENSE_RATIO: await response.data });
        }).catch(async error => {
          FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
        });
    }
  }

  ///////// examplepages4

  export const GetNextExemptionCode = (SuccessOperation, FailedOperation) => {
    return () => {
      const body = { userName: userName, };
      axios.post('/api/GetNextExemptionCode', body)
        .then(async response => {
          SuccessOperation({ RETRIEVED_NEXT_EXEMPTION_CODE: await response.data });
        }).catch(async error => {
          FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
        });
    }
}

export const SaveExemption = (EXEMPTION, SuccessOperation, FailedOperation) => {
    return () => {
      const body = { userName: userName, exemption: EXEMPTION };
      axios.post('/api/SaveExemption', body)
        .then(async response => {
          SuccessOperation({ SAVED_EXEMPTION_PARAMETERS: await response.data });
        }).catch(async error => {
          FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
        });
    }
  }

  export const UpdateExemption = (EXEMPTION, SuccessOperation, FailedOperation) => {
    return () => {
      const body = { userName: userName, exemption: EXEMPTION };
      axios.post('/api/UpdateExemption', body)
        .then(async response => {
          SuccessOperation({ UPDATED_EXEMPTION: await response.data });
        }).catch(async error => {
          FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
        });
    }
  }

  export const RetrieveExemptions = (SuccessOperation, FailedOperation) => {
    return () => {
      const body = { userName: userName, };
      axios.post('/api/RetrieveExemptions', body)
        .then(async response => {
          SuccessOperation({ RETRIEVED_EXEMPTIONS: await response.data });
        }).catch(async error => {
          FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
        });
    }
  }

  export const RetrieveParametersWithoutAuthorization = (PARAMETER_TYPE_CODE, SuccessOperation, FailedOperation) => {
    return () => {
      const body = { userName: userName, parameterTypeCode: PARAMETER_TYPE_CODE };
      axios.post('/api/RetrieveParametersWithoutAuthorization', body)
        .then(async response => {
          SuccessOperation({ APPLICATION_TYPES: await response.data, RETRIEVED_PARAMETERS: await response.data });
        }).catch(async error => {
          FailedOperation({ ERROR_MESSAGE: await error.response.data.Message });
        });
    }
  }