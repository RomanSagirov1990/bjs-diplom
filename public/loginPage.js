'use strict'

function requestLog(data){
    ApiConnector.login(data, (response) => {
        console.log(response.error);
        if (response.success) {
            location.reload();
        } else {
            using.setLoginErrorMessage(response.error);
        }
    });
}

function requestReg(data){
    ApiConnector.register(data, (response) => {
        console.log(response);
        if (response.success) {
            location.reload();
        } else {
            using.setRegisterErrorMessage(response.error);
        }
    });
}

let using = new UserForm();
using.loginFormCallback = requestLog;
using.registerFormCallback = requestReg;
