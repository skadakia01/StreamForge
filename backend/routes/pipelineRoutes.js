const express = require("express");
const router = express.Router();
const { spawn } = require("child_process");

router.post("/analyze", (req, res) => {
  let rawLog = "";
  req.on("data", chunk => rawLog += chunk);
  req.on("end", () => {
    const analyzer = spawn("python3", ["./ai-ml/analyzer.py"]);
    let output = "";

    analyzer.stdin.write(rawLog);
    analyzer.stdin.end();

    analyzer.stdout.on("data", (data) => {
      output += data.toString();
    });

    analyzer.stderr.on("data", (err) => {
      console.error("Analyzer error:", err.toString());
    });

    analyzer.on("close", () => {
      try {
        const result = JSON.parse(output);
        res.json(result);
      } catch (err) {
        console.error("Parse error:", err.message);
        res.status(500).json({ error: "Failed to parse analyzer output" });
      }
    });
  });
});

router.post("/optimize", (req, res) => {
  const metrics = JSON.stringify(req.body); // expect { metrics: [...] }

  const optimizer = spawn("python3", ["./ai-ml/optimizer.py"]);
  let output = "";

  optimizer.stdin.write(metrics);
  optimizer.stdin.end();

  optimizer.stdout.on("data", (data) => {
    output += data.toString();
  });

  optimizer.stderr.on("data", (err) => {
    console.error("Optimizer error:", err.toString());
  });

  optimizer.on("close", () => {
    try {
      const result = JSON.parse(output);
      res.json(result);
    } catch (err) {
      console.error("Parse error:", err.message);
      res.status(500).json({ error: "Failed to parse optimizer output" });
    }
  });
});

module.exports = router;