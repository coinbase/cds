#!/bin/bash

# Backup existing labeler.yml if it exists
if [ -f ".github/labeler.yml" ]; then
  cp .github/labeler.yml .github/labeler.yml.bak
fi

# Function to list directories and format them for GitHub Actions
list_directories() {
  local base_dir=$1
  local label_prefix=$2

  for dir in $(find "$base_dir" -maxdepth 1 -mindepth 1 -type d); do
    local dir_name=$(basename "$dir")
    echo "$label_prefix$dir_name:"
    echo "  - changed-files:"
    echo "      - any-glob-to-any-file: '$dir/**'"
    echo ""
  done
}

# Append new labels to the existing labeler.yml
{
  echo "" # New line for separation
  echo "# Automatically appended labels" # Optional comment for clarity
  echo "" # Another new line for separation
  list_directories "libs" "libs:"
  list_directories "packages" "packages:"
  list_directories "apps" "apps:"
} >> .github/labeler.yml
