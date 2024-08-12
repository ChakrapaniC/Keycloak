const { default: axios } = require("axios");
const { addUserToKeycloak, getUserFromKeycloak, updateKeycloakUser, deleteUserFromKeycloak } = require("../keycloak/confi");
require('dotenv').config();



const addUser = async (req , res) => {
    const userData = req.body;
   
    try{
        const keycloak = await addUserToKeycloak(userData);
        res.status(201).send({message:"user added successfuy"});
    }catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Failed to add user', error: error.message });
    }
}

const getUser = async (req, res) => {

   try{
     const data = await getUserFromKeycloak();
     res.status(200).send({data});
   }catch(error){
     res.status(500).json({ message: 'Failed to get user', error: error.message });
   }
}

const updateUser = async (req, res) => {
    try{
        const user = req.body;
        const id = req.params.id;
        const data = await updateKeycloakUser(id , user);
        res.status(200).send({message: "user updated successfully" , data});

    }catch(error){
        console.log(error);
        res.status(500).json({ message: 'Failed to update user', error: error.message });
      }
}

const deleteUser = async (req , res) => {
    try{
        const id = req.params.id;
        const data = await deleteUserFromKeycloak(id);
        res.status(200).send({message: "user deleted successfully" , data});

    }catch(error){
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
      }
}

module.exports = {addUser, getUser , updateUser , deleteUser}