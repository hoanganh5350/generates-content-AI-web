AI Content Generator

A project that generates social media content using AI and verifies phone numbers via SMS.

✨ Features

Generate captions based on social network, subject, and tone

Suggest post ideas by topic

Generate captions from an idea

Send OTP codes via Twilio SMS

Save captions selected by the user

🔧 Backend Setup

Navigate to the backend directory:

cd back-end

🚀 Installation

npm install

📄 Create .env file

PORT=3000
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=+123456789
GEMINI_API_KEY=your_gemini_api_key

Also, add a Firebase service account key file:config/firebaseServiceAccountKey.json(Download it from your Firebase Console)

▶️ Run the server

npm run dev

📂 Project Structure

src/
├── controllers/         // API logic
├── routes/              // Route definitions
├── services/            // Firebase, Twilio, Gemini integrations
├── utils/               // Utility functions (e.g., access code generator)
├── app.ts               // Express app setup
├── index.ts             // Server entry point

📁 API Endpoints

🔐 Auth

POST /auth/create-code

Send OTP via SMSInput:

{ "phoneNumber": "+849xxxxxxxx" }

Output:

{ "accessCode": "123456" }

POST /auth/validate-code

Validate access codeInput:

{ "phoneNumber": "+849xxxxxxxx", "accessCode": "123456" }

Output:

{ "success": true }

🎨 Content

POST /content/generate-captions

Generate captions from subjectInput:

{ "socialNetwork": "Facebook", "subject": "food", "tone": "funny" }

Output:

["Caption 1", "Caption 2"]

POST /content/post-ideas

Suggest post ideas by topicInput:

{ "topic": "travel" }

Output:

["Idea 1", "Idea 2"]

POST /content/captions-from-idea

Generate captions from ideaInput:

{ "idea": "street food under $2" }

Output:

["Caption 1", "Caption 2"]

POST /content/save

Save generated captionsInput:

{
  "topic": "food",
  "data": ["Caption 1", "Caption 2"],
  "phoneNumber": "+849xxxxxxxx"
}

Output:

{ "success": true }

GET /content/user-contents?phone_number=+849xxxxxxxx

Get user-saved captionsOutput:

[
  {
    "id": "abc123",
    "topic": "food",
    "data": ["Caption 1", "Caption 2"],
    "phoneNumber": "+849xxxxxxxx",
    "createdAt": "2024-06-01T08:00:00Z"
  }
]

POST /content/unsave

Delete saved captionInput:

{ "captionId": "abc123" }

Output:

{ "success": true }