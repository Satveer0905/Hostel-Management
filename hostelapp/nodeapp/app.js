const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3005;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// mongoose.connect('mongodb://localhost:27017/hostel-management-db', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('MongoDB connected'))
//     .catch(err => console.log(err));
    mongoose.connect('mongodb://localhost:27017/hostel-management-db')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// MongoDB Schemas

const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },          
  admissionNo: { type: String, required: true, unique: true },  
  year: { type: String, required: true },            
  branch: { type: String, required: true },          
  roomType: { type: String, required: true },        
  roomNo: { type: String, required: true },          
  roomId: { type: String, required: true, unique: true } 
});

module.exports = mongoose.model('Room', roomSchema);


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    userType: String
});

const maintenanceSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    studentName: String,
    admissionNo: String,
    roomId: String,
    issue: String,
    status: { type: String, default: "Unresolved" }
});


const reportSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    name: String,
    roomNo: String,
    roomId: String,
    admissionNo: String,
    description: String,
    status: { type: String, default: "Not accepted" }
});

// MongoDB Models
const Room = mongoose.model('Room', roomSchema);
const User = mongoose.model('User', userSchema);
const MaintenanceRequest = mongoose.model('MaintenanceRequest', maintenanceSchema);
const Report = mongoose.model('Report', reportSchema);

// Student Details Schema
const studentDetailsSchema = new mongoose.Schema({
    name: String,
    phoneNo: String,
    gender: String,
    rollNo: String,
    admissionNo: { type: String, unique: true },
    email: { type: String, unique: true }
});

const StudentDetails = mongoose.model('StudentDetails', studentDetailsSchema);

// Get student details by email
app.get('/studentDetails/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const details = await StudentDetails.findOne({ email });
        if (details) {
            res.json(details);
        } else {
            res.status(404).json({ msg: "Student details not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error fetching student details", error: err.message });
    }
});

// Create student details
app.post('/studentDetails', async (req, res) => {
    try {
        const { name, phoneNo, gender, admissionNo, email } = req.body;
        const existing = await StudentDetails.findOne({ email });
        if (existing) {
            return res.status(400).json({ msg: "Student details already exist" });
        }
        const newDetails = new StudentDetails({ name, phoneNo, gender, admissionNo, email });
        await newDetails.save();
        res.json({ msg: "Student details saved successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error saving student details", error: err.message });
    }
});

// Update student details by email
app.put('/studentDetails/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const updateData = req.body;
        const updated = await StudentDetails.findOneAndUpdate({ email }, updateData, { new: true });
        if (!updated) {
            return res.status(404).json({ msg: "Student details not found" });
        }
        res.json({ msg: "Student details updated successfully", updated });
    } catch (err) {
        res.status(500).json({ msg: "Error updating student details", error: err.message });
    }
});

// Save Room Data
app.post('/rooms', async (req, res) => {
    try {
        const newRoom = new Room(req.body);
        await newRoom.save();
        res.json({ msg: "Room data saved successfully" });
    } catch (err) {
        res.json({ msg: "Error: " + err.message });
    }
});

// Delete Room Data (Deallocate Room)
app.delete('/rooms/:roomId', async (req, res) => {
    try {
        const { roomId } = req.params;
        const deletedRoom = await Room.findOneAndDelete({ roomId });
        if (deletedRoom) {
            res.json({ msg: "Room deallocated successfully" });
        } else {
            res.status(404).json({ msg: "Room not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error: " + err.message });
    }
});

// Get All Rooms
app.get('/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching rooms", error: err.message });
    }
});

// Delete Room Data (Deallocate Room)
app.delete('/rooms/:roomId', async (req, res) => {
    try {
        const { roomId } = req.params;
        const deletedRoom = await Room.findOneAndDelete({ roomId });
        if (deletedRoom) {
            res.json({ msg: "Room deallocated successfully" });
        } else {
            res.status(404).json({ msg: "Room not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error: " + err.message });
    }
});

// Register
app.post('/register', async (req, res) => {
    try {
        const { name, email, password, userType } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.json({ msg: "Email is already registered" });

        const newUser = new User({ name, email, password, userType });
        await newUser.save();
        res.json({ msg: "User successfully registered" });
    } catch (err) {
        res.json({ msg: "Error: " + err.message });
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        const user = await User.findOne({ email, password, userType: role });

        if (user) {
            res.json({ msg: "success", user });
        } else {
            res.json({ msg: "User is invalid" });
        }
    } catch (err) {
        res.json({ msg: "Error: " + err.message });
    }
});

// Submit Maintenance Request
app.post('/maintenance', async (req, res) => {
    try {
        const newRequest = new MaintenanceRequest({ ...req.body, id: Date.now() });
        await newRequest.save();
        res.json({ msg: "Maintenance request saved successfully" });
    } catch (err) {
        res.json({ msg: "Error: " + err.message });
    }
});

// Get All Maintenance Requests
app.get('/maintenance', async (req, res) => {
    try {
        const maintenanceRequests = await MaintenanceRequest.find();
        res.json(maintenanceRequests);
    } catch (err) {
        res.status(500).json({ msg: "Error reading maintenance data", error: err.message });
    }
});

// Update Maintenance Status
app.put('/maintenance', async (req, res) => {
    try {
        const { requestId, status } = req.body;
        const maintenance = await MaintenanceRequest.findOne({ id: requestId });

        if (maintenance) {
            maintenance.status = status;
            await maintenance.save();
            res.json({ msg: "Status updated successfully" });
        } else {
            res.status(404).json({ msg: "Request not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error: " + err.message });
    }
});

// Delete Maintenance Request
app.delete('/maintenance/:id', async (req, res) => {
    try {
        const requestId = req.params.id;
        const deleted = await MaintenanceRequest.findOneAndDelete({ id: requestId });
        if (deleted) {
            res.json({ msg: "Maintenance request deleted successfully" });
        } else {
            res.status(404).json({ msg: "Maintenance request not found" });
        }
    } catch (err) {
        res.status(500).json({ msg: "Error deleting maintenance request", error: err.message });
    }
});

// Submit Reports
app.post('/report', async (req, res) => {
    try {
        const newReport = new Report({ ...req.body, id: Date.now() });
        await newReport.save();
        res.json({ msg: "Report submitted successfully" });
    } catch (err) {
        res.json({ msg: "Error: " + err.message });
    }
});

// Get All Reports
app.get('/report', async (req, res) => {
    try {
        const reports = await Report.find();
        res.json(reports);
    } catch (err) {
        res.status(500).json({ msg: "Error fetching reports", error: err.message });
    }
});

// Update Report Status
// Update Report Status
app.put('/report/:id', async (req, res) => {
    try {
        const reportId = req.params.id;
        const { status } = req.body;

        // Check for valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(reportId)) {
            return res.status(400).json({ msg: "Invalid report ID format" });
        }

        const updatedReport = await Report.findByIdAndUpdate(
            reportId,
            { status },
            { new: true }
        );

        if (!updatedReport) {
            return res.status(404).json({ msg: "Report not found" });
        }

        res.json({ msg: "Report status updated successfully", updatedReport });
    } catch (err) {
        res.status(500).json({ msg: "Error updating report status", error: err.message });
    }
});

// Delete Report
app.delete('/report/:id', async (req, res) => {
    try {
        const reportId = req.params.id;

        // Check for valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(reportId)) {
            return res.status(400).json({ msg: "Invalid report ID format" });
        }

        const deletedReport = await Report.findByIdAndDelete(reportId);

        if (!deletedReport) {
            return res.status(404).json({ msg: "Report not found" });
        }

        res.json({ msg: "Report deleted successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error deleting report", error: err.message });
    }
});


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});








// const express = require('express');
// const fs = require('fs').promises;
// const cors = require('cors');
// const app = express();
// const PORT = 3005;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Save Room Data
// app.post('/rooms', async (req, res) => {
//     try {
//         const newRoom = req.body;
//         let roomData = [];
//         try {
//             const fileData = await fs.readFile('Roomdata.json', 'utf-8');
//             roomData = JSON.parse(fileData);
//         } catch {
//             roomData = [];
//         }
//         roomData.push(newRoom);
//         await fs.writeFile('Roomdata.json', JSON.stringify(roomData, null, 2));
//         res.json({ msg: "Room data saved successfully" });
//     } catch (err) {
//         res.json({ msg: "Error: " + err.message });
//     }
// });

// // Register
// app.post('/register', async (req, res) => {
//     try {
//         const { name, email, password, userType } = req.body;
//         let data = [];
//         try {
//         const fileData = await fs.readFile('user.json', 'utf-8');
//         data = JSON.parse(fileData);
//         } catch {
//             data = [];
//         }

//         const exists = data.find(u => u.email === email);
//         if (exists) return res.json({ msg: "Email is already registered" });

//         data.push({ name, email, password, userType });
//         await fs.writeFile('user.json', JSON.stringify(data, null, 2));
//         res.json({ msg: "User successfully registered" });
//     } catch (err) {
//         res.json({ msg: "Error: " + err.message });
//     }
// });

// // Login
// // app.post('/login', async (req, res) => {
// //     try {
// //         const { email, password, role } = req.body;
// //         const fileData = await fs.readFile('student.json', 'utf-8');
// //         const users = JSON.parse(fileData);
// //         const user = users.find(u => u.email === email && u.password === password && u.userType === role);
// //         res.json({ msg: user ? "success" : "User is invalid" });
// //     } catch (err) {
// //         res.json({ msg: "Error: " + err.message });
// //     }
// // });
// // Login
// app.post('/login', async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
//         const fileData = await fs.readFile('user.json', 'utf-8');
//         const users = JSON.parse(fileData);
//         const user = users.find(u => u.email === email && u.password === password && u.userType === role);
        
//         if (user) {
//             const name = user.name;
//             // console.log(name)
//             res.json({ msg: "success", user }); // send user info
//         } else {
//             res.json({ msg: "User is invalid" });
//         }
//     } catch (err) {
//         res.json({ msg: "Error: " + err.message });
//     }
// });


// // Submit Maintenance Request
// app.post('/maintenance', async (req, res) => {
//     try {
//         const newRequest = req.body;
//         let maintenanceData = [];
//         try {
//             const fileData = await fs.readFile('maintenanceReq.json', 'utf-8');
//             maintenanceData = JSON.parse(fileData);
//         } catch {
//             maintenanceData = [];
//         }

//         newRequest.id = Date.now();
//         newRequest.status = "Unresolved";

//         maintenanceData.push(newRequest);
//         await fs.writeFile('maintenanceReq.json', JSON.stringify(maintenanceData, null, 2));
//         res.json({ msg: "Maintenance request saved successfully" });
//     } catch (err) {
//         res.json({ msg: "Error: " + err.message });
//     }
// });

// // Get All Maintenance Requests
// app.get('/maintenance', async (req, res) => {
//     try {
//         const data = await fs.readFile('maintenanceReq.json', 'utf-8');
//         res.json(JSON.parse(data));
//     } catch (err) {
//         res.status(500).json({ msg: "Error reading maintenance data", error: err.message });
//     }
// });

// // Update Maintenance Status
// app.put('/maintenance', async (req, res) => {
//     try {
//         const { requestId, status } = req.body;
//         const fileData = await fs.readFile('maintenanceReq.json', 'utf-8');
//         let maintenanceData = JSON.parse(fileData);

//         const index = maintenanceData.findIndex(r => r.id === requestId);
//         if (index !== -1) {
//             maintenanceData[index].status = status;
//             await fs.writeFile('maintenanceReq.json', JSON.stringify(maintenanceData, null, 2));
//             res.json({ msg: "Status updated successfully" });
//         } else {
//             res.status(404).json({ msg: "Request not found" });
//         }
//     } catch (err) {
//         res.status(500).json({ msg: "Error: " + err.message });
//     }
// });

// //submit Reports
// app.post(
//     '/report', async (req, res) => {
//         try {
//             const newReport = req.body;
//             let reportData = [];
//             try {
//                 const fileData = await fs.readFile('report.json', 'utf-8');
//                 reportData = JSON.parse(fileData);
//             } catch {
//                 reportData = [];
//             }

//             newReport.id = Date.now();
//             reportData.push(newReport);
//             await fs.writeFile('report.json', JSON.stringify(reportData, null, 2));
//             res.json({ msg: "Report submitted successfully" });
//         } catch (err) {
//             res.json({ msg: "Error: " + err.message });
//         }
//     }
// )

// // Start Server
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
