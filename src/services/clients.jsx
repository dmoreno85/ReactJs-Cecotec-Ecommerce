import axios from "axios";

export const getClients = async (e) => {
  try {
    const token = localStorage.getItem("authToken");
    const res = await axios.get("http://localhost:3001/userClients", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // console.log(res.data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const addClients = async (client) => {
  try {
    console.log(client);
    const token = localStorage.getItem("authToken");
    await axios.post("http://localhost:3001/userClients", client, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await getClients();
  } catch (error) {
    console.log(error);
  }
};

export const updateClients = async (client, id) => {
  try {
    const ID = id;
    const token = localStorage.getItem("authToken");
    await axios.patch(`http://localhost:3001/userClients/${ID}`, client, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    return await getClients();
  } catch (error) {
    console.log(error);
  }
};

export const deleteClients = async (id) => {
  try {
    const ID = id;
    const token = localStorage.getItem("authToken");
    await axios.delete(`http://localhost:3001/userClients/${ID}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log("deleted");
    return await getClients();
  } catch (error) {
    console.log(error);
  }
};
