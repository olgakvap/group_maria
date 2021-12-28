const fs = require('fs');

// directory path
const allureReportDir = 'allure-report';
const allureResultsDir = 'allure-results';

// delete directory recursively
try {
  if (fs.existsSync(allureReportDir))
    fs.rmSync(allureReportDir, { recursive: true });
  if (fs.existsSync(allureResultsDir))
    fs.rmSync(allureResultsDir, { recursive: true });
} catch (err) {
  console.error('Error while deleting: ' + err);
}
