import moment from 'moment';
import fs from 'fs';
import readline from 'readline';
import CONSTANTS from './../constants';

const archiveTime = moment(...CONSTANTS.WRITE_TIME);
const timeToArchive = archiveTime.diff(moment());
const firstWrite = timeToArchive > 0 ? timeToArchive : (24 * 60 * 60 * 1000 + timeToArchive);

const errorArchive = delay =>
        setTimeout(() => {
            const inStream = fs.createReadStream(CONSTANTS.ERROR_LOG_FILE);
            const rl = readline.createInterface({
                input: inStream,
            });
            const fileName = `${CONSTANTS.ARCHIVE_DIRECTORY}/${moment('00:00','HH:mm').format('x')}.txt`;
            rl.on('line', function (line) {
                const data = JSON.parse(line);
                fs.writeFile(fileName, JSON.stringify({
                    message: data.message,
                    code: data.code,
                    time: data.time
                })
                    + '\n',
                    {flag:'a'},(err) => {
                    if (err) throw err;
                });
            });
            rl.on('close', function () {
                fs.truncate(CONSTANTS.ERROR_LOG_FILE,  function(){
                    if (fs.existsSync(fileName)) console.log(`Errors moved to archive file ${fileName}`)
                    });
            });
            errorArchive(24 * 60 * 60 * 1000);
        }, delay);


module.exports = errorArchive(firstWrite);