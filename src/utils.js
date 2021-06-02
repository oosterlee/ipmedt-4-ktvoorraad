let loggedIn = false;
let username = null;
let name = null;

function setLoginToken(token) {
	localStorage.setItem('token', token);
}

function __setLoggedIn(_loggedIn) {
	loggedIn = _loggedIn;
}

function __setUserInfo(info) {
	username = info.username;
	name = info.name;
}

function isLoggedIn() {
	return loggedIn;
}

function getToken() {
	return localStorage.getItem('token');
}

function tryLogin(username, password) {
	return new Promise((resolve, rejext) => {
		// TODO: Try to login with token
		setTimeout(() => {
			setLoginToken("jwt-token");
			__setLoggedIn(true);
			__setUserInfo({ username: "test", name: "Test User" });
			resolve({ loggedIn: true });
		}, 1000);
	});
}

function tryLoginWithToken(token) {
	// TODO: Try to verify that the token still works
	return tryLogin("user", "pass");
}

function getUserInfo() {
	return { username, name };
}

export {
	tryLogin,
	tryLoginWithToken,
	isLoggedIn,
	getToken,
	getUserInfo
};