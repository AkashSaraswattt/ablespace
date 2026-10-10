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

First check that the test and projects are discovered without signing in:

```bash
npm test -- --list
```

Then run one browser project explicitly:

```bash
npm test -- --project=Chrome
```

| Project | Browser | Viewport | Touch emulation |
| --- | --- | --- | --- |
| `Chrome` | Installed Google Chrome | 1363 × 936 | No |
| `Firefox` | Playwright Firefox | 1363 × 936 | No |
| `Mobile-390x844` | Chromium | 390 × 844 | Yes |
| `iPad-Mini` | Chromium | 768 × 1024 | Yes |
| `iPad-Pro` | Chromium | 1024 × 1366 | Yes |

Use `npm test -- --project=PROJECT_NAME` to select a row. Mobile and iPad projects emulate viewport and touch settings in Chromium; they do not establish Safari, iPadOS, or native-app compatibility. Running `npm test` without a project filter selects all configured projects.

## Troubleshooting

- **Missing credentials:** the test stops with `Set TEST_EMAIL and TEST_PASSWORD securely.` Confirm both variables are available to the Node.js process, or place them in `playwright/.env`, which the configuration loads explicitly.
- **Browser executable missing:** run the browser installation command from Setup. The `Chrome` project uses the `chrome` channel, so installing only Chromium is insufficient for that project.
- **Login times out:** confirm the password field and submit-button locators against the current sign-in screen before running again.
- **Fictional student not found:** confirm the required fixture exists in the account used by the test. The test does not create student records.

## Validation status

Dependency installation and test discovery succeeded. Live standalone automation has **not been executed**; the password-step locators require confirmation against the actual login screen. Device projects describe intended coverage, not completed compatibility results.

One worker, no retries, no account creation. Trace, video, and automatic screenshots are disabled to avoid recording credentials or account data.

This code-only repository does not include the QA reports or evidence.
