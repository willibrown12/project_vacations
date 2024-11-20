const assert = require("assert");
const axios = require("axios");
const { faker } = require("@faker-js/faker");
const { deleteVacation } = require("../dist/vacations/handlers/deleteVacation")
const URL = "http://localhost:3000";



describe("vacations data testing", () => {
  it("authentication block you ", async () => {
    try {

      const result = await axios.get(`${URL}/vacations`)
    } catch (error) {
      assert.equal(error.response.status, 401);
      assert.equal(error.response.data.message, "Unauthorized!")
    }

  }),
    it("authentication block you with incorrect token ", async () => {
      try {

        const result = await axios.get(`${URL}/vacations`, {
          headers: { Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" }
        });
      } catch (error) {
        assert.equal(error.response.status, 401);
        assert.equal(error.response.data.message, "Unauthorized!")
      }

    }),
    it("getting the data from vacations", async () => {
      const token = await getToken()

      const result = await axios.get(`${URL}/vacations`, {
        headers: { Authorization: token }
      });

      vacations = result.data.vacations
      assert.equal(typeof vacations, "object");
      assert.equal(Array.isArray(vacations), true);
      assert.notEqual(vacations?.length, 0);

    })

});


describe("vacations admin data testing", () => {
  it("authentication block you ", async () => {
    try {

      const country = "aadsadaaaaa";
      const city = "aaaaaa2222";
      const description = "aaaaaaa33333";
      const start_date = '2023-06-15 09:00:00'
      const end_date = '2023-06-15 09:00:00';
      const price = 22
      const image_url = "https://www.elegantthemes.com/blog/wp-content/uploads/2023/06/What-is-AI-1.jpg"
      const theTest = await axios.post(`${URL}/vacation`, {
        country,
        city,
        description,
        start_date,
        end_date,
        price,
        image_url
      });

    } catch (error) {


      assert.equal(error.response.status, 401);
      assert.equal(error.response.data.message, "Unauthorized!")
    }

  }),
    it("authentication block you with user token", async () => {
      try {

        const country = "aaaaaa1111";
        const city = "aaaaaa2222";
        const description = "aaaaaaa3333";
        const start_date = '2023-06-15 09:00:00'
        const end_date = '2023-06-15 09:00:00';
        const price = 22
        const image_url = "https://www.elegantthemes.com/blog/wp-content/uploads/2023/06/What-is-AI-1.jpg"

        const token = await getToken()
        const result = await axios.post(`${URL}/vacations`,
          {
            country,
            city,
            description,
            start_date,
            end_date,
            price,
            image_url
          },
          {
            headers: { Authorization: token }
          }
        );
      } catch (error) {

        assert.equal(error.response.status, 401);
        assert.equal(error.response.data.message, "Unauthorized!")
      }

    }),
    it("create vacation with admin authorization", async () => {

 
        
        const country = "aaaaaa111";
        const city = "aaaaaa222";
        const description = "aaaaaaa3333";
        const start_date = '2023-06-15 09:00:00'
        const end_date = '2023-06-15 09:00:00';
        const price = 22
        const image_url = `https://www.elegantthemes.com/blog/wp-content/uploads/2023/06/What-is-AI-1.jpg`

        const token = await getTokenAdmin()
     
        
        const result = await axios.post(`${URL}/vacations`,
          {
            country,
            city,
            description,
            start_date,
            end_date,
            price,
            image_url
          },
          {
            headers: { Authorization: token }
          }
        );
       
        
        assert.equal(result.status, 200);
        assert.equal(result.data.message, 'vacation added')
        assert.equal(typeof result.data.data, 'number');
      const end = await deleteVacation(result.data.data)



     

    })

});





async function getToken() {
  const email = 'michael.smith@example.com';
  const password = "BlueSky22@";
  const login = await axios.post(`${URL}/login`, {
    email,
    password,
  });

  return login.data.token

}



async function getTokenAdmin() {
  try {
    const email = 'willi@gmail.com';
    const password = "Vilibrown12!";
    const login = await axios.post(`${URL}/login`, {
      email,
      password,
    });
   
    

    return login.data.token
  }
  catch (error) {
  console.log("i fucked up here");
  return error
  }

}