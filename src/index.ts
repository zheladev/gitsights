import { Octokit } from "@octokit/rest";
import { config } from "dotenv";




const load = async () => {
    config();
    const octokit = new Octokit({
        auth: process.env.GH_AUTH,
        userAgent: `Gitsights`,
        previews: ['jean-grey', 'symmetra'],
        timeZone: 'Europe/Amsterdam',
        baseUrl: process.env.BASE_URL,
        log: {
            debug: () => { },
            info: () => { },
            warn: console.warn,
            error: console.error
        },
        //TODO: Find out what to pass to the request option on Octokit instantiation.
        request: {
            agent: undefined,
            fetch: undefined,
            timeout: 0
        }
    });

    //TODO: gets active requests. Has to find out which commits are merges
    //and get info from individual ones.
    //can use commit.message (will ignore merges that don't have proper syntax)
    const repoPulls = await octokit.rest.pulls.list({
        owner: 'mwanago',
        repo: 'express-typescript'
    });

    console.log(repoPulls.data.length);


    //TODO: research whether https://github.com/octokit/request.js/ is needed.
}

(async () => {
    load();
})();