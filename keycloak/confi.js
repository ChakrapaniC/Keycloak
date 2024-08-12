const axios = require('axios');
require('dotenv').config();


const getKeycloakToken = async () => {
    try {
        const response = await axios.post(
            `${process.env.URL}/realms/master/protocol/openid-connect/token`,
            new URLSearchParams({
                grant_type: 'password',
                client_id: process.env.CLIENT_ID,
                username: process.env.ADMIN_USERNAME,
                password: process.env.ADMIN_PASSWORD,
                client_secret: process.env.CLIENT_SECRET
            })
        );
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Keycloak token:', error);
        throw error;
    }
};

const addUserToKeycloak = async (userData) => {
    try {
        const token = await getKeycloakToken();

        const response = await axios.post(`${process.env.URL}/admin/realms/${process.env.REALM}/users`, userData,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )

        return response.headers.location.split('/').pop();
    } catch (error) {
        console.error('Error adding user to Keycloak:', error.response ? error.response.data : error);
        throw error;
    }

}

const getUserFromKeycloak = async () => {
    try {
        const token = await getKeycloakToken();

        const response = await axios.get(`${process.env.URL}/admin/realms/${process.env.REALM}/users`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
        console.log(response)
        return response.data;

    } catch (error) {

        console.error('Error geting user from Keycloak:', error.response ? error.response.data : error);
        throw error;
    }
}

const updateKeycloakUser = async (id, user) => {
    try {
        const token = await getKeycloakToken();
        
        const response = await axios.put(`${process.env.URL}/admin/realms/${process.env.REALM}/users/${id}`, user,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )

        return response.data
    }catch (error) {

        console.error('Error update user to Keycloak:', error.response ? error.response.data : error);
        throw error;
    }

}

const deleteUserFromKeycloak = async (id) => {
    try{
        const token = await getKeycloakToken();
        
        const response = await axios.delete(`${process.env.URL}/admin/realms/${process.env.REALM}/users/${id}`, 
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )

        return response.data 
    }catch (error) {

        console.error('Error delete user to Keycloak:', error.response ? error.response.data : error);
        throw error;
    }
}

module.exports = { getKeycloakToken, addUserToKeycloak, getUserFromKeycloak , updateKeycloakUser , deleteUserFromKeycloak }