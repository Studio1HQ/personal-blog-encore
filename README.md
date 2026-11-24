<div align="center">

<img src="https://raw.githubusercontent.com/Studio1HQ/Studio1HQ/main/assets/banners/personal-blog-encore.webp" alt="Blog REST API with Encore.ts: A blog CRUD API on Encore.ts with a Postgres database" width="100%" />

<br />
<br />

# Blog REST API with Encore.ts

### A blog CRUD API on Encore.ts with a Postgres database

A small Encore.ts backend that exposes create, read, update and delete endpoints for blog posts, backed by an Encore-managed PostgreSQL database.

<br />

[![Built by Studio1](https://img.shields.io/badge/Built_by_Studio1-f97316?style=for-the-badge&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTYwIiBmaWxsPSJub25lIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTAgMzVDMCAxNi42ODA3IDE0LjA3NDQgMS42NDg0NCAzMiAwLjEyNjk1M1YxNDFINTEuMDUyM0M1Mi40MzA4IDEzNy4zNDQgNTQuNzQ0NiAxMzMuNjg5IDU3Ljk5MzggMTMwLjAzM0M2MS4xNDQ2IDEyNi41MDggNjQuNjg5MiAxMjMuNDQgNjguNjI3NyAxMjAuODI5QzcyLjU2NjIgMTE4LjM0OSA3Ni4zNTY5IDExNi43ODIgODAgMTE2LjEyOVY4Ni43NTQ0Qzc1LjQ3MDggODcuOTI5MiA3MS4zODQ2IDg5LjY5MTkgNjcuNzQxNSA5Mi4wNDE1QzY0IDk0LjUyMjUgNjAuNzUwOCA5Ny40NiA1Ny45OTM4IDEwMC44NTRDNTYuNTM0NSAxMDIuNzIgNTUuMjU0NSAxMDQuNjU5IDU0LjE1MzkgMTA2LjY3MVYwSDEyNUMxNDQuMzMgMCAxNjAgMTUuNjY5OSAxNjAgMzVWMTI1QzE2MCAxNDQuMzMgMTQ0LjMzIDE2MCAxMjUgMTYwSDEyNFYxOEgxMDQuOTQ4QzEwMy41NjkgMjEuNjgxNiAxMDEuMjU1IDI1LjM2MjggOTguMDA2MiAyOS4wNDQ0Qzk0Ljg1NTQgMzIuNTk0MiA5MS4zMTA4IDM1LjY4NDEgODcuMzcyMyAzOC4zMTRDODMuNDMzOCA0MC44MTIgNzkuNjQzMSA0Mi4zODk2IDc2IDQzLjA0NzRWNzIuNjMwNEM4MC41MjkyIDcxLjQ0NzMgODQuNjE1NCA2OS42NzI0IDg4LjI1ODUgNjcuMzA1N0M5MiA2NC44MDc2IDk1LjI0OTIgNjEuODQ5MSA5OC4wMDYyIDU4LjQzMDdDOTkuNDY1NSA1Ni41NTEzIDEwMC43NDUgNTQuNTk4NiAxMDEuODQ2IDUyLjU3MjNWMTYwSDM1QzE1LjY3IDE2MCAwIDE0NC4zMyAwIDEyNVYzNVoiIGZpbGw9IiNmZmZmZmYiLz48L3N2Zz4K)](https://studio1hq.com)
[![Built with Encore](https://img.shields.io/badge/Built_with_Encore-141414?style=for-the-badge)](https://encore.dev)

[Encore docs](https://encore.dev/docs) &nbsp;·&nbsp; [Encore](https://encore.dev) &nbsp;·&nbsp; [More examples](https://github.com/Studio1HQ) &nbsp;·&nbsp; [studio1hq.com](https://studio1hq.com)

</div>

<br />

## Overview

This repo is a small backend for a personal blog, written with [Encore.ts](https://encore.dev/docs/ts). It exposes a REST API to create, list, read, update and delete blog posts, and stores them in a PostgreSQL database that Encore provisions and migrates for you.

It is a compact example of an Encore service: typed API endpoints, a SQL database with migrations, and the local developer dashboard, all without extra infrastructure setup.

## Features

- **Create posts**: `POST /blogs` takes a title, content and author and returns the stored post.
- **List posts**: `GET /blogs` returns all posts, newest first.
- **Read one post**: `GET /blogs/:id` returns a single post.
- **Update posts**: `PUT /blogs/:id` changes the title and content of a post.
- **Delete posts**: `DELETE /blogs/:id` removes a post.
- **Managed database**: a `blogs` table is created by an Encore SQL migration.

## Tech stack

| Layer | Tool |
| --- | --- |
| Framework | [Encore.ts](https://encore.dev/docs/ts) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Database | PostgreSQL via Encore `SQLDatabase` |
| Deployment | [Encore Cloud](https://encore.dev/docs/platform) |

## Getting started

### Prerequisites

- Node.js and npm
- The [Encore CLI](https://encore.dev/docs/ts/install)
- Docker, which Encore uses to run PostgreSQL locally

### Installation

```bash
git clone https://github.com/Studio1HQ/personal-blog-encore.git
cd personal-blog-encore
npm install
```

### Run

```bash
encore run
```

While `encore run` is running, open <http://localhost:9400/> for Encore's [local developer dashboard](https://encore.dev/docs/ts/observability/dev-dash). Use it to call the endpoints and inspect traces and the database.

Run tests with:

```bash
encore test
```

### Deploy

Deploy to Encore's free development cloud:

```bash
git add -A .
git commit -m 'Commit message'
git push encore
```

Then open the [Cloud Dashboard](https://app.encore.dev) to monitor the deployment and find your URL. You can also connect your own AWS or GCP account for deployment.

## How it works

```text
blog/
  blog.ts                          API endpoints and database access
  migrations/1_create_blogs_table.up.sql   blogs table schema
encore.app                         Encore app id and language
```

`blog.ts` declares a `SQLDatabase("blogs", { migrations: "./migrations" })` and five `api(...)` endpoints. Each endpoint runs a SQL query through Encore's tagged-template query helpers. The `blogs` table has `id`, `title`, `content`, `author`, `created_at` and `updated_at` columns.

## Resources

- [Encore.ts docs](https://encore.dev/docs/ts): framework reference.
- [Encore](https://encore.dev): the platform site.
- [Local developer dashboard](https://encore.dev/docs/ts/observability/dev-dash): API explorer and tracing while developing.

<br />

---

<div align="center">

<a href="https://studio1hq.com">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-dark.svg" />
    <img src="https://raw.githubusercontent.com/Studio1HQ/website/main/brand/studio1-logo-on-light.svg" alt="Studio1" width="160" />
  </picture>
</a>

Built by **[Studio1](https://studio1hq.com)**, the technical content and DevRel partner for devtool teams. Made with [Encore](https://encore.dev).<br />
Browse more open-source examples at [github.com/Studio1HQ](https://github.com/Studio1HQ).

[![Website](https://img.shields.io/badge/studio1hq.com-0b0807?style=for-the-badge&logo=googlechrome&logoColor=white)](https://studio1hq.com)
[![Book a call](https://img.shields.io/badge/Book_a_strategy_call-f97316?style=for-the-badge&logo=googlecalendar&logoColor=white)](https://cal.com/studio1/collab)
[![X](https://img.shields.io/badge/%40Studio1HQ-141414?style=for-the-badge&logo=x&logoColor=white)](https://x.com/Studio1HQ)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0a66c2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/studio1hq/)

<sub><a href="https://studio1hq.com">studio1hq.com</a> · Technical content, docs, video and DevRel for devtools</sub>

</div>
