import { Octokit } from "@octokit/rest";
import { config } from "dotenv";




const load = () => {
    config();
    // const octokit = new Octokit({

    // })
}

(async () => {
    load();
})();