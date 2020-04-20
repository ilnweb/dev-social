import React from 'react';
import { auth, signInWithGoogle } from '../firebase/firebase.config';
import { Button, Input, Form } from 'antd';
import { MailOutlined, FacebookOutlined, GoogleOutlined } from '@ant-design/icons';


class SignIn extends React.Component {
	constructor() {
		super();
		this.state = {
			email: '',
			password: ''
		};
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { email, password } = this.state;

		try {
			await auth.signInWithEmailAndPassword(email, password);
			// this.setState({ email: '', password: '' });
		} catch (error) {
			console.error(`wtf ${error}`);
		}
	};

	handleChange = (e) => {
		const { value, name } = e.target;

		this.setState({ [name]: value });
	};

	render() {
		return (
			<div className="sign-in-up flex-c-c login-regester">
				<div style={{ maxWidth: '1256px', margin: '0px auto' }}>
					<Form className="login-regester__Form sign-in-up flex-c">
						<h1 className="pageTitle">Log In</h1>
						<Input
							id="email1"
							name="email"
							value={this.state.email}
							className="input-style"
							type="email"
							label="Email"
							size="large"
							placeholder="Email"
							suffix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
							autoComplete="true"
							onChange={this.handleChange}
						/>
						<Input.Password
							id="password1"
							name="password"
							value={this.state.password}
							className="input-style"
							type="password"
							label="Password"
							size="large"
							placeholder="Password"
							autoComplete="true"
							onChange={this.handleChange}
						/>
						<Button className="button primary block" size="large" type="primary" onClick={this.handleSubmit}>
							Log In
						</Button>
						<div>
							- or -
						</div>
						<Button
							className="button block"
							size="large"
							type="danger"
							icon={<GoogleOutlined/>}
							onClick={signInWithGoogle}
						>Login with Google</Button>
						<Button
							className="button block"
							size="large"
							type="primary"
							icon={<FacebookOutlined/>}
						
						>Login with Facebook</Button>
				</Form>
			</div>
			</div>
		);
	}
}

export default SignIn;
