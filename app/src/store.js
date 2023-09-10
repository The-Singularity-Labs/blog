
import { reactive, watch } from '@arrow-js/core'
import { createDbWorker } from "sql.js-httpvfs";
import dbURL from "url:./assets/db/cms.db";
import workerUrl from "url:../node_modules/sql.js-httpvfs/dist/sqlite.worker.js";
import wasmUrl from "url:../node_modules/sql.js-httpvfs/dist/sql-wasm.wasm";

let initArticle;
if(window.location.hash) {
    initArticle = window.location.hash
}

const store = reactive({
    articleSlug: undefined,
    article: null, // hero, content
    archive: [],
    archiveFilter: "",
    dbWorker: null,
});

function hasPrefix(inputString, prefix) {
    if (inputString === null || inputString === undefined) {
      return false; // Return false for null or undefined inputs
    }
    return inputString.startsWith(prefix);
}

function removePrefix(inputString, prefix) {
    if (inputString === null || inputString === undefined) {
      return false; // Return false for null or undefined inputs
    }

    if (hasPrefix(inputString, prefix)) {
        return inputString.substring(prefix.length);
    }

    return inputString;
}

function isArchiveFragment(inputString) {
    return hasPrefix(inputString, "#archive?tag=");
}

function removeArchiveFragmentPrefix(inputString) {
    return removePrefix(inputString, "#archive?tag=");
}

function isArticleFragment(inputString) {
    return hasPrefix(inputString, "#article?slug=");
}

function removeArticleFragmentPrefix(inputString) {
    return removePrefix(inputString, "#article?slug=");
}

function initAppState(){
    if(window.location.hash) {
        if (isArchiveFragment(window.location.hash)) {
            store.articleSlug = null;
            store.archiveFilter = removeArchiveFragmentPrefix(window.location.hash);
        } else if (isArticleFragment(window.location.hash)) {
            store.articleSlug = removeArticleFragmentPrefix(window.location.hash);
            store.archiveFilter = "";
        }
    } else {
        store.articleSlug = null;
        store.archiveFilter = "";
    }
}

// Always set the store articleSlug to the url fragment.
watch(() => {
    if (store.articleSlug === undefined) {
        initAppState();
    }
});

// Define a callback function to be executed when the fragment changes
function handleHashChange() {
    // Get the updated fragment from the URL
    initAppState();
  }
  
// Attach the callback function to the 'hashchange' event
window.onhashchange = handleHashChange;

async function initCms() {
    // the config is either the url to the create_db script, or a inline configuration:
    const config = {
        from: "inline",
        config: {
        serverMode: "full", // file is just a plain old full sqlite database
        requestChunkSize: 4096, // the page size of the  sqlite database (by default 4096)
        url: dbURL // url to the database (relative or full)
        }
    };

    
    let maxBytesToRead = 10 * 1024 * 1024;
    store.dbWorker = await createDbWorker(
        [config],
        workerUrl.toString(),
        wasmUrl.toString(),
        maxBytesToRead // optional, defaults to Infinity
    );
    // you can also pass multiple config objects which can then be used as separate database schemas with `ATTACH virtualFilename as schemaname`, where virtualFilename is also set in the config object.
    
    
    // worker.db is a now SQL.js instance except that all functions return Promises.
    // worker.worker.bytesRead is a Promise for the number of bytes read by the worker.
    // if a request would cause it to exceed maxBytesToRead, that request will throw a SQLite disk I/O error.
    // console.log(await store.dbWorker.worker.bytesRead);
};

function sqlResultsToObject(result) {
    converted = sqlResultsToObjects(result);
    if(!converted || converted.length == 0) {
        throw new Error('Found no results');
    }
    return converted[0];
};

function sqlResultsToObjects(result) {
    let results = [];
    for (let i = 0; i < result.length; i++) {
        let obj = {};
        for (let j = 0; j < result[i].columns.length; j++) {
            obj[result[i].columns[j]] = result[i].values[0][j];
        }
        results.push(obj);
    }

    return results;
};


initCms();

// Always set the store articleSlug to the url fragment.
watch(() => {
    if (store.dbWorker && store.articleSlug) {
        console.log(store.articleSlug)
        store.dbWorker.db.exec(`SELECT * from articles WHERE slug = ?`, [store.articleSlug]).then((rawResult) => {
            let result = sqlResultsToObject(rawResult);
            if (result) {
                let article = {
                    id: result.id,
                    author: result.author,
                    title: result.title,
                    date: result.updated_at,
                    subtitle: result.subtitle,
                    hero_img_url: result.hero_img_url,
                    slug: result.slug,
                    tags: JSON.parse(result.tags),
                    metadata: {},
                };

                store.dbWorker.db.exec(`SELECT * from article_content WHERE article_id = ?`, [article.id]).then((rawContentResult) => {
                    contentResult = sqlResultsToObject(rawContentResult);
                    if (contentResult) {
                        article.content = contentResult.content_md;
                        store.article = article;
                    }
                }).catch((error) => {
                    console.error("Rejected:", error);
                });
            }

        }).catch((error) => {
            console.error("Rejected:", error);
        });
        // console.log("Get Articlce bytes read", await dbWorker.worker.bytesRead);
    } else if (store.dbWorker) {
        let query = `SELECT * from articles ORDER BY updated_at DESC`;
        if (store.archiveFilter !== null && store.archiveFilter !== undefined && store.archiveFilter !== "") { 
            query = `SELECT * from articles WHERE tags LIKE '%${store.archiveFilter}%' ORDER BY updated_at DESC`;
        }
        console.log(query);
        store.dbWorker.db.exec(query).then((rawResults) => {
            let results = sqlResultsToObjects(rawResults);
            console.log(results);
            // New array to store transformed articles
            let articles = [];

            // Loop through each result and create new 'article' objects
            for (let result of results) {
                let article = {
                    id: result.id,
                    author: result.author,
                    title: result.title,
                    date: result.updated_at,
                    subtitle: result.subtitle,
                    hero_img_url: result.hero_img_url,
                    slug: result.slug,
                    tags: JSON.parse(result.tags),
                    metadata: {},
                };

                articles.push(article);
            }
            store.archive = articles;
            console.log(store.archive);
        }).catch((error) => {
            console.error("Rejected:", error);
        });
    }
});

export default store;