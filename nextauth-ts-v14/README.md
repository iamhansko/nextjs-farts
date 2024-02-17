# NextAuth.js Typescript Next.js v14

## Configuration
Provider : [GitHub](https://next-auth.js.org/providers/github)

1. Rename .env.sample -> .env

2. Set `NEXTAUTH_SECRET` using `openssl rand -base64 32` output (.env)

3. [Register a new OAuth application](https://github.com/settings/applications/new)

    - Application name : next-auth
    - Homepage URL : http://localhost:3000
    - Authorization callback URL : http://localhost:3000/api/auth/callback/github

4. Client secrets -> Generate a new client secret

5. Set `GITHUB_ID`, `GITHUB_SECRET` according to GitHub OAuth App 'next-auth' (.env)

## Run

#### Development Stage
```bash
npm install
npm run dev
```
Then, go to http://localhost:3000

#### Production Stage
```bash
npm install
npm run build
npm run start
```
Then, go to http://localhost:3000