const http = require('http');
const fs = require('fs').promises;
const PORT = 3005;

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === "OPTIONS") {
        res.statusCode = 200;
        return res.end();
    }

    // Save Room Data
    if (req.url === "/rooms" && req.method === "POST") {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const newRoom = JSON.parse(body);
                let roomData = [];
                try {
                    const fileData = await fs.readFile('Roomdata.json', 'utf-8');
                    roomData = JSON.parse(fileData);
                } catch { roomData = []; }
                roomData.push(newRoom);
                await fs.writeFile('Roomdata.json', JSON.stringify(roomData, null, 2));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ msg: "Room data saved successfully" }));
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ msg: "Error: " + err.message }));
            }
        });
    }

    // Register
    if (req.url === "/register" && req.method === "POST") {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { name, email, password, userType } = JSON.parse(body);
                let data = [];
                try {
                    const fileData = await fs.readFile('student.json', 'utf-8');
                    data = JSON.parse(fileData);
                } catch { data = []; }
                const exists = data.find(u => u.email === email);
                if (exists) {
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({ msg: "Email is already registered" }));
                }
                data.push({ name, email, password, userType });
                await fs.writeFile('student.json', JSON.stringify(data, null, 2));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ msg: "User successfully registered" }));
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ msg: "Error: " + err.message }));
            }
        });
    }

    // Login
    if (req.url === "/login" && req.method === "POST") {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { email, password, role } = JSON.parse(body);
                const fileData = await fs.readFile('student.json', 'utf-8');
                const users = JSON.parse(fileData);
                const user = users.find(u => u.email === email && u.password === password && u.userType === role);
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ msg: user ? "success" : "User is invalid" }));
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ msg: "Error: " + err.message }));
            }
        });
    }

    // Submit Maintenance Request (POST)
    if (req.url === "/maintenance" && req.method === "POST") {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const newRequest = JSON.parse(body);
                let maintenanceData = [];
                try {
                    const fileData = await fs.readFile('maintenanceReq.json', 'utf-8');
                    maintenanceData = JSON.parse(fileData);
                } catch { maintenanceData = []; }

                // Add unique id to each request
                newRequest.id = Date.now();
                newRequest.status = "Unresolved";

                maintenanceData.push(newRequest);
                await fs.writeFile('maintenanceReq.json', JSON.stringify(maintenanceData, null, 2));
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ msg: "Maintenance request saved successfully" }));
            } catch (err) {
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ msg: "Error: " + err.message }));
            }
        });
    }

    // Fetch All Maintenance Requests (GET)
    if (req.url === "/maintenance" && req.method === "GET") {
        fs.readFile('maintenanceReq.json', 'utf-8')
            .then(data => {
                res.setHeader('Content-Type', 'application/json');
                res.end(data);
            })
            .catch(err => {
                res.setHeader('Content-Type', 'application/json');
                res.statusCode = 500;
                res.end(JSON.stringify({ msg: "Error reading maintenance data", error: err.message }));
            });
    }

    // Update Maintenance Request Status (PUT)
    if (req.url === "/maintenance" && req.method === "PUT") {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', async () => {
            try {
                const { requestId, status } = JSON.parse(body);
                const fileData = await fs.readFile('maintenanceReq.json', 'utf-8');
                let maintenanceData = JSON.parse(fileData);

                const index = maintenanceData.findIndex(r => r.id === requestId);
                if (index !== -1) {
                    maintenanceData[index].status = status;
                    await fs.writeFile('maintenanceReq.json', JSON.stringify(maintenanceData, null, 2));
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ msg: "Status updated successfully" }));
                } else {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ msg: "Request not found" }));
                }
            } catch (err) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ msg: "Error: " + err.message }));
            }
        });
    }

});

server.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
