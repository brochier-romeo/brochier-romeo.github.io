# Pantheon — clean Jekyll project

This is a clean, standalone copy of the Pantheon website project.
It is intended to become a **new local Git repository**. It does not contain
the old repository's `.git` history, so there is no file-copy/merge conflict.

## Test it on your Mac

1. Unzip this folder somewhere easy to find, such as Documents.
2. Open Terminal.
3. Type `cd ` (include the space), then drag the unzipped `pantheon-new-repo`
   folder into Terminal and press Return.
4. Run:

   ```sh
   bundle install
   bundle exec jekyll serve
   ```

5. Open http://127.0.0.1:4000 in your browser.

## Make this folder a new Git repository

After confirming the site works, run these commands in this folder:

```sh
git init
git add .
git commit -m "Create Pantheon website"
```

This creates a new local Git repository. To publish it, create a new empty
repository on GitHub, then connect it using the GitHub URL GitHub gives you:

```sh
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with the actual URL from GitHub.
Do not delete your old Documents folder or old GitHub repository until the
new site is working and published.

## Notes

- `index.html` is the single homepage source.
- The old competing `index.markdown` homepage is not included.
- The Jekyll GitHub Pages workflow is in `.github/workflows/pages.yml`.
