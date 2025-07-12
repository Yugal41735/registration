const express = require("express");
const morgan = require("morgan");

const { ServerConfig } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(morgan(":method :url :status :response-time ms :date[web]"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Employee API is running",
        timestamp: new Date().toISOString(),
        version: "1.0.0"
    });
});

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, (req, res) => {
    console.log(`server running on port ${ServerConfig.PORT}`);
});
