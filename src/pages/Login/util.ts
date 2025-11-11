import { users } from "./config";

type LoginFieldType = {
	email?: string;
	password?: string;
};

export const checkLogin = (props: LoginFieldType) => {
	const { email, password } = props;
	//TODO: 遍历数组的基础语法
	for (const user of users) {
		if (user.email === email && user.password === password) {
			return true;
		}
	}

	return false;
};
