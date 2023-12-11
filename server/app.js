import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const PORT = process.env.PORT || 3001;

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("CreateOrder", (customerID) => {
    io.emit("Noti new order", customerID);
  });

  socket.on("orderUpdated", (status, customerID) => {

    io.emit("orderStatusUpdated", status, customerID);
  });

  socket.on("disconnect", (reason) => {
    console.log(reason);
  });
});

httpServer.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
