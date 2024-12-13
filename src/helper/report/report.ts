import { generate } from "multiple-cucumber-html-reporter";

generate({
  jsonDir: "test-results", // Path where JSON files are stored
  reportPath: "test-results/reports", // Path to generate the HTML report
  metadata: {
    browser: {
      name: "chrome",
      version: "112", // Specify your browser version
    },
    device: "Local test machine",
    platform: {
      name: "windows", // Change to your OS
      version: "10",
    },
  },
  customData: {
    title: "Run Info",
    data: [
      { label: "Project", value: "Playwright with Cucumber" },
      { label: "Release", value: "1.0.0" },
      { label: "Execution Date", value: new Date().toLocaleDateString() },
    ],
  },
});
