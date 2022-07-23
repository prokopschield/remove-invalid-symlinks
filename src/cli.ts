#!/usr/bin/env node

import argv from '@prokopschield/argv';
import { remove } from '.';

if (!argv.ordered.length) {
	console.error(`Usage: ${argv.execNode} ${argv.execScript} FILES`);
}

for (const dir of argv.ordered) {
	remove(dir);
}
