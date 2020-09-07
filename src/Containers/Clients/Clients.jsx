import React from "react";
import "./Clients.scss";
import isEmail from "validator/lib/isEmail";
import {
  getClients,
  addClients,
  updateClients,
  deleteClients,
} from "../../services/clients";
import Search from "../../Components/Search/Search";

class Clients extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: undefined,
      email: undefined,
      phone: undefined,
      city: undefined,
      idUpdate: undefined,
      showModal: false,
      nameValidator: false,
      emailValidator: false,
      phoneValidator: false,
      cityValidator: false,
      errorName: "",
      errorEmail: "",
      errorPhone: "",
      errorCity: "",
      search: "",
      CLIENTS: [],
    };
    this.emailInput = React.createRef();
  }

  componentDidMount() {
    console.log("hola");
    this.getClientsList();
  }

  showModal = (event) => {
    this.handleClose();
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  handleClose() {
    this.setState({
      name: undefined,
      email: undefined,
      phone: undefined,
      city: undefined,
      errorName: "",
      errorEmail: "",
      errorPhone: "",
      errorCity: "",
      nameValidator: false,
      emailValidator: false,
      phoneValidator: false,
      cityValidator: false,
      idUpdate: undefined,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    event.persist();
    await this.validateForm();
    const ID = this.state.idUpdate;
    const userClient = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      city: this.state.city,
    };
    console.log(this.state);
    if (
      !ID &&
      this.state.nameValidator === true &&
      this.state.emailValidator === true &&
      this.state.phoneValidator === true &&
      this.state.cityValidator === true
    ) {
      this.handleClose();
      await addClients(userClient);
      this.showModal();
      this.getClientsList();
    } else if (ID) {
      this.handleClose();
      await updateClients(userClient, ID);
      this.showModal();
      this.getClientsList();
    } else {
    }
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUpdate(event, id) {
    this.showModal();
    this.setState({ idUpdate: id });
  }

  handleDelete = async (id) => {
    await deleteClients(id);
    this.getClientsList();
  };

  getClientsList = async () => {
    await getClients().then((res) => this.setState({ CLIENTS: res.data }));
  };
  validateForm = async () => {
    return new Promise((resolve, reject) => {
      this.validateEmail();
      this.validateName();
      this.validatePhone();
      this.validateCity();
      resolve("form validado");
      reject("form no validado");
    });
  };

  validateName = (e) => {
    const name = this.state.name;
    if (!name || name.trim() === "")
      this.setState({ errorName: "El nombre es requerido." });
    else this.setState({ errorName: "", nameValidator: true });
  };

  validateEmail = () => {
    const email = this.state.email;
    if (!email || email.trim() === "")
      this.setState({ errorEmail: "El email es requerido." });
    else if (!isEmail(email))
      this.setState({ errorEmail: "Introduzca un email válido" });
    else this.setState({ errorEmail: "", emailValidator: true });
  };

  validatePhone = () => {
    const phone = this.state.phone;
    if (!phone || phone.trim() === "")
      this.setState({ errorPhone: "El teléfono es requerido." });
    else this.setState({ errorPhone: "", phoneValidator: true });
  };

  validateCity = () => {
    const city = this.state.city;
    if (!city || city.trim() === "")
      this.setState({ errorCity: "La ciudad es requerida." });
    else this.setState({ errorCity: "", cityValidator: true });
  };

  render() {
    let Client = this.state.CLIENTS.filter((item) => {
      return (item.name + item.email + item.phone + item.city)
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });
    const addOrEdit = this.state.idUpdate;

    return (
      <div className="clients">
        <div className="addSearch">
          <button
            className="btnAddClients"
            onClick={(event) => this.showModal(event)}
          >
            Añadir Clientes
          </button>
          <Search
            className="search"
            handleSearch={(e) => this.handleChange(e)}
            search={this.state.search}
          />
        </div>
        {this.state.showModal && (
          <div className="modal" id="modal">
            <form className="modalContent" onSubmit={this.handleSubmit}>
              <div className="modalHeader">
                <h1> {addOrEdit ? "Editar Cliente" : "Añadir Cliente"}</h1>
              </div>
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                placeholder="Nombre"
              />
              <div className="errorName">{this.state.errorName} </div>
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
                type="number"
                name="phone"
                value={this.state.phone}
                onChange={this.handleChange}
                placeholder="Teléfono"
              />
              <div className="errorPhone"> {this.state.errorPhone} </div>
              <input
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleChange}
                placeholder="Ciudad"
              />
              <div className="errorCity"> {this.state.errorCity} </div>
              <div className="modalButton">
                <button className="btnEdit" type="submit">
                  Enviar
                </button>
                <button className="btnDelete" onClick={this.showModal}>
                  Cerrar
                </button>
              </div>
            </form>
          </div>
        )}
        <div className="cardContainer">
          {this.state.CLIENTS &&
            Client.map((client) => (
              <div key={client.id} className="card">
                <div className="head">
                  <h3>{client.name}</h3>
                </div>
                <div className="items">
                  <div className="email">
                    <span className="margin">Email: </span>
                    <span>{client.email}</span>{" "}
                  </div>
                  <div className="phone">
                    <span className="margin">Teléfono: </span>{" "}
                    <span>{client.phone}</span>{" "}
                  </div>
                  <div className="city">
                    <span className="margin"> Residéncia: </span>{" "}
                    <span>{client.city}</span>{" "}
                  </div>
                </div>
                <div className="btn">
                  <button
                    className="btnEdit"
                    onClick={(event) => this.handleUpdate(event, client.id)}
                  >
                    Editar
                  </button>
                  <button
                    className="btnDelete"
                    onClick={() => this.handleDelete(client.id)}
                  >
                    Borrar
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Clients;
