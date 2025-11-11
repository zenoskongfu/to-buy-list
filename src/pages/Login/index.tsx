import {
	Button,
	Checkbox,
	Divider,
	Form,
	Grid,
	Input,
	Space,
	Tabs,
	Typography,
	type FormProps,
	type TabsProps,
} from "antd";
import {
	AlipayCircleFilled,
	FacebookFilled,
	GoogleOutlined,
	LockOutlined,
	MailOutlined,
	TaobaoCircleFilled,
	UserOutlined,
	WeiboCircleFilled,
} from "@ant-design/icons";
import Logo from "../../assets/ToBuyList_Logo.png";
import "./index.css";

type LoginFieldType = {
	email?: string;
	password?: string;
	remember?: boolean;
};

type SignUpFieldType = {
	username?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
	acceptTerms?: boolean;
};

const Login = () => {
	const screens = Grid.useBreakpoint();
	const isMobile = !screens.lg;

	const handleLoginSubmit: FormProps<LoginFieldType>["onFinish"] = (values) => {
		console.log("login submit", values);
	};

	const handleSignupSubmit: FormProps<SignUpFieldType>["onFinish"] = (values) => {
		console.log("signup submit", values);
	};

	const renderLoginForm = (variant: "desktop" | "mobile" = "desktop") => {
		const isMobileVariant = variant === "mobile";

		return (
			<Form<LoginFieldType>
				layout='vertical'
				requiredMark={false}
				initialValues={{ remember: true }}
				onFinish={handleLoginSubmit}
				className={`login-form${isMobileVariant ? " login-form--mobile" : ""}`}>
				<Form.Item<LoginFieldType>
					name='email'
					label='邮箱'
					rules={[
						{ required: true, message: "请输入邮箱地址" },
						{ type: "email", message: "请输入正确的邮箱格式" },
					]}>
					<Input
						autoComplete='username'
						size='large'
						prefix={<MailOutlined />}
						placeholder='name@example.com'
						allowClear
					/>
				</Form.Item>

				<Form.Item<LoginFieldType>
					name='password'
					label='密码'
					rules={[{ required: true, message: "请输入密码" }]}>
					<Input.Password
						autoComplete='current-password'
						size='large'
						prefix={<LockOutlined />}
						placeholder='请输入密码'
					/>
				</Form.Item>

				<div className='login-form__actions'>
					<Form.Item<LoginFieldType> name='remember' valuePropName='checked' noStyle>
						<Checkbox>记住我</Checkbox>
					</Form.Item>
					<Typography.Link>忘记密码？</Typography.Link>
				</div>

				<Button type='primary' htmlType='submit' size='large' block>
					登录
				</Button>

				<Divider plain className={`login-divider${isMobileVariant ? " login-divider--mobile" : ""}`}>
					或
				</Divider>

				<Space
					direction='vertical'
					size='middle'
					className={`login-form__social${isMobileVariant ? " login-form__social--mobile" : ""}`}>
					<Button icon={<GoogleOutlined />} size='large' block>
						使用 Google 登录
					</Button>
					<Button icon={<FacebookFilled />} size='large' block>
						使用 Facebook 登录
					</Button>
				</Space>

				{!isMobileVariant && (
					<>
						<Divider />

						<div className='login-form__quick'>
							<Typography.Text type='secondary'>快捷登录：</Typography.Text>
							<Space size='middle'>
								<Button
									type='text'
									icon={<AlipayCircleFilled style={{ color: "#1677FF" }} />}
									className='login-form__quick-btn'>
									支付宝
								</Button>
								<Button
									type='text'
									icon={<TaobaoCircleFilled style={{ color: "#FF6A00" }} />}
									className='login-form__quick-btn'>
									淘宝
								</Button>
								<Button
									type='text'
									icon={<WeiboCircleFilled style={{ color: "#FF4D4F" }} />}
									className='login-form__quick-btn'>
									微博
								</Button>
							</Space>
						</div>
					</>
				)}
			</Form>
		);
	};

	const renderSignupForm = () => (
		<Form<SignUpFieldType>
			layout='vertical'
			requiredMark={false}
			onFinish={handleSignupSubmit}
			className='login-form'>
			<Form.Item<SignUpFieldType>
				name='username'
				label='用户名'
				rules={[{ required: true, message: "请输入用户名" }]}>
				<Input size='large' prefix={<UserOutlined />} placeholder='设置一个用户名' />
			</Form.Item>

			<Form.Item<SignUpFieldType>
				name='email'
				label='邮箱'
				rules={[
					{ required: true, message: "请输入邮箱地址" },
					{ type: "email", message: "请输入正确的邮箱格式" },
				]}>
				<Input size='large' prefix={<MailOutlined />} placeholder='name@example.com' />
			</Form.Item>

			<Form.Item<SignUpFieldType>
				name='password'
				label='密码'
				rules={[
					{ required: true, message: "请设置密码" },
					{ min: 6, message: "密码至少 6 位" },
				]}>
				<Input.Password size='large' prefix={<LockOutlined />} placeholder='设置密码' />
			</Form.Item>

			<Form.Item<SignUpFieldType>
				name='confirmPassword'
				label='确认密码'
				dependencies={["password"]}
				rules={[
					{ required: true, message: "请确认密码" },
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue("password") === value) {
								return Promise.resolve();
							}
							return Promise.reject(new Error("两次输入的密码不一致"));
						},
					}),
				]}>
				<Input.Password size='large' prefix={<LockOutlined />} placeholder='再次输入密码' />
			</Form.Item>

			<Form.Item<SignUpFieldType>
				name='acceptTerms'
				valuePropName='checked'
				rules={[
					{
						validator: (_, value) =>
							value ? Promise.resolve() : Promise.reject(new Error("请先同意条款后再注册")),
					},
				]}>
				<Checkbox>
					我已阅读并同意 <Typography.Link>服务条款</Typography.Link> 与{" "}
					<Typography.Link>隐私政策</Typography.Link>
				</Checkbox>
			</Form.Item>

			<Button type='primary' htmlType='submit' size='large' block>
				注册
			</Button>
		</Form>
	);

	const loginTab: NonNullable<TabsProps["items"]>[number] = {
		key: "login",
		label: "登录",
		children: renderLoginForm("desktop"),
	};

	const signupTab: NonNullable<TabsProps["items"]>[number] = {
		key: "signup",
		label: "注册",
		children: renderSignupForm(),
	};

	if (isMobile) {
		return (
			<div className='login-page login-page--mobile'>
				<div className='login-page__gradient' />
				<div className='login-mobile'>
					<img className='login-mobile__logo' src={Logo} alt='ToBuyList logo' />

					<div className='login-mobile__headings'>
						<Typography.Title level={2} className='login-mobile__title'>
							登录你的账户
						</Typography.Title>
						<Typography.Paragraph className='login-mobile__subtitle'>
							请输入邮箱和密码登录
						</Typography.Paragraph>
					</div>

					<div className='login-mobile__card'>
						{renderLoginForm("mobile")}

						<div className='login-footer login-footer--mobile'>
							<Typography.Text type='secondary'>还没有账户？</Typography.Text>
							<Typography.Link className='login-footer__link'>注册</Typography.Link>
						</div>
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='login-page'>
			<div className='login-page__gradient' />
			<div className='login-page__content'>
				<section className='login-hero'>
					<img className='login-hero__logo' src={Logo} alt='ToBuyList logo' />
					<Typography.Title level={1} className='login-hero__title'>
						To Buy List
					</Typography.Title>
					<Typography.Paragraph className='login-hero__subtitle'>
						记录、规划、管理你的采购清单，让日常补货更轻松。
					</Typography.Paragraph>

					{!isMobile && (
						<div className='login-hero__language'>
							<Typography.Text type='secondary'>
								语言：
								<Typography.Link>中文（简体）</Typography.Link>
							</Typography.Text>
						</div>
					)}
				</section>

				<section className='login-panel'>
					<Tabs centered defaultActiveKey='login' items={[loginTab, signupTab]} className='login-tabs' />

					<div className='login-footer'>
						<Typography.Text type='secondary'>还没有账户？</Typography.Text>
						<Typography.Link className='login-footer__link'>注册</Typography.Link>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Login;
