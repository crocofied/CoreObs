
![Logo](https://i.ibb.co/hwSZTJH/Kopie-von-Cash-Mate.png)


# CoreControl

The only dashboard you'll ever need to manage your entire server infrastructure. Keep all your server data organized in one central place, easily add your self-hosted applications with quick access links, and monitor their availability in real-time with built-in uptime tracking. Designed for simplicity and control, it gives you a clear overview of your entire self-hosted setup at a glance.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/corecontrol)
[![Sponsor](https://img.shields.io/badge/sponsor-30363D?style=for-the-badge&logo=GitHub-Sponsors&logoColor=#white)](https://github.com/sponsors/crocofied)

## Features

- Dashboard: A clear screen with all the important information about your servers (WIP)
- Servers: This allows you to add all your servers (including Hardware Information), with Quicklinks to their Management Panels
- Applications: Add all your self-hosted services to a clear list and track their up and down time
- Networks: Generate visually stunning network flowcharts with ease.

## Screenshots
Login Page:
![Login Page](/screenshots/login.png)

Dashboard Page:
![Dashboard Page](/screenshots/dashboard.png)

Servers Page:
![Servers Page](/screenshots/servers.png)

Server Detail Page
![Server Detail Page](/screenshots/server.png)

Applications Page:
![Applications Page](/screenshots/applications.png)

Uptime Page:
![Uptime Page](/screenshots/uptime.png)

Network Page:
![Network Page](/screenshots/network.png)

Settings Page:
![Settings Page](/screenshots/settings.png)

## Roadmap
- [X] Edit Applications, Applications searchbar
- [X] Uptime History
- [X] Notifications
- [X] Simple Server Monitoring
- [ ] Improved Network Flowchart with custom elements (like Network switches)
- [ ] Advanced Settings (Disable Uptime Tracking & more)

## Deployment

Simply run this command :
the command will install all depedencies (like docker,docker compose , pull latest docker images )

```bash
  sudo sh install.sh
```

#ToDo : serve it directly like this corecontrol.xyz/install.sh


Or Simply run this compose.yml:
```yml
services:
  web:
    image: haedlessdev/corecontrol:latest
    ports:
      - "3000:3000"
    environment:
      JWT_SECRET: RANDOM_SECRET # Replace with a secure random string
      DATABASE_URL: "postgresql://postgres:postgres@db:5432/postgres"

  agent:
    image: haedlessdev/corecontrol-agent:latest
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@db:5432/postgres"
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:17
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 2s
      timeout: 2s
      retries: 10

volumes:
  postgres_data:
```

#### Default Login
__E-Mail:__ admin@example.com\
__Password:__ admin

## Tech Stack & Credits

The application is build with:
- Next.js & Typescript
- Go (used for the agent)
- Tailwindcss with [shadcn](shadcn.com)
- PostgreSQL with [Prisma ORM](https://www.prisma.io/)
- Icons by [Lucide](https://lucide.dev/)
- Flowcharts by [React Flow](https://reactflow.dev/)
- Application icons by [selfh.st/icons](https://selfh.st/icons)
- Monitoring Tool by [Glances](https://github.com/nicolargo/glances)
- and a lot of love ❤️

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=crocofied/CoreControl&type=Date)](https://www.star-history.com/#crocofied/CoreControl&Date)

## License

Licensed under the [MIT License](https://github.com/crocofied/CoreControl/blob/main/LICENSE).
