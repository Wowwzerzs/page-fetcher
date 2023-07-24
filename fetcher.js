const request = require("request");
const fs = require("fs");

const args = process.argv.slice(2);
if (args.length !== 2) {
  console.log("Usage: node fetcher.js <URL> <localFilePath>");
  process.exit(1);
}

const [url, localFilePath] = args;

const downloadFile = (url, localFilePath) => {
  // Step 1: Make an HTTP request using the `request` library
  request.get(url, (err, response, body) => {
    if (err) {
      // Handle any errors that occurred during the HTTP request
      console.error("Error fetching URL:", err);
      return;
    }

    if (response.statusCode !== 200) {
      // Handle unexpected status codes, indicating an unsuccessful request
      console.error("Error: Unexpected status code", response.statusCode);
      return;
    }

    // Step 2: Write the response data to a local file
    fs.writeFile(localFilePath, body, (err) => {
      if (err) {
        // Handle any errors that occurred while writing the file
        console.error("Error writing file:", err);
      } else {
        // Step 3: Print a success message upon successful completion
        console.log(`Downloaded and saved ${body.length} bytes to ${localFilePath}`);
      }
    });
  });
};

// Call the downloadFile function with the provided URL and localFilePath
downloadFile(url, localFilePath);
