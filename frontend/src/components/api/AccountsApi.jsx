/** @format */

import axios from "axios";

const globalUrl = process.env.REACT_APP_GLOBAL_URL;
const authToken = process.env.REACT_APP_X_AUTH_TOKEN;

const headers = {
  "Content-Type": "application/json",
  "x-auth-token": authToken,
};

export const fetchAccountAPI = async () => {
  try {
    const response = await axios.get(`${globalUrl}/accounts/retrieveAll`, {
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export const retrieveUserDB = async ({ _id }) => {
  try {
    const response = await axios.get(
      `${globalUrl}/accounts/retrieve/${_id}`,
      {
        headers,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export const deleteAccountAPI = async ({ _id }) => {
  try {
    const response = await axios.delete(`${globalUrl}/accounts/delete/${_id}`, {
      headers,
    });
    return response.data; // Assuming you want to return data after deletion
  } catch (error) {
    console.error("Error deleting account:", error);
    throw error;
  }
};

export const updateAccountAPI = async ({ body, _id }) => {
  try {
    const response = await axios.patch(
      `${globalUrl}/accounts/update/${_id}`,
      JSON.stringify(body),
      { headers }
    );
    console.log("Update response:", response.data.newData); // Log the response data
    return response.data; // Assuming you want to return the updated data
  } catch (error) {
    console.error("Error updating account:", error);
    throw error;
  }
};

export const createAccountAPI = async ({ body }) => {
  try {
    const response = await axios.post(
      `${globalUrl}/accounts/create`,
      JSON.stringify(body),
      { headers }
    );
    return response.data; // Assuming you want to return the newly created account data
  } catch (error) {
    console.error("Error creating account:", error);
    throw error;
  }
};
