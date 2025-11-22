const fs = require('fs').promises;
const path = require('path');

const USER_DATA_FILE = path.join(__dirname, '../data/userInputs.json');


async function saveUserInput(data) {
  try {
    let existingData = [];

    try {
      const fileContent = await fs.readFile(USER_DATA_FILE, 'utf-8');
      existingData = JSON.parse(fileContent);
    } catch (error) {
      if (error.code === 'ENOENT') {
        existingData = [];
      } else {
        console.log('Warning: Could not read user inputs file:', error.message);
      }
    }

    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      ...data
    };

    existingData.push(newEntry);

    try {
      await fs.writeFile(USER_DATA_FILE, JSON.stringify(existingData, null, 2));
      return { success: true, id: newEntry.id };
    } catch (writeError) {
      console.log('Warning: File storage is read-only in production. Data not persisted.');
      return { success: false, error: 'Read-only filesystem', note: 'This is expected in serverless/production environments' };
    }

  } catch (error) {
    console.error('Error saving user input:', error.message);
    return { success: false, error: error.message };
  }
}

async function getUserInputs() {
  try {
    const fileContent = await fs.readFile(USER_DATA_FILE, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    return [];
  }
}

module.exports = {
  saveUserInput,
  getUserInputs
};
