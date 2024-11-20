const assert = require("assert");
const axios = require("axios");
const { faker } = require("@faker-js/faker");
const {deleteUser}= require("../dist/register/utils/deleteuser")
const URL = "http://localhost:3000";



describe("POST register Integration test", () => {
  it("POST create new user", async () => {
    const first_name = "adminboy111"; 
    const last_name = "adminboy111";   
    const email = "Admin@admin.com";       
    const password = "AdminAdmin12!"; 
try {
  const result = await axios.post(`${URL}/register`, {
    first_name,
    last_name,
    email,
    password,
  });

  assert.equal(result.status, 200); 
  assert.equal(result.data.message,'user registered successfully!')
  assert.equal(typeof result.data.data, 'number');
  const end=await deleteUser(result.data.data)

       
 
} catch (error) {
  console.log(error);
  
}


})

  it("POST register user with email that exist", async () => {
    // INSERT INTO DB USER
    const first_name = "adminboy111"; 
    const last_name = "adminboy111";   
    const email = "Admin@admin.com";       
    const password = "AdminAdmin12!"; 
    const makeItExist = await axios.post(`${URL}/register`, {
      first_name,
      last_name,
      email,
      password,
    });
try {
  const theTest = await axios.post(`${URL}/register`, {
    first_name,
    last_name,
    email,
    password,
  });
} 
    catch (error) {
        assert.equal(error.response.status, 409); 
        assert.equal(error.response.data.message,'email already exist')
  
        
      }
      
      const end=await deleteUser(makeItExist.data.data)
     
      
     });
});



