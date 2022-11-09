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

    const params = "GET https://github.com/octocat/Hello-World/commit/7fd1a60b01f91b314f59955a4e4d4e80d8edf11d.diff";
    const repoDiffRequest = await octokit.request(params); 
    //res.data ->
    // 'diff --git a/README b/README\n' +
    // 'index c57eff5..980a0d5 100644\n' +
    // '--- a/README\n' +
    // '+++ b/README\n' +
    // '@@ -1 +1 @@\n' +
    // '-Hello World!\n' +
    // '\\ No newline at end of file\n' +
    // '+Hello World!\n'

    // const repoCommits = await octokit.repos.listCommits({
    //     owner: 'zheladev',
    //     repo: 'GrowFarm',
    //     mediaType: {
    //         format: "diff",
    //     }
    // });

    console.log(repoDiffRequest);


    //TODO: research whether https://github.com/octokit/request.js/ is needed.
}

(async () => {
    load();
})();