import "./App.css";
import Login from "./pages/Login";
import BuyList from "./pages/BuyList";
import Menu from "./pages/Menu";
import Loading from "./pages/Loading";
import { Button } from "antd";

function App() {
	const pathname = window.location.pathname;
	console.log(pathname);

	if (pathname === "/login") {
		return <Login />;
	}

	if (pathname === "/buylist") {
		return <BuyList />;
	}

	if (pathname === "/menu") {
		return <Menu />;
	}

	return (
		<div>
			<Button type='primary'>Button</Button>
			<Loading />
		</div>
	);
}

export default App;
