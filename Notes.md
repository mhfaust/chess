Find and update imports with rules/ prefix

  replace
    import\s*(.*)\s*from\s*('|")([^.].*)('|")

  with
    import $1 from 'rules/$3'