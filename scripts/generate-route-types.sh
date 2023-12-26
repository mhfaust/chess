#!/bin/zsh

# Define the directory of your Next.js pages
NEXTJS_APP_DIR="app"

# Start the TypeScript type definition
echo "type AppRoutes = " > AppRoutes.ts

# Find all page.tsx files and process them
find "$NEXTJS_APP_DIR" -name "page.tsx" | while read -r file; do
    # Convert file path to route
    route=$(echo "$file" | sed "s|$NEXTJS_APP_DIR||; s|/page.tsx$||;")

    # Special case for root index file
    if [[ $route == "" ]]; then
        route="/"
    else
        route="$route"
    fi

    # Append to the TypeScript type
    echo " | \"$route\"" >> AppRoutes.ts
done

