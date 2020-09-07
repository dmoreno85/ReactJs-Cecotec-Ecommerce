import React from "react";
import "./Login.scss";
import { loginUser } from "../../services/login";
import isEmail from "validator/es/lib/isEmail";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errorFormValidate: "",
      errorEmail: "",
      errorPassword: "",
      emailValidate: false,
      passwordValidate: false,
    };
    this.emailInput = React.createRef();
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.validateForm();
    if (
      this.state.passwordValidate === true &&
      this.state.emailValidate === true
    ) {
      const userData = {
        email: this.state.email,
        password: this.state.password,
      };
      loginUser(userData)
        .then((res) => {
          if (res) {
            return this.props.history.push("/clients");
          } else {
            this.setState({
              errorFormValidate: "El email y/o la contraseña son incorrectas.",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  validateForm = () => {
    return new Promise((resolve, reject) => {
      this.validateEmail();
      this.validatePassword();
      resolve("form validado");
      reject("form no validado");
    });
  };
  validatePassword = () => {
    const password = this.state.password;
    if (password.length === 0)
      this.setState({ errorPassword: "La contraseña es requerida." });
    else this.setState({ errorPassword: "", passwordValidate: true });
  };

  validateEmail = () => {
    const email = this.state.email;
    if (email.length === 0)
      this.setState({ errorEmail: "El email es requerido." });
    else if (!isEmail(email))
      this.setState({ errorEmail: "Introduzca un email válido" });
    else this.setState({ errorEmail: "", emailValidate: true });
  };

  render() {
    return (
      <div className="loginContainer">
        <form className="loginForm" onSubmit={this.handleSubmit}>
          <h1>Inicia sesión</h1>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            placeholder="Email"
            ref={this.emailInput}
          />
          <div className="errorEmail"> {this.state.errorEmail} </div>
          <input
            type="password"
            name="password"
            value={this.password}
            onChange={this.handleChange}
            placeholder="Password"
          />
          <div className="errorPassword"> {this.state.errorPassword} </div>
          <div className="button">
            {" "}
            <button type="submit">Enviar</button>
          </div>

          <div className="errorFormValidate">
            {" "}
            {this.state.errorFormValidate}{" "}
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
