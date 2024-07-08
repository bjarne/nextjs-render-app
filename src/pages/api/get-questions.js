import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Construct the path to the questions.json file
      const questionsPath = path.join(process.cwd(), 'public', 'questions.json');
      
      // Read the file
      const fileContents = await fs.readFile(questionsPath, 'utf8');
      
      // Parse the JSON content
      const questions = JSON.parse(fileContents);
      
      // Send the questions as the response
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error loading questions:', error);
      res.status(500).json({ message: 'Error loading questions' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}