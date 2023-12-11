#!/bin/zsh

# Get the list of changed files
changed_files=$(git diff --name-only HEAD)

# Filter to include only CSS module files
css_module_files=$(echo "$changed_files" | grep '\.module\.css$')
echo $changed_files

# Check if there are any CSS module files
if [ -z "$css_module_files" ]; then
    echo "No CSS module files changed."
else
    # Pass the list to tcm command
    npx tcm -p "$css_module_files"
fi
