import fs from 'fs';
import path from 'path';

const sourceFolder = './source';
const resultFolder = './result';

if (!fs.existsSync(resultFolder)) {
    fs.mkdirSync(resultFolder);
}

function moveFilesRecursively(currentPath) {
    fs.readdirSync(currentPath).forEach(file => {
        const filePath = path.join(currentPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile()) {
            let newFilePath = path.join(resultFolder, file);

            // Проверяем, существует ли файл с таким именем в папке "result"
            let i = 1;
            while (fs.existsSync(newFilePath)) {
                const extension = path.extname(file);
                const baseName = path.basename(file, extension);
                const newName = `${baseName}_${Date.now()}${i}${extension}`;
                newFilePath = path.join(resultFolder, newName);
                i++;
            }

            // Перемещаем файл в папку "result"
            fs.renameSync(filePath, newFilePath);
        } else if (stat.isDirectory()) {
            moveFilesRecursively(filePath);
        }
    });
}

moveFilesRecursively(sourceFolder);
