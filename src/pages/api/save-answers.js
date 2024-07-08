import fs from 'fs/promises';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const answers = req.body;
      const answersPath = path.join(process.cwd(), 'public', 'answers.json');
      await fs.writeFile(answersPath, JSON.stringify(answers, null, 2));
      res.status(200).json({ message: 'Answers saved successfully' });
    } catch (error) {
      console.error('Error saving answers:', error);
      res.status(500).json({ message: 'Error saving answers' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}