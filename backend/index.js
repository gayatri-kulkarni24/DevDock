const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controllers/init");
const { addRepo } = require("./controllers/add");
const { commitChange } = require("./controllers/commit");
const { pullCommand } = require("./controllers/pull");
const { pushCommand } = require("./controllers/push");
const { revertChange } = require("./controllers/revert");

yargs(hideBin(process.argv))
  .command("init", "Initialize the new repository", {}, initRepo)
  .command(
    "add <file>",
    "add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File to add to staging area",
        type: "string",
      });
    },
   (argv)=>{
    addRepo(argv.file);
   }
  )
  .command(
    "commit <message>",
    "commit the staged file",
    (yargs) => {
      yargs.positional("message", {
        describe: "commit message",
        type: "string",
      });
    },
    commitChange
  )
    .command("push", "push commit to s3", {}, pushCommand)
    .command("pull", "pull commit to s3", {}, pullCommand)
    .command(
    "revert <commitID>",
    "Revert to specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Commit Id to revert to",
        type: "string",
      });
    },
    revertChange
  )

  .demandCommand(1, "You need at least one command")
  .help().argv;
