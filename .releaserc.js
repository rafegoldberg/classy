module.exports = {
  ci: false,
  branches: ["main"],
  plugins: [
    [
      "@semantic-release/commit-analyzer",
      {
        preset: "angular",
        releaseRules: [
          { type: "feat", release: "minor" },
          { type: "enhance", release: "minor" },
          { type: "refactor", release: "patch" },
          { type: "style", release: "patch" },
          { type: "perf", release: "patch" },
          { type: "change", release: "patch" },
          { type: "fix", release: "patch" },
          { scope: "skip", release: false },
        ],
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"],
        },
      },
    ],
    [
      "@semantic-release/release-notes-generator",
      {
        preset: "conventionalcommits",
        presetConfig: {
          types: [
            { type: "feat", section: "✨ New & Improved", hidden: false },
            { type: "enhance", section: "✨ New & Improved", hidden: true },
            { type: "refactor", section: "✨ New & Improved", hidden: true },

            { type: "style", section: "💄 Styling & Polish", hidden: false },

            { type: "fix", section: "🤘 Fixes & Updates", hidden: false },
            { type: "perf", section: "🤘 Fixes & Updates", hidden: false },
            { type: "chore", section: "🤘 Fixes & Updates", hidden: false },
            { type: "change", section: "🤘 Fixes & Updates", hidden: false },
            { type: "revert", section: "🤘 Fixes & Updates", hidden: false },

            { type: "docs", section: "📘 Docs", hidden: false },
            { type: "devx", section: "🛠 Development Workflow", hidden: false },

            { type: "test", hidden: true },
            { type: "build", hidden: true },
            { type: "ci", hidden: true },
          ],
        },
        parserOpts: {
          noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES", "BREAKING"],
        },
        writerOpts: {
          commitsSort: ["subject", "scope"],
          headerPartial: `## Version {{version}}`,
        },
      },
    ],
    [
      "@semantic-release/changelog",
      {
        changelogTitle: "Changelog\n===",
      },
    ],
    [
      "@semantic-release/npm",
      {
        npmPublish: true,
        tarballDir: "dist",
      },
    ],
    ["@semantic-release/github"],
    [
      "@semantic-release/git",
      {
        assets: ["CHANGELOG.md", "package.json", "package-lock.json"],
        message:
          "Release v${nextRelease.version}\n\n${nextRelease.notes}\n<!--SKIP CI-->",
      },
    ],
  ],
};