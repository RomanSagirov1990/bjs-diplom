'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = () => ApiConnector.logout(
    (response) => {
        if (response.success) {
            location.reload()
        } else {
            loginErrorMessageBox();
        }
    }
);

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
}
);

const course = new RatesBoard();

const requestCourse = function () {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            course.clearTable();
            course.fillTable(respons.data);
        }
    });
};
requestCourse();
setInterval(requestCourse, 6000);

const money = new MoneyManager();

function showMessage(response) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
        money.setMessage(false, "Операция прошла успешно");
    } else {
        money.setMessage(true, response.data);
    };
};

money.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        showMessage(response);
    });
};

money.conversionMoneyCallback = function (data) {
    ApiConnector.convertMoney(data, (response) => {
        showMessage(response);
    });
};

money.sendMoneyCallback = function (data) {
    ApiConnector.transferMoney(data, (response) => {
        console.log(response);
        console.log(data);
        console.log(data.amount);
        showMessage(response);
    });
};

let favorites = new FavoritesWidget();

function fillTable(response) {
    favorites.clearTable();
    favorites.fillTable(response.data);
    money.updateUserList(response.data);
}

ApiConnector.getFavorites((response) => {
    if (response.success) {
        fillTable(response);
    };
});

favorites.addUserCallback = function (data) {
    let userName = data.name
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            fillTable(response);
            favorites.setMessage(true, `${userName} успешно добавлен`);
        } else {
            favorites.setMessage(false, response.data);
        }
    });
};

favorites.removeUserCallback = function (data) {
    let userid = data
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            fillTable(response);
            favorites.setMessage(true, `адрес с ID ${userid} успешно удален`);
        } else {
            favorites.setMessage(false, response.data);
        }
    });
};