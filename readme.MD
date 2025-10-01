# Local Development Guide

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (if using containerization)

## Setup

1. **Clone the repository**
    ```bash
    git clone https://github.com/your-org/public_lspro_fe
    git clone https://github.com/your-org/public_lspro_be

    cd public_lspro_fe
    ```

2. **Install dependencies**
    ```bash
    cd /fe npm install
    cd /be npm install
    ```

3. **Configure environment variables**

    - Copy `.env.example` to `.env` and update values as needed.

4. **Start the development server**
    
    **Frontend**
    ```bash
    cd fe

    npm start
    ```
    **Backend**
    ```bash
    cd be

    docker run -d --name lspro-db -p 3306:3306 -e MARIADB_ROOT_PASSWORD=password -e MARIADB_DATABASE=db_lspro_be mariadb:latest

    npm start
    ```

    The app will be available at `http://localhost` (default).

## Useful Commands

- **Lint code:** `npm run lint`
- **Run tests:** `npm test`
- **Build for production:** `npm run build`

## Troubleshooting

- Ensure all dependencies are installed.
- Check `.env` configuration.
- Review logs for errors.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.
