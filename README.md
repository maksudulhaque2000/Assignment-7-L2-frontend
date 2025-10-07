# 🚀 Haque's Portfolio - A Full-Stack Developer Showcase (Frontend)

<p align="center">
  This repository contains the frontend source code for my personal portfolio, a dynamic and feature-rich application built with Next.js and TypeScript. It showcases my skills, projects, and thoughts through a modern, responsive interface.
</p>

<p align="center">
  <a href="[FRONTEND_LIVE_URL]" target="_blank">
    <strong>🌐 View Live Demo</strong>
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js"/>
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel"/>
</p>

---

## ✨ Key Features

* **🌐 Dynamic Public Pages**:
    * **Project & Blog Showcase**: Fetches data from a custom Express.js backend with **Incremental Static Regeneration (ISR)** for high performance and fresh content.
    * **On-Demand Revalidation**: Public pages are updated instantly when content is changed in the dashboard, triggered by a secure webhook from the backend.
    * **Static Pages (SSG)**: Core pages like "About Me" are statically generated for maximum speed.

* **🔐 Secure Admin Dashboard**:
    * A private, token-protected dashboard for content management.
    * **Full CRUD Functionality**: Create, Read, Update, and Delete blogs and projects seamlessly.
    * **Rich Text Editor**: Integrated `React Quill` for an enhanced blog writing experience.

* **🎨 Advanced UI/UX**:
    * **Skeleton Loading**: Implemented with `React Suspense` on server components and state-based skeletons on client components for a smooth loading experience.
    * **Smooth Transitions**: Engaging and fluid animations powered by `Framer Motion`.
    * **Instant Feedback**: User actions are confirmed with notifications using `react-hot-toast`.
    * **Responsive Design**: A clean and modern UI that looks great on all devices, from mobile phones to desktops.

---

## 🛠️ Technology Stack

* **Framework**: [Next.js](https://nextjs.org/) (App Router)
* **Language**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
* **Animations**: [Framer Motion](https://www.framer.com/motion/)
* **State Management**: React Hooks & Context API
* **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
* **Deployment**: [Vercel](https://vercel.com/)

---

## ⚙️ Environment Variables

To run this project locally, create a `.env.local` file in the root directory and add the following variables:
URL of your backend server's API `NEXT_PUBLIC_BACKEND_URL=http://localhost:5000/api` 

A secret token to secure the on-demand revalidation API route.
This must be identical to the token in the backend's `.env` file.
```
REVALIDATION_TOKEN="your_super_secret_token"
```

---

## 🚀 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone [YOUR_FRONTEND_REPO_URL](https://github.com/maksudulhaque2000/Assignment-7-L2-frontend)
    cd portfolio-frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    * Create a `.env.local` file and add the variables as described above.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.