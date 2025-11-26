import { VoterData } from '../types';

// A simple robust CSV line parser that handles quoted fields with commas
const parseCSVLine = (text: string): string[] => {
  const result: string[] = [];
  let start = 0;
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    if (text[i] === '"') {
      inQuotes = !inQuotes;
    } else if (text[i] === ',' && !inQuotes) {
      let field = text.substring(start, i);
      // Remove surrounding quotes if present
      if (field.startsWith('"') && field.endsWith('"')) {
        field = field.substring(1, field.length - 1);
      }
      result.push(field.trim());
      start = i + 1;
    }
  }
  // Push the last field
  let lastField = text.substring(start);
  if (lastField.startsWith('"') && lastField.endsWith('"')) {
    lastField = lastField.substring(1, lastField.length - 1);
  }
  result.push(lastField.trim());
  return result;
};

export const parseCSVData = (csvContent: string): VoterData[] => {
  const lines = csvContent.trim().split('\n');
  const data: VoterData[] = [];

  // Skip header (index 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const columns = parseCSVLine(line);
    
    // Ensure we have enough columns (based on the provided file structure)
    if (columns.length >= 8) {
      data.push({
        serialNo: columns[0],
        name: columns[1],
        guardianName: columns[2],
        houseNo: columns[3],
        houseName: columns[4],
        genderAge: columns[5],
        secId: columns[6],
        partNo: columns[7],
      });
    }
  }
  return data;
};
