import { parse as argparse } from "https://deno.land/std@0.181.0/flags/mod.ts";
import { default as jq } from "npm:jq-web-wasm/jq.wasm";

const args = argparse(Deno.args, {
  boolean: [
    // instructions for this script
    "help",
  ],
  string: [
    // output options
    "output",
    "o",
  ],
});

const commandName = `jqlite`;

const usageMessage = `
Usage: ${commandName} [OPTIONS] <expression> [input-json-file]
a jq clone cli powered by jq-web-wasm

based on https://www.npmjs.com/package/jq-web-wasm

Options:
  --help              Show this help message

  Examples:
  ${commandName} '.' test.json
  cat test.json | ${commandName} '.'
`;

// parse args
const help = args.help;
const readStdin = args._.length < 2;
const outputFilename = args.output || args.o;

let jsonStr = "";

if (help) {
  console.log(usageMessage);
  Deno.exit();
}

if (readStdin) {
  const decoder = new TextDecoder();
  for await (const chunk of Deno.stdin.readable) {
    const textChunk = decoder.decode(chunk);
    jsonStr += textChunk;
  }
} else {
  const inputFilename = args._.at(1);

  jsonStr = await Deno.readTextFile(inputFilename);
}

let jqJson = JSON.parse(jsonStr);
const jqFilter = args._.at(0);

let result = await jq.promised.json(jqJson, jqFilter);

console.log(result);