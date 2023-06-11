
[![Latest version](https://deno.land/badge/jqlite/version)](https://deno.land/x/jqlite)

# jqlite

**jqlite** is a deno-powered jq-like cli

run jq filters at the cli powered by deno

## usage

to run:

```sh
deno run --allow-read 'https://deno.land/x/jqlite/cli.ts' '.' test.json
```

example:

```
echo {"a": "b"} | deno run --allow-read 'https://deno.land/x/jqlite/cli.ts' '.a' test.json
b
```

## install

Requires [deno](https://deno.land/manual@v1.33.2/getting_started/installation)

```
deno install -n jqlite --allow-read --allow-net https://deno.land/x/jqlite/cli.ts
```

## license

Copyright 2023 **denobytes**.\
See [LICENCE](LICENSE) file to get more infomation.

