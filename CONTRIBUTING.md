# Contributing

So excited to have you here! If you want **any** guidance whatsoever with contributing to tRPC, don't hesitate to reach out on [Discord](https://trpc.io/discord)!

## Development workflow

We use [pnpm](https://pnpm.io) as our package manager, so make sure to [install](https://pnpm.io/installation) it first.

```bash
git clone git@github.com:capriok/Pepiti-Stats.git
cd Pepiti-Stats
pnpm install
pnpm build
```

### Get it running

**Terminal 1:**

```bash
# in project root directory
pnpm dev
```

## Project overview

This project uses Next.js App Router with well-defined purposes. All of the following are located in the `/src` directory

### `@src/public`

This contains the static assets used at build time. If something is stored in the repository as static assets, it should here.

### `@src/utils`

This contains the utility Constants and Functions used by Components. If something is stored in the repository as static code, it should be here.

 ### `@src/components`

This contains the reusable common components used by Pages or Components. If something is used in more than one Page or Component, it should be here.

 ### `@src/app`

This contains the App Router and its pages organized by entity and concise naming convention. If something is declared as a Page in the repository as Server or Client Components. it should live here. 


 

