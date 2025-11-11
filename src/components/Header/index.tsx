import { MenuOutlined } from "@ant-design/icons";
import "./index.css";

const Header = () => {
	return (
		<div className='header-container'>
			<div className='header-left'>
				<div className='left-menu'>
					<MenuOutlined color='#1465A4' className='left-logo' />
				</div>
				<div className='header-content'>
					<div className='header-title'>烹饪清单</div>
					<div className='header-subtitle'>让每周采购变得简单高效</div>
				</div>
			</div>
			<div className='header-right'>
				<img
					className='user-avatar'
					src='https://deepmaker.ai/_next/static/media/img-sample-3.a6a6b842.jpg'
					alt=''
				/>
			</div>
		</div>
	);
};

export default Header;
