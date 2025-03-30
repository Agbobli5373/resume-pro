import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API client
// TODO: Store this in environment variables for security
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "YOUR_API_KEY";
const ai = new GoogleGenerativeAI(API_KEY);
const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });

// Helper function for making API calls
async function generateContent(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Ensure we're not returning a promise
    if (responseText && typeof responseText === 'object' && 'then' in responseText) {
      return responseText;
    }

    return responseText;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
}

// Function to analyze job description and extract keywords
export const analyzeJobDescription = async (jobDescription: string) => {
  const prompt = `
    Analyze this job description and extract information:
    "${jobDescription}"
    
    Determine the industry (technology, finance, marketing, or healthcare).
    Calculate a compatibility score between 60-90%.
    Identify relevant keywords found in the description.
    Suggest 5 relevant keywords that are not explicitly mentioned.
    Format your response as JSON with these fields: 
    { 
      "industry": string,
      "compatibilityScore": number,
      "foundKeywords": string[],
      "missingKeywords": string[],
      "suggestedSkills": string[]
    }
  `;

  try {
    const response = await generateContent(prompt);
    // Safely parse JSON response
    try {
      return JSON.parse(response);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      // Return fallback if parsing fails
      return {
        industry: "technology",
        compatibilityScore: 70,
        foundKeywords: [],
        missingKeywords: [],
        suggestedSkills: [],
      };
    }
  } catch (error) {
    console.error("Error analyzing job description:", error);
    // Fallback to simple response in case of API failure
    return {
      industry: "technology",
      compatibilityScore: 70,
      foundKeywords: [],
      missingKeywords: [],
      suggestedSkills: [],
    };
  }
};

// Function to generate a professional summary
export const generateSummary = async (title: string, industry: string, years: number) => {
  const prompt = `
    Generate a professional resume summary for a ${title} with ${years} years of experience in the ${industry} industry.
    The summary should be 2-3 sentences, highlighting skills, strengths, achievements, and outcomes.
    Make it compelling and professional.
  `;

  try {
    const summary = await generateContent(prompt);
    return String(summary).trim();
  } catch (error) {
    console.error("Error generating summary:", error);
    // Fallback to a generic summary
    return `Experienced ${title} with ${years} years in ${industry}, focused on delivering results and driving innovation.`;
  }
};

// Function to improve a bullet point
export const improveBulletPoint = async (bulletPoint: string, improvementType: string) => {
  const prompt = `
    Improve this resume bullet point: "${bulletPoint}"
    
    Improvement type: ${improvementType}
    
    If "concise": Make it shorter and more impactful.
    If "metrics": Add specific metrics/numbers if not present.
    If "action": Start with a strong action verb if not already.
    If "results": Highlight results/outcomes if not already.
    
    Return only the improved bullet point with no additional explanations.
  `;

  try {
    const improved = await generateContent(prompt);
    return String(improved).trim();
  } catch (error) {
    console.error("Error improving bullet point:", error);
    return bulletPoint; // Return original if API fails
  }
};

// Function to generate a cover letter
export const generateCoverLetter = async (name: string, position: string, company = "the company", skills: string[] = []) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const skillsText = skills.length > 0 ? skills.join(", ") : "relevant skills";

  const prompt = `
    Write a professional cover letter for ${name} applying for the ${position} position at ${company}.
    Include these skills: ${skillsText}.
    Format it as a formal letter with the current date (${currentDate}), greeting, 3-4 paragraphs of content, and a closing.
    The letter should be personalized, professional, and highlight relevant qualifications.
  `;

  try {
    const coverLetter = await generateContent(prompt);
    return String(coverLetter).trim();
  } catch (error) {
    console.error("Error generating cover letter:", error);

    // Fallback to a simple cover letter
    return `${currentDate}

Dear Hiring Manager,

I am writing to express my interest in the ${position} position at ${company}. With my background in ${skillsText}, I am confident in my ability to contribute to your team.

Thank you for considering my application.

Sincerely,
${name}`;
  }
};

// Function to generate work experience bullet points
export const generateBulletPoints = async (title: string, industry = "technology") => {
  const prompt = `
    Generate 3-5 strong resume bullet points for a ${title} position in the ${industry} industry.
    Each bullet should:
    1. Start with a strong action verb
    2. Include specific accomplishments
    3. Incorporate metrics where possible
    4. Be concise and impactful
    
    Format your response as a JSON array of strings, each string being a bullet point.
  `;

  try {
    const response = await generateContent(prompt);

    // Ensure we have a string before parsing
    if (typeof response !== 'string') {
      throw new Error('Expected string response for JSON parsing');
    }

    try {
      return JSON.parse(response);
    } catch (parseError) {
      console.error("Error parsing bullet points JSON:", parseError);
      // Return fallback bullets
      return [
        `Led key initiatives for ${industry} projects, resulting in improved outcomes`,
        `Developed strategic solutions that enhanced team productivity`,
        `Implemented process improvements that reduced costs`
      ];
    }
  } catch (error) {
    console.error("Error generating bullet points:", error);
    // Return fallback bullets
    return [
      `Led key initiatives for ${industry} projects, resulting in improved outcomes`,
      `Developed strategic solutions that enhanced team productivity`,
      `Implemented process improvements that reduced costs`
    ];
  }
};

// Helper function to safely use AI responses in UI
export const safelyUseAIResponse = async <T>(
  promiseOrValue: T | Promise<T>,
  fallback: T
): Promise<T> => {
  try {
    if (promiseOrValue instanceof Promise) {
      return await promiseOrValue;
    }
    return promiseOrValue;
  } catch (error) {
    console.error("Error resolving AI response:", error);
    return fallback;
  }
};