# Eventix

## Overview

Eventix is an event management app that is feature-rich and designed to create, manage, and update events seamlessly. Built with modern technologies such as Convex for backend operations and Kinde Auth for secure authentication, the app provides a user-friendly interface and powerful tools to handle event data efficiently.

## Features

### Core Features

- **Event Creation**: Add new events with essential details like name, date, description, location, and organizer.
- **Event Editing**: Update existing events dynamically.
- **Date Picker**: Select dates intuitively with a calendar interface.
- **Responsive Design**: Fully responsive layout optimized for all devices.
- **Authentication**: Secure user authentication powered by Kinde Auth.

### Technical Highlights

- **Convex Backend**: Efficient data fetching, updates, and real-time capabilities.
- **Date Handling**: Smooth date selection and formatting using date-fns.
- **Customizable Components**: Modular components built with flexibility and reusability in mind.
- **Error Handling**: Robust error management for a seamless user experience.

## Tech Stack

- **Frontend**: React, TypeScript, Next.js
- **Backend**: Convex
- **Authentication**: Kinde Auth
- **UI Components**: TailwindCSS, Custom Reusable Components
- **Utilities**: date-fns, lucide-react, sonner (toast notifications)

## Installation and Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn or bun

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/sholajegede/eventix.git
    cd eventix
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    bun install
    # or
    yarn install
    ```

3. Configure Environment Variables:
    - Create a `.env.local` file in the root directory and add the following:

    ```bash
    KINDE_CLIENT_ID=<your_kinde_client_id>
    KINDE_CLIENT_SECRET=<your_kinde_client_secret>
    KINDE_ISSUER_URL=<your_kinde_issuer_url>
    KINDE_SITE_URL=<your_kinde_site_url>
    KINDE_POST_LOGOUT_REDIRECT_URL=<your_kinde_post_logout_redirect_url>
    KINDE_POST_LOGIN_REDIRECT_URL=<your_kinde_post_login_redirect_url>
    
    VERCEL_URL=<your_vercel_url>
    
    CONVEX_DEPLOYMENT=<your_convex_deployment>
    NEXT_PUBLIC_CONVEX_URL=<your_convex_public_url>
    NEXT_PUBLIC_CONVEX_HTTP_URL=<your_convex_http_url>
    CLIENT_ORIGIN=<your_default_url> //http://localhost:3000 or https://your-app-domain.com
    ```

4. Start the development server:

    ```bash
    npm run dev
    # or
    bun run dev
    # or
    yarn dev
    ```

    Access the app at [http://localhost:3000](http://localhost:3000).

## Usage

### Add a New Event

1. Log in using your Kinde Auth credentials.
2. Navigate to the "Create Event" page.
3. Fill in the event details and submit.

### Edit an Existing Event

1. Go to the "All Events" page.
2. Select an event to edit.
3. Update the required fields and save changes.

### Delete an Event

1. Locate the event in the "All Events" list.
2. Click the delete button to remove it permanently.


## Key Components

- **EditEvent**: Allows users to edit event details. Features a responsive form with validation.
- **Calendar**: Integrates a date picker for selecting event dates. Built using a modular, user-friendly design.
- **Toast Notifications**: Provides real-time feedback for user actions like event updates or errors.

## Future Enhancements

- **Search and Filter**: Add functionality to filter and search events.
- **Reminders**: Integrate reminders and notifications for upcoming events.
- **Social Sharing**: Allow users to share events on social media.
- **User Roles**: Add admin and attendee roles with specific permissions.

## Troubleshooting

### Common Issues

- **Authentication Errors**: Verify your Kinde Auth configuration in `.env.local`.
- **Invalid Date**: Ensure the selected date is valid and properly formatted.
- **Build Failures**: Run `npm install` to check for missing dependencies. Use `--legacy-peer-deps` if dependency conflicts occur.

## Contributing

We welcome contributions! Follow these steps:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.