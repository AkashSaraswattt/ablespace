# AbleSpace Playwright QA

One flow: existing-account login → search a fictional student → verify the result, empty search state, and clearing search.

## Setup

Requires Node.js 20+ and the existing authorized staging account. The fictional fixture `QA-Fable Moon-Quill`, with school `Fictional Star & Moon`, must already exist in that account.

```bash
cd playwright
npm ci
npx playwright install chrome chromium firefox
```

Set `TEST_EMAIL` and `TEST_PASSWORD` securely in your environment, or in a local `playwright/.env` file. Credential files are ignored by Git. Never commit credentials.

## Run

```bash
npm test -- --project=Chrome
```

Other configured projects: `Firefox`, `Mobile-390x844`, `iPad-Mini`, and `iPad-Pro`. Run one explicitly with `--project=PROJECT_NAME`. Use `npm test -- --list` for discovery.

## Validation status

Dependency installation and test discovery succeeded. Live standalone automation has **not been executed**; the password-step locators require confirmation against the actual login screen. Device projects describe intended coverage, not completed compatibility results.

One worker, no retries, no account creation. Trace, video, and automatic screenshots are disabled to avoid recording credentials or account data.

This code-only repository does not include the QA reports or evidence.
