# Resume Pro

A modern resume builder application with AI-powered features to help you create professional resumes and cover letters tailored to specific job descriptions.

## Features

- **Multiple Resume Templates**: Choose from various templates including Ghana-specific formats
- **AI-Powered Resume Tools**:
  - Generate professional summaries based on your experience
  - Analyze job descriptions for keyword matching
  - Improve bullet points with metrics and action verbs
  - Generate tailored cover letters
  - Suggest relevant skills and keywords
- **Customizable Settings**: Adjust font sizes, spacing, and layout options
- **Real-time Preview**: See changes as you make them
- **Dark Mode Support**: Switch between light and dark themes

## Technologies Used

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **AI Integration**: Google Generative AI (Gemini)
- **State Management**: Custom React hooks

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google Generative AI API key

### Installation

1. Clone the repository

   ```bash
   git clone [your-repo-url]
   cd resume-pro
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory with your Google Generative AI API key:

   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
   ```

4. Start the development server

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating a Resume

1. Navigate to the resume builder page
2. Enter your personal information
3. Add work experience, education, skills, and other sections
4. Choose a template that suits your needs
5. Adjust settings like font size and spacing
6. Download or share your resume

### Using AI Features

- **Summary Generation**: Enter your job title, industry, and years of experience to generate a professional summary
- **Job Description Analysis**: Paste a job description to identify key requirements and calculate compatibility
- **Bullet Point Improvement**: Enhance existing bullet points with metrics, action verbs, or results
- **Cover Letter Creation**: Generate a customized cover letter based on your skills and the job description

## Project Structure

```
resume-pro/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── resume-editor.tsx        # Resume editor with templates
│   └── resume-settings-dialog.tsx # Settings for resume customization
├── lib/                 # Utility functions and custom hooks
│   ├── resume-store.ts  # Resume data store
│   └── ai-service.ts    # AI integration service
├── public/              # Static files
└── ...                  # Configuration files
```

## Environment Variables

- `NEXT_PUBLIC_GEMINI_API_KEY`: Your Google Generative AI API key

## License

[MIT License](LICENSE)
