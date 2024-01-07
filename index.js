// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
const app = express();

const Rooms = [
  {
    id: 1,
    Number_Of_Seats_Available: 25,
    Amenities_In_Room: ["Meeting systems" , "Free wifi" , "24hours food service" ],
    Price_For_1Hour: "",
  },
  {
    id: 2,
    Number_Of_Seats_Available: 30,
    Amenities_In_Room: ["Projector for meeting" , "Free wifi" , "free drinks" , "Entertainment system"],
    Price_For_1Hour: "",
  },
  {
    id: 3,
    Number_Of_Seats_Available: 50,
    Amenities_In_Room:  ["auditorium" , "Entertainment system" , "Free wifi"],
    Price_For_1Hour: "",
  },
  {
    id: 4,
    Number_Of_Seats_Available: 100,
    Amenities_In_Room: ["Free wifi" , "Big screen" , "meeting hall"],
    Price_For_1Hour: "",
  },
];
const PORT = 4000;
app.get("/", function (request, response) {
  response.send("🙋‍♂️, 🌏 🎊✨🤩");
});

app.post("/CreateRooms",  function (request, response) {
   const data =  request.body;
   console.log(data)
   Rooms.push(data)
   response.send(Rooms)
});

const arr = [{one:"one"},{Two:"Two"}]

arr.push({three:"three"})

console.log(arr)
app.get("/Rooms" , function (request , response){
  response.send(Rooms)
})
app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
