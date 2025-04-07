# FinSight: Personal Finance Analytics Platform

FinSight is a comprehensive financial advisor web application that analyzes bank statements to provide insightful financial information and recommendations.

## Features

- **Statement Upload**: Upload bank statements in PDF format for analysis
- **Demo Mode**: Option to use dummy data to explore the application
- **Dashboard**: Overview of financial health with visualizations for net worth, expenses, investments, and savings
- **Expense Analysis**: Detailed breakdown of spending habits with category-wise analysis and threshold alerts
- **Investment Tracker**: Complete overview of investment portfolio and performance
- **Savings Monitor**: Track savings goals and progress
- **Insurance Management**: Keep track of life and medical insurance policies

## Technology Stack

- **Frontend**: React.js with hooks and context API
- **Routing**: React Router
- **UI Components**: Material-UI
- **Charts**: Recharts/Chart.js
- **PDF Processing**: PDF.js
- **Animations**: Framer Motion
- **State Management**: React Context API
- **Styling**: Styled-components / Emotion

## Project Structure

```
src/
  ├── components/       # UI components
  ├── pages/            # Page components
  ├── services/         # API and service functions
  ├── utils/            # Helper utilities
  ├── hooks/            # Custom React hooks
  ├── context/          # React context providers
  ├── data/             # Dummy data
  ├── assets/           # Static assets
  ├── styles/           # Global styles
  ├── routes.js         # Route definitions
  └── App.js            # Main application component
```

## Setup Instructions

### Prerequisites

- Node.js (version 14.x or higher)
- npm (version 6.x or higher) or yarn (version 1.22.x or higher)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/finsight.git
   cd finsight
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

### Running the Application in Development Mode

1. Start the development server

   ```bash
   npm start
   # or
   yarn start
   ```

2. Open your browser and navigate to:

   ```
   http://localhost:3000
   ```

3. The application will automatically reload if you make changes to the code.

### Building for Production

1. Create a production build

   ```bash
   npm run build
   # or
   yarn build
   ```

2. The build artifacts will be stored in the `build/` directory.

3. You can serve the production build locally to test:

   ```bash
   # Install serve globally if not already installed
   npm install -g serve

   # Serve the build directory
   serve -s build
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5000)

## Deployment

### Deploy to Netlify

1. Create a Netlify account if you don't have one
2. Connect your GitHub repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build` or `yarn build`
   - Publish directory: `build`
4. Deploy the site

### Deploy to Vercel

1. Install the Vercel CLI:

   ```bash
   npm install -g vercel
   # or
   yarn global add vercel
   ```

2. Deploy the application:

   ```bash
   vercel
   ```

3. Follow the prompts to complete the deployment.

## Usage Instructions

1. Start by either:

   - Uploading a bank statement PDF using the file uploader on the landing page
   - Clicking "Use Demo Data" to explore the application with sample data

2. After data is loaded, you'll be redirected to the Dashboard, where you can see an overview of your financial situation.

3. Use the sidebar navigation to explore different sections:

   - **Dashboard**: Overall financial health view
   - **Expenses**: Track spending patterns and set budget thresholds
   - **Investments**: Monitor investment portfolio allocation and performance
   - **Savings**: Track savings accounts, goals, and projections
   - **Insurance**: Manage life and health insurance policies

4. On the Expenses page, you can set monthly expense thresholds and view category breakdowns.

5. On the Savings page, you can add/edit savings accounts and goals to track your progress.

## Troubleshooting

- **Issue**: Application doesn't load properly

  - **Solution**: Check your browser console for errors. Ensure all dependencies are installed correctly.

- **Issue**: PDF statement upload doesn't work

  - **Solution**: Ensure your PDF is not password-protected and is a valid bank statement format. Try using the demo data to verify the application is working correctly.

- **Issue**: Charts are not rendering
  - **Solution**: Try clearing your browser cache and reload the page. Verify that JavaScript is enabled in your browser.

## Implementation Notes

- The application uses local storage to persist data between sessions
- For real production use, the PDF parsing would need to be customized for specific bank statement formats
- All data is processed client-side; no data is sent to any server

## License

MIT
