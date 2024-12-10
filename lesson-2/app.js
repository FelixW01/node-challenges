// const chalk = require('chalk') deprecated, only works with ES modules
import yargs from 'yargs';
// this is required for es6 syntax
import { hideBin } from 'yargs/helpers';
import notes from './yargs/notes.js';

// console.log(chalk.blue('Success!'));
// yargs.version('1.1.0')

yargs(hideBin(process.argv))
    .command( {
        command: 'add',
        describe: 'Add a new note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
                    },
            body: {
                describe: 'Note body',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function (argv) {
            notes.addNote(argv.title, argv.body)
    }
})
    .command({ 
        command: 'list',
        describe: 'List your notes',
        handler() {
            notes.listNotes()
        }

    })
    .command({
        command: 'read',
        describe: 'Read a note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler(argv) {
            notes.readNote(argv.title)
        }
    })
    .command( {
        command: 'remove',
        describe: 'Remove a note',
        builder: {
            title: {
                describe: 'Note title',
                demandOption: true,
                type: 'string'
            }
        },
        handler: function(argv) {
            notes.removeNote(argv.title)
    }
})
.argv;