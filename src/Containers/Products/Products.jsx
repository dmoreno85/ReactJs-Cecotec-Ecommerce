import React from "react";
import "./Products.scss";

import Search from "../../Components/Search/Search";
import {
  getProducts,
  addProducts,
  deleteProducts,
  updateProducts,
} from "../../services/products";
class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: undefined,
      description: undefined,
      price: undefined,
      stock: undefined,
      idUpdate: undefined,
      showModal: false,
      titleValidate: false,
      descriptionValidate: false,
      modelValidate: false,
      priceValidate: false,
      stockValidate: false,
      errorTitle: "",
      errorDescription: "",
      errorModel: "",
      errorPrice: "",
      errorStock: "",
      search: "",
      PRODUCTS: [],
    };
  }

  componentDidMount = () => {
    this.getProductList();
  };

  showModal = (event) => {
    this.handleClose();
    this.setState({
      showModal: !this.state.showModal,
    });
  };

  handleClose() {
    this.setState({
      title: undefined,
      description: undefined,
      price: undefined,
      stock: undefined,
      model: undefined,
      errorTitle: "",
      errorDescription: "",
      errorPrice: "",
      errorStock: "",
      errorModel: "",
      titleValidate: false,
      descriptionValidate: false,
      priceValidate: false,
      stockValidate: false,
      modelValidate: false,
      idUpdate: undefined,
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    event.persist();
    await this.validateForm();
    const ID = this.state.idUpdate;
    const products = {
      title: this.state.title,
      description: this.state.description,
      model: this.state.model,
      price: this.state.price,
      stock: this.state.stock,
    };
    if (
      !ID &&
      this.state.titleValidate === true &&
      this.state.descriptionValidate === true &&
      this.state.priceValidate === true &&
      this.state.stockValidate === true &&
      this.state.modelValidate === true
    ) {
      this.handleClose();
      await addProducts(products);
      this.showModal();
      this.getProductList();
    } else if (ID) {
      this.handleClose();
      await updateProducts(products, ID);
      this.showModal();
      this.getProductList();
    } else {
    }
  };

  handleChange = async (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleUpdate(event, id) {
    this.showModal();
    this.setState({ idUpdate: id });
  }

  handleDelete = async (id) => {
    await deleteProducts(id);
    this.getProductList();
  };

  getProductList = async () => {
    await getProducts().then((res) => this.setState({ PRODUCTS: res.data }));
  };
  validateForm = () => {
    return new Promise((resolve, reject) => {
      this.validateTitle();
      this.validateDescription();
      this.validateModel();
      this.validatePrice();
      this.validateStock();
      resolve("form validado");
      reject("form no validado");
    });
  };

  validateTitle = () => {
    const title = this.state.title;
    if (!title || title.trim() === "")
      this.setState({ errorTitle: "El título es requerido." });
    else this.setState({ errorTitle: "", titleValidate: true });
  };

  validateDescription = () => {
    const description = this.state.description;
    if (!description || description.trim() === "")
      this.setState({ errorDescription: "Se requiere una descripción." });
    else this.setState({ errorDescription: "", descriptionValidate: true });
  };

  validatePrice = () => {
    const price = this.state.price;
    if (!price || price.trim() === "")
      this.setState({ errorPrice: "Se requiere un precio." });
    else this.setState({ errorPrice: "", priceValidate: true });
  };

  validateModel = () => {
    const model = this.state.model;
    if (!model || model.trim() === "")
      this.setState({ errorModel: "Se requiere el modelo." });
    else this.setState({ errorModel: "", modelValidate: true });
  };

  validateStock = () => {
    const stock = this.state.stock;
    if (!stock || stock.trim() === "")
      this.setState({ errorStock: "Se requiere un stock." });
    else this.setState({ errorStock: "", stockValidate: true });
  };

  render() {
    let Products = this.state.PRODUCTS.filter((item) => {
      return (item.title + item.model + item.price + item.stock)
        .toLowerCase()
        .includes(this.state.search.toLowerCase());
    });
    const addOrEdit = this.state.idUpdate;
    return (
      <div className="products">
        <div className="addSearch">
          <button
            className="btnAddProducts"
            onClick={(event) => this.showModal(event)}
          >
            Añadir Productos
          </button>
          <Search
            handleSearch={(e) => this.handleChange(e)}
            search={this.state.search}
          />
        </div>
        {this.state.showModal && (
          <div className="modal" id="modal">
            <form className="modalContent" onSubmit={this.handleSubmit}>
              <div className="modalHeader">
                <h1> {addOrEdit ? "Editar Producto" : "Añadir Producto"}</h1>
              </div>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="Título"
              />
              <div className="errorTitle">{this.state.errorTitle} </div>
              <textarea
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                rows="3"
                maxLength="201"
                placeholder="Descripción, máximo 200 carateres"
              />
              <div className="errorDescription">
                {this.state.errorDescription}{" "}
              </div>
              <input
                type="text"
                name="model"
                value={this.state.model}
                onChange={this.handleChange}
                placeholder="Modelo o Marca"
              />
              <div className="errorModel">{this.state.errorModel} </div>
              <input
                type="number"
                name="price"
                value={this.state.price}
                onChange={this.handleChange}
                placeholder="Precio"
              />
              <div className="errorPrice">{this.state.errorPrice} </div>
              <input
                type="number"
                name="stock"
                value={this.state.stock}
                onChange={this.handleChange}
                placeholder="Stock"
              />
              <div className="errorStock">{this.state.errorStock} </div>
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
          {Products?.map((product) => (
            <div key={product.id} className="card">
              <div className="head">
                <h3>{product.title}</h3>
              </div>
              <div className="items">
                <p className="description">{product.description}</p>
                <div className="model">
                  <span className="margin">Marca: </span>{" "}
                  <span>{product.model}</span>{" "}
                </div>
                <div className="price">
                  <span className="margin"> Precio: </span>{" "}
                  <span>{product.price}€</span>{" "}
                </div>
                <div className="stock">
                  <span className="margin">Stock: </span>
                  <span>{product.stock}</span>{" "}
                </div>
              </div>
              <div className="btn">
                <button
                  className="btnEdit"
                  onClick={(event) => this.handleUpdate(event, product.id)}
                >
                  Editar
                </button>
                <button
                  className="btnDelete"
                  onClick={() => this.handleDelete(product.id)}
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

export default Products;
