// const express = require("express"); // "type": "commonjs"
import express from "express"; // "type": "module"
const app = express();
import { readFile } from "fs/promises";

const roomDetails = [{
  Room_id: 1,
  room_Name: "King Suite",
  Number_Of_Seats_Available: 25,
  Amenities_In_Room: ["Meeting systems", "Free wifi", "24hours food service"],
  Price_For_1Hour: "101"
},
{
  Room_id: 2,
  room_Name: "Queen Suite",
  Number_Of_Seats_Available: 30,
  Amenities_In_Room: [
    "Projector for meeting",
    "Free wifi",
    "free drinks",
    "Entertainment system",
  ],
  Price_For_1Hour: "650",
},
{
  Room_id: 3,
  room_Name: "Master Suite",
  Number_Of_Seats_Available: 50,
  Amenities_In_Room: ["auditorium", "Entertainment system", "Free wifi"],
  Price_For_1Hour: "924"
},
{
  Room_id: 4,
  room_Name: "Presidential Suite",
  Number_Of_Seats_Available: 80,
  Amenities_In_Room: ["Free wifi", "Big screen", "meeting hall"],
  Price_For_1Hour: "390"
},
{
  Room_id: 5,
  room_Name: "Gaming Suite",
  Number_Of_Seats_Available: 75,
  Amenities_In_Room: ["Free wifi", "Big screen", "meeting hall"],
  Price_For_1Hour: "679"
},
{
  Room_id: 6,
  room_Name: "Emperor Suite",
  Number_Of_Seats_Available: 50,
  Amenities_In_Room: ["Meeting systems", "Free wifi", "24hours food service"],
  Price_For_1Hour: "150"
},
{
  Room_id: 7,
  room_Name: "Lord Suite",
  Number_Of_Seats_Available: 100,
  Amenities_In_Room: ["Meeting systems", "Free wifi", "24hours food service"],
  Price_For_1Hour: "200"
}
]

const bookedData = [
  {
    Room_id: 1,
    customer_Name: "Dustin Lindsey",
    date: "26/04/2023",
    start_Time: "12:00:00",
    end_Time: "02:00:00",
    booked_Status: true,
    booking_Id: "B1",
    booking_Date: "26/04/2023",
    booking_Status: "Booked",
  },
  {
    Room_id: 2,
    customer_Name: "Ryan Garrett",
    date: "24/03/2023",
    start_Time: "14:30:00",
    end_Time: "09:00:00",
    booked_Status: true,
    booking_Id: "B2",
    booking_Date: "24/03/2023",
    booking_Status: "Booked",
  },
  {
    Room_id: 3,
    customer_Name: "Joshua Fox",
    date: "25/07/2023",
    start_Time: "09:00:00",
    end_Time: "14:30:00",
    booked_Status: false,
    booking_Id: "B3",
    booking_Date: "22/02/2022",
    booking_Status: "Booked",
  },
  {
    Room_id: 4,
    customer_Name: "Luna Cohen",
    date: "25/08/2023",
    start_Time: "14:30:00",
    end_Time: "09:00:00",
    booked_Status: false,
    booking_Id: "B4",
    booking_Date: "25/08/2023",
    booking_Status: "Booked",
  }
  // {
  // Room_id: 5,
  //   customer_Name: "Sophia Grant",
  //   date: "29/03/2023",
  //   start_Time: "",
  //   end_Time: "",
  //   booked_Status: true,
  //   booking_Id: "B5",
  //   booking_Date: "29/03/2023",
  //   booking_Status: "Booked",
  // },
  // {

  //   customer_Name: "Dustin Lindsey",
  //   date: "26/04/2024",
  //   start_Time: "12:00:00",
  //   end_Time: "02:00:00",
  //   booked_Status: true,
  //   booking_Id: "B6",
  //   booking_Date: "26/04/2024",
  //   booking_Status: "Booked",
  // },
  // {

  //   customer_Name: "Dustin Lindsey",
  //   date: "6/04/2024",
  //   start_Time: "08:00:00",
  //   end_Time: "14:30:00",
  //   booked_Status: true,
  //   booking_Id: "567",
  //   booking_Date: "26/04/2023",
  //   booking_Status: "Booked",
  // },

];

const PORT = 4000;

// Gets the homepage

app.get('/', async (request, response) => {
  try {

    // Use readFile to read the file asynchronously
    const fileData = await readFile("./index.html", "utf-8")

    // Send the file contents in the HTTP response
    response.send(fileData);

  } catch (err) {
    // If there's an error reading the file, send an error response
    console.error('Error reading file:', err);
    response.status(500).send('Error reading file');
  }
});

app.use(express.json())

// To create a room
app.post("/createRoom", function (request, response) {
  let newRoom = request.body;
  roomDetails.push(newRoom);
  response.send({ message: "The room is created" });
});

app.get("/allRooms", function (request, response) {
  response.send(roomDetails);
})

//To book a room
app.post("/bookRoom", async (request, response) => {
  try {

    let Booking = await request.body;
    let filteredData = bookedData.find((data) => data.Room_id === Booking.Room_id);
    const date = new Date();
    let time = date.toTimeString();
    let currentDate = date.toDateString();
    if (filteredData == undefined) {
      const bookingId = "B" + bookedData.length + 1;
      let newBooking = { ...Booking, booking_Id: bookingId, booking_Date: currentDate, start_Time: time, end_Time: time }
      console.log(newBooking)
      bookedData.push(newBooking)
      response.status(201).send("The Room is Booked")
    }
  }
  catch (err) {
    console.log("Error", err)
    response.status(500).send('The Room is not available');
  }
})

//To list all rooms with booked data
app.get("/GetAllRooms", function (request, response) {
  response.send(bookedData);
});

//To list all the customers with booked data

app.get("/GetAllCustomersData", function (request, response) {
  response.send(bookedData);
})


//List how many times a customer has booked the room

app.get("/repeatCustomers", function (request, response) {
  response.send(bookedData);
})






app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
