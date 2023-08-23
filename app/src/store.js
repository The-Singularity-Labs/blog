
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
    dbWorker: null,
});

// Always set the store articleSlug to the url fragment.
watch(() => {
    if (store.articleSlug === undefined) {
        if(window.location.hash) {
            store.articleSlug = window.location.hash.replace(/^#/, "");
        } else {
            store.articleSlug = null;
        }
    }
});

// Define a callback function to be executed when the fragment changes
function handleHashChange() {
    // Get the updated fragment from the URL
    store.articleSlug = window.location.hash;
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
        throw new Error('Found now results');
    }
    return converted[0];
};

function sqlResultsToObjects(result) {
    results = [];
    console.log(result);
    for (let i = 0; i < result.length; i++) {
        obj = {}
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
        store.dbWorker.db.exec(`SELECT * from articles WHERE slug = ?`, [store.articleSlug]).then((result) => {
            result = sqlResultsToObject(result);
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

                store.dbWorker.db.exec(`SELECT * from article_content WHERE article_id = ?`, [article.id]).then((contentResult) => {
                    contentResult = sqlResultsToObject(contentResult);
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
            store.dbWorker.db.exec(`SELECT * from articles ORDER BY updated_at DESC`).then((results) => {
                results = sqlResultsToObjects(results);
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