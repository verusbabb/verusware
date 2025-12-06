module.exports = {
  'backend/**/*.ts': (filenames) => {
    // Get relative paths from backend directory
    const files = filenames.map(f => f.replace(/^backend\//, '')).join(' ')
    return [
      `cd backend && npx prettier --write ${files}`,
      `cd backend && npx eslint --fix ${files}`
    ]
  },
  'frontend/**/*.{ts,vue,js,json,css}': (filenames) => {
    // Get relative paths from frontend directory
    const files = filenames.map(f => f.replace(/^frontend\//, '')).join(' ')
    return [
      `cd frontend && npx prettier --write ${files}`,
      `cd frontend && npx eslint --fix ${files}`
    ]
  }
}

