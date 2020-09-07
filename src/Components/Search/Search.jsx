import React from "react";
import PropTypes from "prop-types";
class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = { search: "" };
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Buscar.."
          className="search"
          name="search"
          onChange={(event) => this.props.handleSearch(event)}
          value={this.props.search}
        />
      </div>
    );
  }
}
Search.propTypes = { handleSearch: PropTypes.func.isRequired };

export default Search;
