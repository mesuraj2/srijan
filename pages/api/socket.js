// import { Server } from 'socket.io'
// // console.log("ithksdf")
// const SocketHandler = (req, res) => {
//   if (res.socket.server.io) {
//     // console.log('Socket is already running')
//   } else {
//     // console.log('Socket is initializing')
//     const io = new Server(res.socket.server,{
//       pingTimeout: 60000,
//     })
//     res.socket.server.io = io

    // io.on("connection", (socket) => {
    //   // console.log("Connected to socket.io");
    //   socket.on("setup", (userData) => {
    //     console.log(userData)
    //     socket.join(userData);
    //     socket.emit("connected");
    //   });
    
    //   socket.on("join chat", (room) => {
    //     socket.join(room);
    //     console.log("User Joined Room: " + room);
    //   });
    //   socket.on("typing", (room) => {socket.in(room).emit("typing")
    // console.log("typing start")
    // });
    //   socket.on("stop typing", (room) => {socket.in(room).emit("stop typing")
    // console.log("stop typing")
    // });
    
    //   socket.on("new message", (newMessageRecieved) => {
    //     // console.log(newMessageRecieved)
    //     console.log("message recieved")
    //     var chat = newMessageRecieved.chat;
    
    //     if (!chat.users) return console.log("chat.users not defined");
    //     chat.users.forEach((user) => {
    //       console.log(user._id)
    //       if (user._id == newMessageRecieved.sender._id) return;
    //       // console.log("suraj")
    //       socket.in(user._id).emit("message recieved", newMessageRecieved);
    //       // socket.emit("message recieved", newMessageRecieved);
    //     });
    //   });
    
    //   socket.off("setup", () => {
    //     // console.log("USER DISCONNECTED");
    //     socket.leave(userData._id);
    //   });
    // });
//   }
//   res.end()
// }

// export default SocketHandler


import { Server } from 'socket.io'

const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')

    const io = new Server(res.socket.server)
    io.set('origins', '*:*');
    io.on("connection", (socket) => {
      // console.log("Connected to socket.io");
      socket.on("setup", (userData) => {
        console.log(userData)
        socket.join(userData);
        socket.emit("connected");
      });
    
      socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
      });
      socket.on("typing", (room) => {socket.in(room).emit("typing")
    console.log("typing start")
    });
      socket.on("stop typing", (room) => {socket.in(room).emit("stop typing")
    console.log("stop typing")
    });
    
      socket.on("new message", (newMessageRecieved) => {
        // console.log(newMessageRecieved)
        console.log("message recieved")
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
        chat.users.forEach((user) => {
          console.log(user._id)
          if (user._id == newMessageRecieved.sender._id) return;
          // console.log("suraj")
          socket.in(user._id).emit("message recieved", newMessageRecieved);
          // socket.emit("message recieved", newMessageRecieved);
        });
      });
    
      socket.off("setup", () => {
        // console.log("USER DISCONNECTED");
        socket.leave(userData._id);
      });
    });

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler