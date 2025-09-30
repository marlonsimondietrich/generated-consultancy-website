# AetherAI Consultancy

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/marlonsimondietrich/generated-consultancy-website)

> A stunning, minimalist, and professional single-page website for an AI consultancy firm.

AetherAI is a visually stunning, single-page marketing website for a premier AI consultancy. The design philosophy is minimalist, focusing on clarity, elegance, and user experience. The site features a captivating hero section with a subtle gradient, a clear services section using icon-driven cards, a concise 'About Us' mission statement, and a direct call-to-action for contact. The entire experience is enhanced with smooth, subtle animations that trigger on scroll, creating a modern and professional feel. The layout is fully responsive, ensuring a perfect viewing experience on all devices.

## ✨ Key Features

-   **Elegant & Minimalist Design:** A clean, high-contrast design that focuses on content and user experience.
-   **Smooth Scroll Animations:** Subtle, performant animations that trigger on scroll to engage users.
-   **Fully Responsive:** A flawless viewing experience across desktops, tablets, and mobile devices.
-   **Sticky Navigation:** An always-accessible header for smooth scrolling to any section.
-   **Icon-Driven Services:** Clear and concise presentation of services using modern icons.
-   **Built for Performance:** Optimized for fast loading times and a smooth user experience.

## 🛠️ Technology Stack

-   **Framework:** [React](https://react.dev/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Animations:** [Framer Motion](https://www.framer.com/motion/)
-   **Icons:** [Lucide React](https://lucide.dev/)
-   **Deployment:** [Cloudflare Pages & Workers](https://workers.cloudflare.com/)

## 🚀 Getting Started

Follow these instructions to get a local copy up and running for development and testing purposes.

### Prerequisites

-   [Bun](https://bun.sh/) (v1.0 or higher)
-   [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/aetherai_consultancy.git
    cd aetherai_consultancy
    ```

2.  **Install dependencies:**
    ```sh
    bun install
    ```

### Environment Variables

This project uses Cloudflare Workers for its backend logic. You'll need to set up a `.dev.vars` file in the root directory for local development.

Create a file named `.dev.vars` and add the following variables. You can get these from your Cloudflare dashboard.

```ini
# Required for AI chat functionality from the base template
CF_AI_BASE_URL="https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai"
CF_AI_API_KEY="your-cloudflare-api-key"

# Optional for the web_search tool
SERPAPI_KEY="your-serpapi-key"
```

### Running the Development Server

Start the Vite development server, which will also run the Cloudflare Worker locally.

```sh
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## 💻 Development

The main application logic is contained within the `src` directory.

-   **Main Page:** The entire single-page application is built in `src/pages/HomePage.tsx`.
-   **Components:** Reusable UI components are located in `src/components/ui/`. These are based on shadcn/ui and can be easily extended.
-   **Styling:** Global styles are in `src/index.css`, and component-specific styles are applied using Tailwind CSS utility classes directly in the TSX files.
-   **Backend Logic:** The Cloudflare Worker code is located in the `worker/` directory. The main entry point is `worker/index.ts`.

## ☁️ Deployment

This project is optimized for deployment on the Cloudflare network and can also run as a container on Google Cloud Run.

### Cloudflare Workers / Pages

#### Deploy with Wrangler CLI

1.  **Authenticate with Cloudflare:**
    ```sh
    bunx wrangler login
    ```

2.  **Build the project:**
    ```sh
    bun run build
    ```

3.  **Deploy to Cloudflare:**
    The `deploy` script in `package.json` handles both building the assets and deploying the Worker.
    ```sh
    bun run deploy
    ```

Wrangler will guide you through the deployment process, which includes uploading the static assets to Cloudflare Pages and deploying the Worker.

#### Deploy with the Cloudflare Button

You can also deploy this project with a single click using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/marlonsimondietrich/generated-consultancy-website)

### Docker & Google Cloud Run

The repository ships with a production-ready multi-stage `Dockerfile` that builds the static assets and serves them through a lightweight Bun HTTP server that honours the `PORT` environment variable required by Cloud Run.

#### Build and test the container locally

```sh
docker build -t aetherai-consultancy .
docker run --rm -p 8080:8080 aetherai-consultancy
```

#### Deploy to Google Cloud Run

```sh
gcloud auth login
gcloud config set project <YOUR_PROJECT_ID>
gcloud builds submit --tag gcr.io/<YOUR_PROJECT_ID>/aetherai-consultancy
gcloud run deploy aetherai-consultancy \
  --image gcr.io/<YOUR_PROJECT_ID>/aetherai-consultancy \
  --platform managed \
  --region <YOUR_REGION> \
  --allow-unauthenticated
```

Cloud Run injects the `PORT` environment variable automatically, but you can override it at deploy time if necessary. The Docker image serves the pre-built assets from the `dist/` directory.

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
