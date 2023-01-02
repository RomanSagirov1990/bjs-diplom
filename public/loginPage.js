'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = (data) => ApiConnector.login(data,
    (response) => {
        if (response.success) {
            lacation.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    }
);

userForm.registerFormCallback = () => ApiConnector.register(data,
    (response) => {
        if (response.success){
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    }
    );

