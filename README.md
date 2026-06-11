# Price Pulse

<p align="center">
  Self-hosted price monitoring platform.
</p>

<p align="center">
  Track products, monitor price changes and build your own pricing intelligence.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" />
  <img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" />
</p>

## Overview

Price Pulse is a self-hosted platform for tracking product prices across multiple online stores.

The project is designed around a simple idea: monitor products, collect historical pricing data, and notify users when meaningful price changes occur.

Built as a monorepo, Price Pulse aims to remain lightweight for personal use while providing a solid foundation for future expansion.

## Philosophy

- Self-hosted by default
- Store-agnostic architecture
- Reliability over complexity
- Incremental evolution
- Open and extensible

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Start the API

```bash
pnpm --filter api start:dev
```

### Start the Web App

```bash
pnpm --filter web dev
```

## License

MIT
