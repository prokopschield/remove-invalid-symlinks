import { promises as fs } from 'fs';
import path from 'path';
import { cacheFn } from 'ps-std';

export const stat = cacheFn(fs.stat);
export const lstat = cacheFn(fs.lstat);

export async function remove(directory: string) {
	try {
		try {
			const stats = await stat(directory);

			if (stats.isDirectory()) {
				for (const subdirectory of await fs.readdir(directory)) {
					try {
						await remove(path.resolve(directory, subdirectory));
					} catch {}
				}
			}
		} catch (error: any) {
			if (error?.code === 'ENOENT') {
				const stats = await lstat(directory);

				if (stats.isSymbolicLink()) {
					await fs.unlink(directory);
					console.log(directory);
				}
			}
		}
	} catch {}
}
