import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);
const rmdir = promisify(fs.rm);

const sourceDir = 'source';
const maxFolders = 5;
const maxFilesPerFolder = 10;

async function create() {
    try {
        // Remove source directory if it exists
        if (fs.existsSync(sourceDir)) {
            await rmdir(sourceDir, { recursive: true });
        }

        // Create source directory
        await mkdir(sourceDir);

        // Generate random number of folders (up to maxFolders)
        const numFolders = Math.floor(Math.random() * maxFolders) + 1;

        // Create each folder and generate random number of files (up to maxFilesPerFolder) in each folder
        for (let i = 1; i <= numFolders; i++) {
            const folderName = `folder${i}`;
            const folderPath = path.join(sourceDir, folderName);

            // Create folder
            await mkdir(folderPath);

            // Generate random number of files (up to maxFilesPerFolder) in folder
            const numFiles = Math.floor(Math.random() * maxFilesPerFolder) + 1;

            // Create each file in folder
            for (let j = 1; j <= numFiles; j++) {
                const fileName = `file${j}.txt`;
                const filePath = path.join(folderPath, fileName);

                // Create file
                await writeFile(filePath, `This is ${fileName}`);
            }
        }
        console.log('Folders and files created successfully');
    } catch (error) {
        console.error('Error creating folders and files:', error);
    }
}

create();
