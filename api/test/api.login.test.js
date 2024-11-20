const assert = require("assert");
const axios = require("axios");
const { faker } = require("@faker-js/faker");
const {deleteUser}= require("../dist/register/utils/deleteuser");
const { log } = require("console");
const URL = "http://localhost:3000";



describe("POST login with a user exist", () => {
  it("login to user", async () => {  
    const email ='michael.smith@example.com';       
    const password ="BlueSky22@"; 

  const result = await axios.post(`${URL}/login`, {
    email,
    password,
  });

  

  assert.equal(result.status, 200); 
  assert.equal(result.data.message,'user logged In successfully!')
}),
it("login to user not exist", async () => {  
    const email ='mmmmmmmichael.smith@example.com';       
    const password ="BlueSky22@"; 
try {
    const result = await axios.post(`${URL}/login`, {
        email,
        password,
      });
    
} catch (error) {
    assert.equal(error.response.status, 401); 
    assert.equal(error.response.data.message,"email or passwords are incorrect")
}

 
})
it("login to incorrect password", async () => {  
    const email ='michael.smith@example.com';       
    const password ="BlueSky22@1"; 
try {
    const result = await axios.post(`${URL}/login`, {
        email,
        password,
      });
    
} catch (error) {
    assert.equal(error.response.status, 401); 
    assert.equal(error.response.data.message,"email or passwords are incorrect")
}

 
})
it("login to user and token works", async () => {  
   
        
   
    const email ='michael.smith@example.com';       
    const password ="BlueSky22@"; 
    const login = await axios.post(`${URL}/login`, {
        email,
        password,
      });
    
    
      const result = await axios.get(`${URL}/vacations`, {headers:{ Authorization: login.data.token } });
  
    
    vacations=result.data.vacations
    assert.equal(typeof vacations, "object");
    assert.equal(Array.isArray(vacations), true);
    assert.notEqual(vacations?.length, 0); }

   
)



});



